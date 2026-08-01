"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { revalidatePath } from "next/cache";

export async function createApiKey(name: string) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const rawKey = crypto.randomBytes(24).toString("hex");
    const prefix = "sk_live_";
    const fullKey = `${prefix}${rawKey}`;

    const newKey = await prisma.apiKey.create({
      data: {
        userId,
        name: name.trim() || "Default Key",
        key: fullKey,
        prefix,
      },
    });

    revalidatePath("/developer");

    return { success: true, key: newKey };
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
      const lastFour = k.key.slice(-4);
      return {
        ...k,
        maskedKey: `${k.prefix}...${lastFour}`,
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

    revalidatePath("/developer");
    return { success: true };
  } catch (error) {
    console.error("Error deleting API key:", error);
    return { success: false, error: "Failed to delete API key" };
  }
}
