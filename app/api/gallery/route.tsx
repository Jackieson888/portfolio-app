import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

function getFileExtension(fileKey: string | undefined) {
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

        do {
            const command: ListObjectsV2Command = new ListObjectsV2Command({
                Bucket: S3_BUCKET_NAME,
                ContinuationToken: continuationToken,
                MaxKeys: 1000,
            });

            const response = await s3.send(command);

            if (Array.isArray(response.Contents)) {
                allObjects.push(...response.Contents);
            }

            continuationToken = response.IsTruncated
                ? response.NextContinuationToken
                : undefined;
        } while (continuationToken);

        return Response.json({
            count: allObjects.length,
            objects: allObjects.map(obj => ({
                key: obj.Key ?? null,
                size: obj.Size ?? null,
                type: getFileExtension(obj.Key),
                lastModified: obj.LastModified ?? null,
                url: obj.Key
                    ? `https://${S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${obj.Key}`
                    : null
            })),
        });
    } catch (error) {
        console.error("S3 list error:", error);
        return Response.json({ error: "Unable to retrieve S3 objects" }, { status: 500 });
    }
}
