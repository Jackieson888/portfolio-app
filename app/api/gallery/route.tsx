import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

function getFileExtension(fileKey: string) {
    if (typeof fileKey !== 'string') return '';
    const match = fileKey.match(/\.([^.]+)$/);
    return match ? match[1] : '';
}

export async function GET() {
    const {
        AWS_REGION,
        AWS_ACCESS_KEY_ID,
        AWS_SECRET_ACCESS_KEY,
        S3_BUCKET_NAME
    } = process.env;

    if (!AWS_REGION || !AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !S3_BUCKET_NAME) {
        return Response.json({ error: "Missing required AWS configuration" }, { status: 500 });
    }

    try {
        const s3 = new S3Client({
            region: AWS_REGION,
            credentials: {
                accessKeyId: AWS_ACCESS_KEY_ID,
                secretAccessKey: AWS_SECRET_ACCESS_KEY,
            },
        });

        const allObjects = [];
        let continuationToken;
        let iterationCount = 0;
        const MAX_ITERATIONS = 100;

        do {
            const command = new ListObjectsV2Command({
                Bucket: S3_BUCKET_NAME,
                ContinuationToken: continuationToken,
                MaxKeys: 1000,
            });

            const response = await s3.send(command);

            if (Array.isArray(response.Contents)) {
                allObjects.push(...response.Contents);
            }

            continuationToken = response.IsTruncated ? response.NextContinuationToken : undefined;
            iterationCount++;

            if (iterationCount > MAX_ITERATIONS) {
                console.warn("Max pagination iterations reached. Stopping early.");
                break;
            }
        } while (continuationToken);
        return Response.json({
            count: allObjects.length,
            objects: allObjects.map(obj => ({
                key: obj.Key,
                size: obj.Size,
                type: getFileExtension(obj.Key),
                lastModified: obj.LastModified,
                url: `https://${S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${obj.Key}`
            })),
        });
    } catch (error) {
        console.error("S3 list error:", error);
        return Response.json({ error: "Unable to retrieve S3 objects" }, { status: 500 });
    }
}
