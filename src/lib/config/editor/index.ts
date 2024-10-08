import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { Extensions } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  CustomImage,
  imageConfig,
  linkConfig,
  starterConfig,
  textAlignConfig,
} from "./extensionConfig";

export const editorExtensions: Extensions = [
  StarterKit.configure(starterConfig),
  Underline.configure(),
  TextAlign.configure(textAlignConfig),
  Link.configure(linkConfig),
  CustomImage.configure(imageConfig),
];
