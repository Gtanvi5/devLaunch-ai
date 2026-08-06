"use client";

import { useState, useEffect } from "react";
import { createApiKey, getApiKeys, deleteApiKey } from "@/actions/apikeys";
import { Copy, Check, Trash2, Plus, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export type ApiKeyRecord = {
  id: string;
  name: string;
  maskedKey: string;
  createdAt: Date;
};

type ServerApiKeyRecord = Omit<ApiKeyRecord, "createdAt"> & {
  createdAt: string | Date;
};

export default function ApiKeysManager() {
  const [keys, setKeys] = useState<ApiKeyRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const [isResultOpen, setIsResultOpen] = useState(false);
  const [generatedKey, setGeneratedKey] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const fetchKeys = async (showLoading = true) => {
    if (showLoading) setIsLoading(true);

    try {
      const res = await getApiKeys();
      if (res.success && res.keys) {
        const formattedKeys = res.keys.map((k: ServerApiKeyRecord) => ({
          ...k,
          createdAt: new Date(k.createdAt),
        }));
        setKeys(formattedKeys);
      } else {
        toast.error("Failed to load API keys.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred while loading keys.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchInitialKeys = async () => {
      await fetchKeys(false);
    };

    void fetchInitialKeys();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    setIsCreating(true);

    try {
      const res = await createApiKey(newKeyName.trim());

      if (res.success && res.key) {
        setGeneratedKey(res.key.key);
        await fetchKeys(false);
        setIsCreateOpen(false);
        setNewKeyName("");
        setIsResultOpen(true);
        toast.success("API Key created successfully.");
      } else {
        toast.error(res.error || "Failed to create key. Please try again.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleCopy = async () => {
    if (!generatedKey) return;

    try {
      await navigator.clipboard.writeText(generatedKey);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy to clipboard.");
    }
  };

  const handleDelete = async (id: string) => {
    if (
      !window.confirm(
        "Are you sure you want to revoke this key? Any apps using it will immediately lose access.",
      )
    )
      return;

    try {
      const res = await deleteApiKey(id);
      if (res.success) {
        setKeys((prev) => prev.filter((k) => k.id !== id));
        toast.success("API key revoked.");
      } else {
        toast.error("Failed to revoke API key.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    }
  };

  const closeResultModal = () => {
    setIsResultOpen(false);
    setGeneratedKey("");
    setIsCopied(false);
  };

  return (
    <div className="bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">API Keys</h2>
          <p className="text-sm text-gray-500">
            Manage keys used to authenticate API requests.
          </p>
        </div>
        <button
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <Plus size={16} />
          Create New Key
        </button>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
            <tr>
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Key</th>
              <th className="px-6 py-3 font-medium">Created</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  Loading keys...
                </td>
              </tr>
            ) : keys.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  You have not created any API keys yet.
                </td>
              </tr>
            ) : (
              keys.map((k) => (
                <tr
                  key={k.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {k.name}
                  </td>
                  <td className="px-6 py-4 font-mono text-gray-600">
                    {k.maskedKey}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {k.createdAt.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(k.id)}
                      className="text-gray-400 hover:text-red-600 p-2 rounded-md hover:bg-red-50 transition-colors"
                      aria-label="Revoke key"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div
            className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-key-title"
          >
            <div className="px-6 py-4 border-b border-gray-100">
              <h3
                id="create-key-title"
                className="text-lg font-semibold text-gray-900"
              >
                Create new secret key
              </h3>
            </div>

            <form onSubmit={handleCreate}>
              <div className="p-6">
                <label
                  htmlFor="keyName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Key Name
                </label>
                <input
                  id="keyName"
                  type="text"
                  required
                  autoFocus
                  placeholder="e.g., Zapier Integration"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating || !newKeyName.trim()}
                  className="px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-md disabled:opacity-50 transition-colors"
                >
                  {isCreating ? "Creating..." : "Create Key"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isResultOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div
            className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="save-key-title"
          >
            <div className="px-6 py-4 border-b border-gray-100">
              <h3
                id="save-key-title"
                className="text-lg font-semibold text-gray-900"
              >
                Save your key
              </h3>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-start gap-3 p-4 bg-amber-50 text-amber-800 rounded-md border border-amber-200">
                <AlertTriangle size={20} className="mt-0.5 shrink-0" />
                <p className="text-sm">
                  Please copy this key and save it somewhere secure. For
                  security reasons,{" "}
                  <strong>you will not be able to view it again.</strong> If you
                  lose this key, you will need to generate a new one.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={generatedKey}
                  className="w-full font-mono text-sm border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-gray-900 focus:outline-none"
                />
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-md border border-gray-200 transition-colors min-w-[100px] justify-center"
                >
                  {isCopied ? (
                    <>
                      <Check size={16} className="text-green-600" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button
                onClick={closeResultModal}
                className="px-6 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-md transition-colors"
              >
                I have saved it safely
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
