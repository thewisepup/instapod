import { getTodayPodcastCount } from "../db/repositories/podcast-repo";
import type { UserTier } from "../types/tiers";
import { tierLimits } from "../types/tiers";

export const canCreatePodcast = async (
  userId: string,
  tier: UserTier,
): Promise<void> => {
  const todayCount = await getTodayPodcastCount(userId);

  const limit = tierLimits[tier];

  console.log(
    `[Podcast Creation] User ${userId} (${tier} tier) has created ${todayCount} podcasts today. Limit is ${limit}.`,
  );

  if (todayCount >= limit) {
    console.log(
      `[Podcast Creation] User ${userId} has reached their daily limit of ${limit} podcasts.`,
    );
    throw new Error(
      `Daily podcast limit of ${limit} reached for ${tier} tier. Please try again tomorrow or upgrade your plan.`,
    );
  }

  // TODO: Add additional checks here:
  // - Check if user has active subscription
  // - Check if user has exceeded monthly limits
  // - Check if user has any pending podcasts
  // - Check if user has available credits
};
