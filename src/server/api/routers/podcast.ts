import { getPodcastsByUserId } from "@repositories/podcast-repo";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const podcastRouter = createTRPCRouter({
  getPodcasts: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx }) => {
      return await getPodcastsByUserId(ctx.auth.userId!);
    }),
});
