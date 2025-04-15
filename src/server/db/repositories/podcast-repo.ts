import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { podcast } from "../schema";

export const getPodcastsByUserId = async (userId: string) => {
  return await db.select().from(podcast).where(eq(podcast.user_id, userId));
};
