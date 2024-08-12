"use server";

import {
  UploadApiErrorResponse,
  UploadApiOptions,
  UploadApiResponse,
  DeleteApiResponse,
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

export const deleteFile = async (
  pubId: string,
  tag: string
): Promise<DeleteApiResponse> => {
  const resource: UploadApiResponse | undefined = await cdn.api.resource(pubId);

  if (!resource?.tags.includes(tag)) {
    throw new Error("file don't have tag");
  }
  return await cdn.uploader.destroy(pubId);
};

export const deleteFilesByTag = async (tag: string) =>
  await cdn.api.delete_resources_by_tag(tag);
