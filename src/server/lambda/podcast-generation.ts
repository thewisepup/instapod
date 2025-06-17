import { SignatureV4 } from "@aws-sdk/signature-v4";
import { Sha256 } from "@aws-crypto/sha256-browser"; // Use @aws-crypto/sha256-browser for environment compatibility
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import { HttpRequest } from "@aws-sdk/protocol-http";

// TODO: clean up init signer
const credentials = await defaultProvider()();
const LAMBDA_URL =
  "https://vfrkclvwmcukgwgyiahwcvzpyi0nwqfu.lambda-url.us-east-1.on.aws/"; // TODO: make this an env var
const REGION = process.env.AWS_REGION ?? "us-east-1"; // TODO: update in env

const signer = new SignatureV4({
  credentials,
  region: REGION,
  service: "lambda",
  sha256: Sha256,
});

export const invokePodcastGeneration = async (podcastId: string) => {
  //TODO: add check that podcastId exists
  console.log(
    `[Podcast Generation] Starting Lambda invocation for podcast ID: ${podcastId}`,
  );

  try {
    const request = new HttpRequest({
      hostname: new URL(LAMBDA_URL).hostname,
      protocol: new URL(LAMBDA_URL).protocol,
      path: new URL(LAMBDA_URL).pathname,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Host: new URL(LAMBDA_URL).hostname,
      },
      body: JSON.stringify({
        podcast_id: podcastId,
      }),
    });
    const signedRequest = await signer.sign(request);
    const response = await fetch(LAMBDA_URL, {
      method: signedRequest.method,
      headers: signedRequest.headers,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      body: signedRequest.body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `[Podcast Generation] Lambda returned error status: ${response.status}`,
      );
      console.error(`[Podcast Generation] Error response: ${errorText}`);
      throw new Error(`Lambda returned error status: ${response.status}`);
    }

    console.log(
      `[Podcast Generation] Successfully sent request to Lambda for podcast ID: ${podcastId}`,
    );
  } catch (error) {
    console.error(
      "[Podcast Generation] Error sending request to Lambda:",
      error,
    );
    throw error;
  }
};
