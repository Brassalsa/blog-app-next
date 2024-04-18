"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import { ToolBar } from "./ToolBar";
import {
  linkConfig,
  starterConfig,
  textAlignConfig,
} from "@/lib/config/editor";
import useDebounce from "@/hooks/debounce";

type Props = {
  description: string;
  onChange: (richText: string) => void;
};

function Editor({ description, onChange }: Props) {
  const debounce = useDebounce();
  const editor = useEditor({
    extensions: [
      StarterKit.configure(starterConfig),
      Underline.configure(),
      TextAlign.configure(textAlignConfig),
      Link.configure(linkConfig),
    ],
    content: description,
    editorProps: {
      attributes: {
        class: "rounded-md border min-h-[150px] border-input px-6 py-2",
      },
    },
    onUpdate({ editor }) {
      debounce(() => {
        onChange(editor.getHTML());
        console.log(editor.getHTML());
      });
    },
  });
  return (
    <div className="flex flex-col gap-2 justify-stretch min-h-[250px] relative">
      <ToolBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

export default Editor;
