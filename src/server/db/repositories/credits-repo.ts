import { eq, sql } from "drizzle-orm";
import { db } from "@/server/db";
import { credits } from "../schema/credits";

export const getUserCredits = async (userId: string) => {
  const userCredits = await db
    .select()
    .from(credits)
    .where(eq(credits.userId, userId))
    .limit(1);

  return userCredits[0] ?? null;
};

export const upsertUserCredits = async (
  userId: string,
  initialBalance: number,
) => {
  const [userCredits] = await db
    .insert(credits)
    .values({
      userId: userId,
      balance: initialBalance,
    })
    .onConflictDoUpdate({
      target: credits.userId,
      set: {
        balance: initialBalance,
        updatedAt: new Date(),
      },
    })
    .returning();

  return userCredits;
};

export const addCredits = async (userId: string, amount: number) => {
  const [userCredits] = await db
    .update(credits)
    .set({
      balance: sql`${credits.balance} + ${amount}`,
      updatedAt: new Date(),
    })
    .where(eq(credits.userId, userId))
    .returning();

  return userCredits;
};

export const deductCredits = async (userId: string, amount: number) => {
  const [userCredits] = await db
    .update(credits)
    .set({
      balance: sql`${credits.balance} - ${amount}`,
      updatedAt: new Date(),
    })
    .where(eq(credits.userId, userId))
    .returning();

  return userCredits;
};
