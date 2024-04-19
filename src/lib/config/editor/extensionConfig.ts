import { LinkOptions } from "@tiptap/extension-link";
import { TextAlignOptions } from "@tiptap/extension-text-align";
import { StarterKitOptions } from "@tiptap/starter-kit";

export const starterConfig: Partial<StarterKitOptions> = {
  blockquote: {
    HTMLAttributes: {
      class:
        "p-4 my-4 border-s-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800",
    },
  },
  heading: {
    HTMLAttributes: {
      class: "text-xl font-semibold",
    },
  },

  bulletList: {
    HTMLAttributes: {
      class: "list-disc",
    },
  },

  orderedList: {
    HTMLAttributes: {
      class: "list-decimal",
    },
  },
};

export const textAlignConfig: Partial<TextAlignOptions> = {
  defaultAlignment: "left",
  types: ["heading", "paragraph"],
};

export const linkConfig: Partial<LinkOptions> = {
  HTMLAttributes: {
    class: "text-blue-400 underline",
  },
};
