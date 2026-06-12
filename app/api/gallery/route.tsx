import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

export const runtime = "nodejs"; // Critical for AWS SDK v3

function getFileExtension(fileKey: string | undefined) {
  if (!fileKey) return "";
  const match = fileKey.match(/\.([^.]+)$/);
  return match ? match[1] : "";
}

const {
  S3_REGION,
  S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY,
  S3_BUCKET_NAME,
} = process.env;

const s3 = new S3Client({
  region: S3_REGION!,
  credentials: {
    accessKeyId: S3_ACCESS_KEY_ID!,
    secretAccessKey: S3_SECRET_ACCESS_KEY!,
  },
});

export async function GET() {
  if (
    !S3_REGION ||
    !S3_ACCESS_KEY_ID ||
    !S3_SECRET_ACCESS_KEY ||
    !S3_BUCKET_NAME
  ) {
    console.error("Missing AWS env vars");
    return Response.json(
      { error: "Missing AWS configuration" },
      { status: 500 },
    );
  }

  try {
    const allObjects = [];
    let continuationToken: string | undefined;

    do {
      const response = await s3.send(
        new ListObjectsV2Command({
          Bucket: S3_BUCKET_NAME,
          ContinuationToken: continuationToken,
          MaxKeys: 1000,
        }),
      );

      if (Array.isArray(response.Contents)) {
        allObjects.push(...response.Contents);
      }

      continuationToken = response.IsTruncated
        ? response.NextContinuationToken
        : undefined;
    } while (continuationToken);

    return Response.json({
      count: allObjects.length,
      objects: allObjects.map((obj) => ({
        key: obj.Key ?? null,
        size: obj.Size ?? null,
        type: getFileExtension(obj.Key),
        lastModified: obj.LastModified ?? null,
        url: obj.Key
          ? `https://${S3_BUCKET_NAME}.s3.${S3_REGION}.amazonaws.com/${obj.Key}`
          : null,
      })),
    });
  } catch (error) {
    console.error("S3 list error:", error);
    return Response.json(
      { error: "Unable to retrieve S3 objects" },
      { status: 500 },
    );
  }
}
