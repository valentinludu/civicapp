import { safeAwait } from "@/lib/async";
import { handleDelete } from "@/lib/cloudinary";
import { logger } from "@/lib/logger";
import { NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return Response.json({ error: "No id provided." }, { status: 400 });
  }

  const [error] = await safeAwait(handleDelete(id));

  if (error) {
    logger.error("Failed to delete image.", { error });

    return Response.json({ error: "Failed to delete image." }, { status: 500 });
  }

  return Response.json({ message: "Image deleted." });
}
