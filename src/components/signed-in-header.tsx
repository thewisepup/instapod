import { UserButton } from "@clerk/nextjs";
import AppLogo from "./app-logo";

export default function SignedInHeader() {
  return (
    <div className="relative w-full">
      <div className="flex flex-1 items-center gap-4">
        <AppLogo />
        <span className="text-2xl font-medium sm:text-4xl">InstaPod</span>
      </div>

      <div className="absolute top-4 right-4">
        <div className="scale-200">
          <UserButton />
        </div>
      </div>
    </div>
  );
}
