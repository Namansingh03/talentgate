"use server";

import cloudinary from "@/lib/cloudinary";
import type { UploadApiResponse } from "cloudinary";

export async function uploadImage(file: File) {
  if (!file || file.size === 0) {
    throw new Error("No file uploaded");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result = await new Promise<UploadApiResponse>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "uploads",
          resource_type: "image",
          quality: "auto",
          fetch_format: "auto",
        },
        (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new Error("Upload failed"));
          resolve(result);
        },
      )
      .end(buffer);
  });

  return {
    url: result.secure_url,
    public_id: result.public_id,
  };
}
