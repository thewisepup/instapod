import { SignInButton, SignUpButton } from "@clerk/nextjs";

export default function LandingPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-8 px-4 text-center">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Create AI-Powered Podcasts
        </h1>
        <p className="text-muted-foreground mx-auto max-w-[700px] text-lg">
          Generate engaging podcasts with the power of AI. Sign in to start
          creating your own content.
        </p>
      </div>
      <div className="flex gap-4">
        <SignInButton />
        <SignUpButton />
      </div>
    </div>
  );
}
