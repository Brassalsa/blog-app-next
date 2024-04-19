"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { ToolBar } from "./ToolBar";
import { editorExtensions } from "@/lib/config/editor";
import useDebounce from "@/hooks/debounce";
import EditorLoading from "./editorSkelton";
import Show from "../ui/show";

type Props = {
  description: string;
  onChange: (richText: string) => void;
};

function Editor({ description, onChange }: Props) {
  const debounce = useDebounce();
  const editor = useEditor({
    extensions: editorExtensions,
    content: description,
    editorProps: {
      attributes: {
        class: "rounded-md border min-h-[300px] border-input px-6 py-2",
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
    <div className="flex flex-col gap-2 justify-stretch min-h-[320px] relative">
      <Show>
        <Show.When isTrue={!!editor}>
          <ToolBar editor={editor} />
          <EditorContent editor={editor} />
        </Show.When>
        <Show.Else>
          <EditorLoading />
        </Show.Else>
      </Show>
    </div>
  );
}

export default Editor;
