"use server";

import {
  UploadApiErrorResponse,
  UploadApiOptions,
  UploadApiResponse,
} from "cloudinary";
import cdn from ".";

export default async function uploadFile(
  file: File,
  options: UploadApiOptions
) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  const res = await new Promise<
    UploadApiResponse | UploadApiErrorResponse | undefined
  >((resolve, reject) => {
    cdn.uploader
      .upload_stream(options, function (err, result) {
        if (err) {
          reject(err);
        }

        resolve(result);
      })
      .end(buffer);
  });

  return res;
}
