import { FileConfig } from "@/lib/config/files";
import { z } from "zod";

export const imageSchema = z.any().refine(validateImageFile, {
  message: `Invalid image file or file size exceed ${FileConfig.maxSize}MB`,
});

const fileSizeBytes = FileConfig.maxSize * 1000000;
// image file validation
export function validateImageFile(file: File | unknown) {
  if (!(file instanceof File)) {
    return false;
  }
  if (!file?.type?.startsWith("image/")) {
    return false;
  }
  // Check file size
  if (file.size > fileSizeBytes) {
    return false;
  }

  return true;
}
