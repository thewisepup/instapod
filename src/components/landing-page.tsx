import { Waitlist } from "@clerk/nextjs";
import AppLogo from "./app-logo";
import { SignIn } from "./sign-in";
import { SignUp } from "./sign-up";

export default function LandingPage() {
  return (
    <div>
      <header className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-4">
          <AppLogo />
          <div className="text-2xl font-bold">InstaPod</div>
        </div>
        <div className="flex items-center gap-4">
          <SignIn />
          <SignUp />
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 text-center">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Create Your AI-Powered Podcast
          </h2>
          <p className="text-muted-foreground mx-auto max-w-[700px] text-lg sm:text-xl">
            Just describe what you want to hear. InstaPod creates a
            personalized podcast just for you.
          </p>
        </div>
        <div className="mt-12 flex justify-center">
          <Waitlist />
        </div>
      </main>
    </div>
  );
}
