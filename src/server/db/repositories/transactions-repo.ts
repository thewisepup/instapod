import { db } from "@/server/db";
import { transactions, TransactionType } from "../schema/transactions";

interface TransactionDetails {
  userId: string;
  transactionType: keyof typeof TransactionType;
  amount: number;
  description?: string;
  externalTransactionId?: string;
}

export const recordTransaction = async (
  transactionDetails: TransactionDetails,
) => {
  const [transaction] = await db
    .insert(transactions)
    .values({
      userId: transactionDetails.userId,
      transactionType: TransactionType[transactionDetails.transactionType],
      amount: transactionDetails.amount,
      description: transactionDetails.description,
      externalTransactionId: transactionDetails.externalTransactionId,
    })
    .returning();

  return transaction;
};
