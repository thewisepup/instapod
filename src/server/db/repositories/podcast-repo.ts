import { eq, desc, and, gte, sql } from "drizzle-orm";
import { db } from "@/server/db";
import { PodcastStatus, podcasts } from "../schema/podcasts";

export const getPodcastsByUserId = async (userId: string) => {
  const userPodcasts = await db
    .select()
    .from(podcasts)
    .where(eq(podcasts.userId, userId))
    .orderBy(desc(podcasts.createdAt));

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

export const getTodayPodcastCount = async (userId: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const result = await db
    .select({ count: sql<number>`count(*)` })
    .from(podcasts)
    .where(and(eq(podcasts.userId, userId), gte(podcasts.createdAt, today)));

  return result[0]?.count ?? 0;
};
