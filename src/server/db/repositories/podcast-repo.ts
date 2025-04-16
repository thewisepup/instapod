import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { PodcastStatus, podcasts } from "../schema/podcasts";

export const getPodcastsByUserId = async (userId: string) => {
  const userPodcasts = await db
    .select()
    .from(podcasts)
    .where(eq(podcasts.userId, userId))
    .orderBy(podcasts.createdAt);

  return userPodcasts;
};

export const createPodcast = async (
  userId: string,
  user_description: string,
) => {
  const [podcast] = await db
    .insert(podcasts)
    .values({
      userId: userId,
      userDescription: user_description,
      status: PodcastStatus.GENERATING,
    })
    .returning();

  return podcast;
};
