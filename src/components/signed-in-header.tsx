import { UserButton } from "@clerk/nextjs";

export default function SignedInHeader() {
  //TODO: Fix css padding
  return (
    <header className="mb-8 flex w-full flex-col items-center justify-between gap-4 py-8 pt-32 sm:flex-row sm:gap-0">
      <div className="flex flex-1 items-center gap-4">
        <div className="bg-primary flex h-16 w-16 items-center justify-center rounded-full sm:h-20 sm:w-20">
          <span className="text-primary-foreground text-2xl font-bold sm:text-3xl">
            P
          </span>
        </div>
        <span className="text-2xl font-medium sm:text-4xl">PodGen</span>
      </div>
      <h1 className="flex-1 text-center text-4xl font-bold sm:text-6xl">
        AI Podcast
      </h1>

      <div className="flex flex-1 justify-end">
        <div className="scale-200 sm:scale-250">
          <UserButton />
        </div>
      </div>
    </header>
  );
}
