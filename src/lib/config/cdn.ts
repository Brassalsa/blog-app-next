import { v2 as cloudinary } from "cloudinary";
import { checkEnvOrThrow } from "../utils/helpers";

cloudinary.config({
  cloud_name: checkEnvOrThrow(process.env.CLOUDINARY_CLOUD_NAME),
  api_key: checkEnvOrThrow(process.env.CLOUDINARY_API_KEY),
  api_secret: checkEnvOrThrow(process.env.CLOUDINARY_API_SECRET),
});

export { cloudinary };
