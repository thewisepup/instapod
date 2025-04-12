import { SignUpButton as ClerkSignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function SignUp() {
  return (
    <ClerkSignUpButton mode="modal">
      <Button
        variant="default"
        className="rounded-md bg-black transition-all duration-200 hover:scale-105 hover:bg-zinc-900"
      >
        Sign Up
      </Button>
    </ClerkSignUpButton>
  );
}
