import { createPodcast, getPodcastsByUserId } from "@repositories/podcast-repo";
import { canCreatePodcast } from "~/server/utils/podcast-utils";
import { z } from "zod";
import { invokePodcastGeneration } from "~/server/lambda/podcast-generation";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const podcastRouter = createTRPCRouter({
  getPodcasts: protectedProcedure.query(async ({ ctx }) => {
    return await getPodcastsByUserId(ctx.auth.userId!);
  }),
  createPodcast: protectedProcedure
    .input(z.object({ userDescription: z.string() }))
    .mutation(async ({ input, ctx }) => {
      // TODO: Get user tier from user service/subscription
      const userTier = "free";
      await canCreatePodcast(ctx.auth.userId!, userTier);
                                                                                                                                                                                                                                           
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

      if (!podcast) {
        throw new Error("Failed to create podcast");
      }

      void invokePodcastGeneration(podcast.id);

      return podcast;
    }),
});
