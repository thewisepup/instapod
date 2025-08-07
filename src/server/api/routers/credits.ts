import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { getUserCredits } from "@/server/db/repositories/credits-repo";

export const creditsRouter = createTRPCRouter({
  getBalance: protectedProcedure.query(async ({ ctx }) => {
    const credits = await getUserCredits(ctx.auth.userId!);
    return credits?.balance ?? 0;
  }),
});
