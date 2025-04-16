import { type InferSelectModel } from "drizzle-orm";
import type { podcasts } from "@/server/db/schema/podcasts";

export type Podcast = InferSelectModel<typeof podcasts>;
