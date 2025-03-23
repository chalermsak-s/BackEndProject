// Description: This file contains utility functions for uploading files to cloud storage.
// It includes a function to generate a salted filename and a function to upload a file to an S3 bucket.

import s3Client from '../awsConfig';
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { randomBytes } from 'crypto';
import { BaseService } from './baseService';

function generateSaltedFilename(originalName: string): string {
  const salt = randomBytes(16).toString('hex');
  const extension = originalName.split('.').pop();
  return `${salt}.${extension}`;
}

export async function uploadFile(bucket: string, filePath: string, file: Express.Multer.File): Promise<string> {
  try {
    const saltedFilename = generateSaltedFilename(file.originalname);
    const saltedFilePath = `${filePath}/${saltedFilename}`;
    const params = {
      Bucket: bucket,
      Key: saltedFilePath,
      Body: file.buffer,
      ContentType: file.mimetype
    };

    const data = await s3Client.send(new PutObjectCommand(params));
    console.log('File uploaded successfully:', data);
    const publicUrl = `${process.env.SUPABASE_OUTPUT_URL}/${saltedFilePath}`;
    return publicUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}