export type UserTier = "free" | "pro" | "admin";

export const tierLimits = {
  free: 1,
  pro: 3,
  admin: Infinity,
} as const;

export type TierLimit = (typeof tierLimits)[UserTier];
