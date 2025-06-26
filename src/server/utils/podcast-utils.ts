import { getUserCredits } from "../db/repositories/credits-repo";

export const canCreatePodcast = async (
  userId: string,
  creditsCost: number,
): Promise<void> => {
  const userCredits = await getUserCredits(userId);

  console.log(
    `[Podcast Creation] User ${userId} has ${userCredits?.balance ?? 0} credits. Podcast costs ${creditsCost} credits.`,
  );

  if (!userCredits || userCredits.balance < creditsCost) {
    console.log(
      `[Podcast Creation] User ${userId} has insufficient credits. Required: ${creditsCost}, Available: ${userCredits?.balance ?? 0}`,
    );
    throw new Error(
      `Insufficient credits. You need ${creditsCost} credits to generate a podcast, but you have ${userCredits?.balance ?? 0} credits.`,
    );
  }
};
