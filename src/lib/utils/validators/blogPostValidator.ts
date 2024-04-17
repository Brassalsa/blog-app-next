import { z } from "zod";

const blogSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "Title is too short",
    })
    .max(100, { message: "Title is too long, max 100 charactors" }),
  about: z
    .string()
    .min(5, {
      message: "About section is too short",
    })
    .max(100, { message: "About section is too long, max 100 charactors" }),
  description: z.string(),
});

export default blogSchema;
