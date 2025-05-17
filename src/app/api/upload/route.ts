import { safeAwait } from "@/lib/async";
import { handleUpload } from "@/lib/cloudinary";
import { logger } from "@/lib/logger";

export async function POST(req: Request) {
  const file = await req.formData();

  const image = file?.get("file") as File | null;

  if (!image) {
    // If no file is received, return a JSON response with an error and a 400 status code
    return Response.json({ error: "No files received." }, { status: 400 });
  }

  const fileBuffer = await image?.arrayBuffer();
  const base64 = Buffer.from(fileBuffer).toString("base64");
  const dataURI = "data:" + image.type + ";base64," + base64;

  const [error, cldRes] = await safeAwait(handleUpload(dataURI));

  if (error) {
    logger.error("Failed to upload image.", { error });

    return Response.json({ error: "Failed to upload image." }, { status: 500 });
  }

  return Response.json({ url: cldRes.secure_url, id: cldRes.public_id });
}
