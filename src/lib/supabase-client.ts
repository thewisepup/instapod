import { env } from "~/env";

import { createBrowserClient } from "@supabase/ssr";

//TODO: DOUBLE CHECK THIS FILE TO SEE IF DISABLING LINT IS OKAY
//TODO: Do we need to createClient on every file or can we just export a supabase singleton?
export function createClient() {
  // Create a supabase client on the browser with project's credentials
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  return createBrowserClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
