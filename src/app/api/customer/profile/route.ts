import { writeFile, mkdir } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import connectDB from '@/db/connect';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath: string) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });

    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export async function POST(request: NextRequest) {
  await connectDB();

  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const cwd = process.cwd();
  const tempDir = join(cwd, 'public/temp');

  await mkdir(tempDir, { recursive: true });

  const path = join(tempDir, file.name);
  await writeFile(path, buffer);

  const response = await uploadOnCloudinary(path);

  if (response) {
    return NextResponse.json(
      {
        success: true,
        message: 'File uploaded successfully.',
        data: response,
      },
      { status: 201 }
    );
  } else {
    return NextResponse.json(
      {
        success: false,
        message: 'File upload failed.',
      },
      { status: 500 }
    );
  }
}
