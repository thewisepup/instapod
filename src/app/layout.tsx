import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import { TRPCReactProvider } from "~/trpc/react";
import SignedInHeader from "@/components/signed-in-header";
import { SignIn } from "@/components/sign-in";
import { SignUp } from "@/components/sign-up";
import AppLogo from "@/components/app-logo";

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
          <header className="flex h-16 items-center justify-between px-6">
            <SignedOut>
              <div className="flex items-center">
                <AppLogo />
              </div>
              <div className="flex items-center gap-2">
                <SignIn />
                <SignUp />
              </div>
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
