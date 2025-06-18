import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import { TRPCReactProvider } from "~/trpc/react";
import SignedInHeader from "@/components/signed-in-header";
import { AudioPlayerProvider } from "@/components/audio-player";

export const metadata: Metadata = {
  title: "InstaPod",
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
          <AudioPlayerProvider>
            <SignedOut></SignedOut>
            <SignedIn>
              <SignedInHeader />
            </SignedIn>

            <TRPCReactProvider>{children}</TRPCReactProvider>
          </AudioPlayerProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
