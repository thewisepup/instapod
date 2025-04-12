import { SignInButton as ClerkSignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function SignIn() {
  return (
    <ClerkSignInButton mode="modal">
      <Button
        variant="default"
        className="rounded-md bg-black transition-all duration-200 hover:scale-105 hover:bg-zinc-900"
      >
        Sign In
      </Button>
    </ClerkSignInButton>
  );
}
