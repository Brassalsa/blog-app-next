"use client";
import type { Node } from "@tiptap/pm/model";
import { useEditor, EditorContent, Editor as EditorType } from "@tiptap/react";
import { ToolBar } from "./ToolBar";
import { editorExtensions } from "@/lib/config/editor";
import useDebounce from "@/hooks/debounce";
import EditorLoading from "./editorSkelton";
import {
  createContext,
  Dispatch,
  forwardRef,
  Ref,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

type Props = {
  description: string;
  onChange: (richText: string) => void;
};

export type EditorRef = {
  editor: EditorType | null;
  imgPubIds: string[];
  traverser: (cb: (node: Node) => void) => () => void;
};

type EditorCtxType = EditorRef & {
  setImgPubIds: Dispatch<string[]>;
  pushImgPubId: Dispatch<string>;
  popImgPubId: Dispatch<string>;
};

export const EditorCtx = createContext<EditorCtxType | null>(null);

export const useEditorCtx = () => {
  const ctx = useContext(EditorCtx);
  if (!ctx) {
    throw new Error("useEditorCtx must be used inside Editor");
  }
  return ctx;
};

function Editor(
  { description, onChange }: Props,
  editorRef: Ref<EditorRef | null>
) {
  const [imgPubIds, setImgPubIds] = useState<string[]>([]);
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
      });
    },
  });

  useImperativeHandle(editorRef, () => ({ editor, imgPubIds, traverser }));
  // on load add img pub ids
  useEffect(() => {
    if (editor) {
      const newImgPubIds: string[] = [];
      traverser((node) => {
        if (node.type.name === "image" && node.attrs["pubId"]) {
          newImgPubIds.push(node.attrs["pubId"]);
        }
      })();
      setImgPubIds([...imgPubIds, ...newImgPubIds]);
    }
  }, [editor]);

  function traverser(cb: (node: Node) => void) {
    return () => {
      editor?.state.doc.descendants((node) => {
        cb(node);
      });
    };
  }

  function pushImgPubId(val: string) {
    setImgPubIds([...imgPubIds, val]);
  }

  return (
    <EditorCtx.Provider
      value={{
        editor,
        imgPubIds,
        setImgPubIds,
        pushImgPubId,
        popImgPubId: (val) => setImgPubIds(imgPubIds.filter((i) => i != val)),
        traverser,
      }}
    >
      <div className="flex flex-col gap-2 justify-stretch min-h-[320px] relative">
        {!editor ? (
          <EditorLoading />
        ) : (
          <>
            <ToolBar />
            <EditorContent editor={editor} />
          </>
        )}
      </div>
    </EditorCtx.Provider>
  );
}

export default forwardRef(Editor);
