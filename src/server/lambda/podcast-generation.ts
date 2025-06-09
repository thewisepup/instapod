const LAMBDA_URL =
  "https://rhpm24krrhdjys5xdkodhka2su0nokwc.lambda-url.us-east-2.on.aws/";

export const invokePodcastGeneration = async (podcastId: string) => {
  console.log(
    `[Podcast Generation] Starting Lambda invocation for podcast ID: ${podcastId}`,
  );

  try {
    const response = await fetch(LAMBDA_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        podcast_id: podcastId,
      }),
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
