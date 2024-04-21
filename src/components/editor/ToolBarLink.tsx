"use client";

import React, { useRef, useState } from "react";
import { type Editor } from "@tiptap/react";
import ToolBarToggle from "./ToolBarToggle";
import { Link } from "lucide-react";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";

type Props = {
  editor: Editor;
};

function ToolBarLink({ editor }: Props) {
  const [href, setHref] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // check invalid input
  const isInValidInput = !inputRef.current?.validity.valid;

  // set href to the embedded url if selected element is "a"
  const handlePress = () => {
    const linkAttr = editor.getAttributes("link");

    if (editor.isActive("link") && linkAttr.href) {
      setHref(linkAttr.href);
    }
  };

  // embed link
  const handleEmbed = () => {
    if (href === "") {
      editor.chain().unsetLink().run();
      return;
    }

    editor
      .chain()
      .toggleLink({
        href,
      })
      .run();

    setHref("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ToolBarToggle
          pressed={editor.isActive("link")}
          Icon={Link}
          onHoverMessage="Link"
          onPressedChange={handlePress}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Embed Link</DialogTitle>
          <DialogDescription className="space-y-2">
            <p>Enter URL to Embed</p>
            <Input
              value={href}
              onChange={(e) => setHref(e.target.value)}
              type="url"
              ref={inputRef}
              placeholder="https://abc.co"
            />
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="reset" variant={"secondary"}>
              Close
            </Button>
          </DialogClose>
          <DialogClose disabled={isInValidInput} asChild>
            <Button type="submit" onClick={handleEmbed}>
              {href === "" ? "Unlink" : "Link"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ToolBarLink;
