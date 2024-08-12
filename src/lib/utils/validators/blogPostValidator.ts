import { z } from "zod";
import { ALL_CATEGORIES, CDNHost } from "@/lib/constants";
import { validateImageFile } from "./image";

const common = {
  title: z
    .string()
    .min(5, {
      message: "Title is too short",
    })
    .max(100, { message: "Title is too long, max 100 charactors" }),
  category: z.string().refine(categoryValidator, {
    message: "Invalid category",
  }),
  imagePubId: z.string(),
  about: z
    .string()
    .min(5, {
      message: "About section is too short",
    })
    .max(200, { message: "About section is too long, max 200 charactors" }),
  description: z.string(),
  descImgsIds: z.array(z.string()),
};
const blogSchemaClient = z.object({
  ...common,
  image: z.any().refine(
    (file?: File | string) => {
      if (!file) {
        return true;
      }
      if (typeof file === "string") {
        return file.includes("fakepath") || file.includes(CDNHost);
      }
      return validateImageFile(file);
    },
    {
      message: "Invalid Image file",
    }
  ),
});

export const blogSchemaServer = z.object({
  ...common,
  image: z
    .string()
    .min(10)
    .refine((val) => val.includes(CDNHost), "invalid image url"),
});

// category validation
function categoryValidator(cat: string) {
  const allCategories = Object.keys(ALL_CATEGORIES);
  return allCategories.includes(cat);
}

export default blogSchemaClient;
