import { createPodcast, getPodcastsByUserId } from "@repositories/podcast-repo";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const podcastRouter = createTRPCRouter({
  getPodcasts: protectedProcedure.query(async ({ ctx }) => {
    return await getPodcastsByUserId(ctx.auth.userId!);
  }),
  createPodcast: protectedProcedure
    .input(z.object({ userDescription: z.string() }))
    .mutation(async ({ input, ctx }) => {
      console.log(
        `[Podcast Generation] Starting generation for user: ${ctx.auth.userId}`,
      );
      const podcast = await createPodcast(
        ctx.auth.userId!,
        input.userDescription,
      );
      console.log(
        `[Podcast Generation] Successfully created podcast with ID: ${podcast?.id} for user: ${ctx.auth.userId}`,
      );
      return podcast;
      //TODO: call serverless function to kick off podcast generation process
    }),
});
