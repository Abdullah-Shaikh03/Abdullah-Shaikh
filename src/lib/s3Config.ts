import { S3Client } from "@aws-sdk/client-s3";

const { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;

if (!AWS_REGION || !AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
  // You can either throw or log — throwing helps catch missing config early
  console.log("Missing AWS_REGION or AWS credentials in environment")
  throw new Error("Missing AWS_REGION or AWS credentials in environment");
}

const s3 = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

export default s3;
