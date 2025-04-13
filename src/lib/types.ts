import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";

export interface Podcast {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  duration: string;
  audioUrl: string;
}

type RouterOutput = inferRouterOutputs<AppRouter>;
type Podcasts = RouterOutput["podcast"]["getPodcasts"]; // inferred as User[]