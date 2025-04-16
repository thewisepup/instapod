import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { podcasts } from "../schema/podcasts";

export const getPodcastsByUserId = async (userId: string) => {
  const userPodcasts = await db
    .select()
    .from(podcasts)
    .where(eq(podcasts.userId, userId))
    .orderBy(podcasts.createdAt);

  return userPodcasts;
};
