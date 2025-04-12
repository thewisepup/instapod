import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import { TRPCReactProvider } from "~/trpc/react";
import SignedInHeader from "@/components/signed-in-header";
import { SignIn } from "@/components/sign-in";
import { SignUp } from "~/components/sign-up";

export const metadata: Metadata = {
  title: "AI Podcast",
  description: "Create AI-Powered Podcasts",
  // icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${geist.variable}`}>
        <body>
          <header className="flex h-16 items-center justify-end gap-4 p-4">
            <SignedOut>
              <SignIn />
              <SignUp />
            </SignedOut>
            <SignedIn>
              <SignedInHeader />
            </SignedIn>
          </header>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
