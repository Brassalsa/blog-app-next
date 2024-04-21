"use server";

import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import cdn from ".";

export default async function uploadFile(
  formData: FormData,
  key: string = "file"
) {
  const file = formData.get(key) as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  const res = await new Promise<
    UploadApiResponse | UploadApiErrorResponse | undefined
  >((resolve, reject) => {
    cdn.uploader
      .upload_stream(
        {
          tags: ["blog-assets"],
        },
        function (err, result) {
          if (err) {
            reject(err);
          }

          resolve(result);
        }
      )
      .end(buffer);
  });

  return res?.url;
}
