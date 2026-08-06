"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { revalidatePath } from "next/cache";

function hashKey(key: string) {
  return crypto.createHash("sha256").update(key).digest("hex");
}

export async function createApiKey(name: string) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const rawKey = crypto.randomBytes(24).toString("hex");
    const prefix = "sk_live_";
    const fullKey = `${prefix}${rawKey}`;

    const hashedKey = hashKey(fullKey);
    const lastFour = fullKey.slice(-4);

    const newKey = await prisma.apiKey.create({
      data: {
        userId,
        name: name.trim() || "Default Key",
        hashedKey,
        lastFour,
        prefix,
      },
    });

    revalidatePath("/dashboard/settings/api");

    return {
      success: true,
      key: {
        ...newKey,
        key: fullKey,
      },
    };
  } catch (error) {
    console.error("Error creating API key:", error);
    return { success: false, error: "Failed to create API key" };
  }
}

export async function getApiKeys() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const keys = await prisma.apiKey.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    const maskedKeys = keys.map((k) => {
      const { hashedKey, ...safeKeyData } = k;

      return {
        ...safeKeyData,
        maskedKey: `${k.prefix}...${k.lastFour}`,
      };
    });

    return { success: true, keys: maskedKeys };
  } catch (error) {
    console.error("Error fetching API keys:", error);
    return { success: false, keys: [] };
  }
}

export async function deleteApiKey(id: string) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    await prisma.apiKey.delete({
      where: {
        id,
        userId,
      },
    });

    revalidatePath("/dashboard/settings/api");
    return { success: true };
  } catch (error) {
    console.error("Error deleting API key:", error);
    return { success: false, error: "Failed to delete API key" };
  }
}
