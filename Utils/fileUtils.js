const path = require("path");
const fs = require("fs");
const AWS = require("aws-sdk");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

// Configure AWS S3
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

exports.uploadFile = async (file) => {
  const fileContent = fs.readFileSync(file.path);
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `uploads/${Date.now()}_${file.originalname}`,
    Body: fileContent,
  };

  const command = new PutObjectCommand(params);
  await s3.send(command);

  return {
    filename: file.originalname,
    filepath: params.Key,
  };
};
