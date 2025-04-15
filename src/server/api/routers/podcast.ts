import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { getPodcastsByUserId } from "~/server/db/repositories/podcast-repo";

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
    .query(async ({ ctx }) => {
      return await getPodcastsByUserId(ctx.auth.userId!);
    }),
});
