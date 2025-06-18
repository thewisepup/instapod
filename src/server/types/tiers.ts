export type UserTier = "free" | "pro" | "admin";

export const tierLimits = {
  free: 1, //TODO Update back to 1, doing this for debugging and testing
  pro: 3,
  admin: Infinity,
} as const;

export type TierLimit = (typeof tierLimits)[UserTier];
