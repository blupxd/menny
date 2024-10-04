import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import streamifier from "streamifier";

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper function to handle streaming to Cloudinary
const streamUpload = (buffer: Buffer): Promise<any> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { upload_preset: "itemImages", height: 250, width: 250, crop: "fill"}, // Cloudinary upload options
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
    streamifier.createReadStream(buffer).pipe(stream); // Convert the buffer to a stream and pipe to Cloudinary
  });
};

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    try {
      // Extract form data and get the file (as a Blob)
      const formData = await req.formData();
      const file = formData.get("file") as Blob;

      if (!file) {
        return NextResponse.json(
          { error: "No file provided" },
          { status: 400 }
        );
      }

      // Convert the file Blob to ArrayBuffer and then to Buffer for streaming
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Stream upload to Cloudinary
      const uploadResponse = await streamUpload(buffer);

      return NextResponse.json(
        { url: uploadResponse.secure_url },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      return NextResponse.json(
        { error: "Image upload failed" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }
}
