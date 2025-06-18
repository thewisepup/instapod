/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { SignatureV4 } from "@aws-sdk/signature-v4";
import { Sha256 } from "@aws-crypto/sha256-browser"; // Use @aws-crypto/sha256-browser for environment compatibility
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import { HttpRequest } from "@aws-sdk/protocol-http";
import { env } from "@/env";

const credentials = await defaultProvider()();

const PODCAST_GENERATION_LAMBDA_URL = env.PODCAST_GENERATION_LAMBDA_URL;
const REGION = env.AWS_REGION;

const signer = new SignatureV4({
  credentials,
  region: REGION,
  service: "lambda",
  sha256: Sha256,
});

export const invokePodcastGeneration = async (podcastId: string) => {
  if (!podcastId || typeof podcastId !== "string" || podcastId.trim() === "") {
    console.error("[Podcast Generation] Invalid podcast ID provided");
    throw new Error("Invalid podcast ID");
  }
  console.log(
    `[Podcast Generation] Starting Lambda invocation for podcast ID: ${podcastId}`,
  );

  try {
    const request = new HttpRequest({
      hostname: new URL(PODCAST_GENERATION_LAMBDA_URL).hostname,
      protocol: new URL(PODCAST_GENERATION_LAMBDA_URL).protocol,
      path: new URL(PODCAST_GENERATION_LAMBDA_URL).pathname,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Host: new URL(PODCAST_GENERATION_LAMBDA_URL).hostname,
      },
      body: JSON.stringify({
        podcast_id: podcastId,
      }),
    });
    const signedRequest = await signer.sign(request);

    void fetch(PODCAST_GENERATION_LAMBDA_URL, {
      method: signedRequest.method,
      headers: signedRequest.headers,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      body: signedRequest.body,
    });

    //TODO: Add better error handling to ensure lambda function receives initial request, but doesn't wait on the response
    console.log(
      `[Podcast Generation] Sent request to Lambda for podcast ID: ${podcastId}`,
    );
  } catch (error) {
    console.error(
      "[Podcast Generation] Error sending request to Lambda:",
      error,
    );
    throw error;
  }
};
