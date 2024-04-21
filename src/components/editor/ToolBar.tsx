"use client";
import type { Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading2,
  Italic,
  List,
  ListOrdered,
  Quote,
  Strikethrough,
  Underline,
} from "lucide-react";

import ToolBarToggle from "./ToolBarToggle";
import ToolBarLink from "./ToolBarLink";
import ToolBarImage from "./ToolBarImage";

type Props = {
  editor: Editor | null;
};

export function ToolBar({ editor }: Props) {
  if (!editor) return null;

  return (
    <div className="border border-input rounded-md sticky top-0 bg-background z-10 flex flex-wrap gap-3 justify-center items-center">
      <ToolBarToggle
        pressed={editor.isActive("blockquote")}
        onPressedChange={() => editor.chain().toggleBlockquote().run()}
        Icon={Quote}
        onHoverMessage="BlockQuote"
      />
      <ToolBarToggle
        pressed={editor.isActive("heading")}
        onPressedChange={() => editor.chain().toggleHeading({ level: 2 }).run()}
        Icon={Heading2}
        onHoverMessage="Heading 2"
      />

      <ToolBarToggle
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().toggleBold().run()}
        Icon={Bold}
        onHoverMessage="Bold"
      />

      <ToolBarToggle
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().toggleItalic().run()}
        Icon={Italic}
        onHoverMessage="Italic"
      />

      <ToolBarToggle
        pressed={editor.isActive("underline")}
        onPressedChange={() => editor.chain().toggleUnderline().run()}
        Icon={Underline}
        onHoverMessage="Underline"
      />

      <ToolBarLink editor={editor} />

      <ToolBarToggle
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().toggleStrike().run()}
        Icon={Strikethrough}
        onHoverMessage="Strikethrough"
      />

      <ToolBarToggle
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().toggleBulletList().run()}
        Icon={List}
        onHoverMessage="List"
      />

      <ToolBarToggle
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().toggleOrderedList().run()}
        Icon={ListOrdered}
        onHoverMessage="Ordered List"
      />

      <ToolBarToggle
        pressed={editor.isActive({ textAlign: "left" })}
        onPressedChange={() => editor.chain().setTextAlign("left").run()}
        Icon={AlignLeft}
        onHoverMessage="Text align left"
      />

      <ToolBarToggle
        pressed={editor.isActive({ textAlign: "center" })}
        onPressedChange={() => editor.chain().setTextAlign("center").run()}
        Icon={AlignCenter}
        onHoverMessage="Text align center"
      />

      <ToolBarToggle
        pressed={editor.isActive({ textAlign: "right" })}
        onPressedChange={() => editor.chain().setTextAlign("right").run()}
        Icon={AlignRight}
        onHoverMessage="Text align right"
      />
      <ToolBarImage editor={editor} />
    </div>
  );
}
