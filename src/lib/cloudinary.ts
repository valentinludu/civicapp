import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function handleUpload(file: string) {
  const res = await cloudinary.uploader.upload(file, {
    transformation: [
      { width: 1000, crop: "scale" },
      { quality: "auto" },
      { fetch_format: "auto" },
    ],
  });

  return res;
}

export async function handleDelete(id: string) {
  const res = await cloudinary.uploader.destroy(id);

  return res;
}
