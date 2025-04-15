import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { podcast } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const podcastRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getPodcasts: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input, ctx }) => {
      //TODO: add auth to verify userId has access to podcast or use context for auth
      const podcasts = await ctx.db
        .select()
        .from(podcast)
        .where(eq(podcast.user_id, input.userId));

      return podcasts;
    }),
});
