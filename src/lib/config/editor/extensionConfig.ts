import Image, { ImageOptions } from "@tiptap/extension-image";
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

export const imageConfig: Partial<ImageOptions> = {
  HTMLAttributes: {
    class: "desc-img",
  },
};

// custom image extension
export const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: null,
        parseHTML: (el) => el.getAttribute("class"),
        renderHTML: (attr) => {
          if (!attr.class) return {};
          return {
            class: attr.class + " desc-img",
          };
        },
      },
      pubId: {
        default: null,
        parseHTML: (el) => el.getAttribute("data-pub-id"),
        renderHTML: (attr) => {
          const pubId = attr.pubId;
          if (!pubId) {
            return {};
          }
          return {
            "data-pub-id": pubId,
          };
        },
      },
    };
  },
});
