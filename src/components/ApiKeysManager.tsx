"use client";

import { useState, useEffect } from "react";
import { createApiKey, getApiKeys, deleteApiKey } from "@/actions/apikeys";
import { Copy, Check, Trash2, Plus, AlertTriangle } from "lucide-react";

// Define the type based on what your Server Action returns
type ApiKeyRecord = {
  id: string;
  name: string;
  maskedKey: string;
  createdAt: Date;
};

export default function ApiKeysManager() {
  // State
  const [keys, setKeys] = useState<ApiKeyRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Create Modal State
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  // Result Modal State (The "Show Once" modal)
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [generatedKey, setGeneratedKey] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  // Initial Fetch
  useEffect(() => {
    fetchKeys();
  }, []);

  const fetchKeys = async () => {
    setIsLoading(true);
    const res = await getApiKeys();
    if (res.success && res.keys) {
      // @ts-ignore - formatting the date for UI
      setKeys(res.keys);
    }
    setIsLoading(false);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    const res = await createApiKey(newKeyName);

    if (res.success && res.key) {
      // 1. Save the real key to state temporarily
      setGeneratedKey(res.key.key);

      // 2. Refresh the table data in the background
      await fetchKeys();

      // 3. Close Create Modal, Open Result Modal
      setIsCreateOpen(false);
      setNewKeyName("");
      setIsResultOpen(true);
    } else {
      alert("Failed to create key");
    }

    setIsCreating(false);
  };

  const handleCopy = async () => {
    if (!generatedKey) return;

    await navigator.clipboard.writeText(generatedKey);
    setIsCopied(true);

    // Reset copy state after 2 seconds
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to revoke this key? Any apps using it will immediately lose access.",
      )
    )
      return;

    const res = await deleteApiKey(id);
    if (res.success) {
      setKeys((prev) => prev.filter((k) => k.id !== id));
    }
  };

  const closeResultModal = () => {
    setIsResultOpen(false);
    setGeneratedKey(""); // Wipe it from memory
    setIsCopied(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* Header Section */}
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

      {/* Keys Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
        <table className="w-full text-left text-sm">
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
                    {new Date(k.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(k.id)}
                      className="text-gray-400 hover:text-red-600 p-2 rounded-md hover:bg-red-50 transition-colors"
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

      {/* 1. Create Key Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                Create new secret key
              </h3>
            </div>

            <form onSubmit={handleCreate}>
              <div className="p-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Name
                </label>
                <input
                  type="text"
                  required
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
                  disabled={isCreating}
                  className="px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-md disabled:opacity-50 transition-colors"
                >
                  {isCreating ? "Creating..." : "Create Key"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Result Modal (Show Once) */}
      {isResultOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
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
