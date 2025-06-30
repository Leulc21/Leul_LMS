import "server-only";

import { S3Client } from "@aws-sdk/client-s3";

const AWS_ENDPOINT_URL_S3 = process.env.AWS_ENDPOINT_URL_S3 as string;

export const S3 = new S3Client({
  region: "auto",
  endpoint: AWS_ENDPOINT_URL_S3,
  forcePathStyle: false,
});
