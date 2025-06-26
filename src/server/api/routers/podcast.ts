import { createPodcast, getPodcastsByUserId } from "@repositories/podcast-repo";
import { canCreatePodcast } from "~/server/utils/podcast-utils";
import { z } from "zod";
import { invokePodcastGeneration } from "~/server/lambda/podcast-generation";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { deductCredits } from "@repositories/credits-repo";
import { recordTransaction } from "@repositories/transactions-repo";

const DEFAULT_PODCAST_CREDITS_COST = 1;

export const podcastRouter = createTRPCRouter({
  getPodcasts: protectedProcedure.query(async ({ ctx }) => {
    return await getPodcastsByUserId(ctx.auth.userId!);
  }),
  createPodcast: protectedProcedure
    .input(z.object({ userDescription: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await canCreatePodcast(ctx.auth.userId!, DEFAULT_PODCAST_CREDITS_COST);

      console.log(
        `[Podcast Generation] Starting generation for user: ${ctx.auth.userId}`,
      );
      //TODO: In the future, we need to figure out how to pass the creditsCost from FE to API. Default to 1 for now
      const podcast = await createPodcast(
        ctx.auth.userId!,
        input.userDescription,
        DEFAULT_PODCAST_CREDITS_COST,
      );
      console.log(
        `[Podcast Generation] Successfully created podcast with ID: ${podcast?.id} for user: ${ctx.auth.userId}`,
      );

      if (!podcast) {
        throw new Error("Failed to create podcast");
      }

      await invokePodcastGeneration(podcast.id);
      await deductCredits(ctx.auth.userId!, DEFAULT_PODCAST_CREDITS_COST);
      await recordTransaction({
        userId: ctx.auth.userId!,
        transactionType: "PODCAST_GENERATION",
        amount: DEFAULT_PODCAST_CREDITS_COST * -1, // we need to record a debit and not credit here
        description: `Generated podcast ID: ${podcast.id}`,
      });
      return podcast;
    }),
});
