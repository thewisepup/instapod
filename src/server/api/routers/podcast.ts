import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { podcast } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const podcastRouter = createTRPCRouter({
  hello: publicProcedure.query(({ ctx }) => {
    return {
      greeting: `Hello ${ctx.auth.userId}`,
    };
  }),
  helloProtected: protectedProcedure.query(({ ctx }) => {
    return {
      greeting: `Hello protected ${ctx.auth.userId}`,
    };
  }),
  getPodcasts: protectedProcedure
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
