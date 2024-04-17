"use client";

import React, { useEffect, useState } from "react";
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

  // set href to the embedded url if selected element is "a"
  const handlePress = () => {
    const linkAttr = editor.getAttributes("link");

    if (editor.isActive("link") && linkAttr.href) {
      setHref(linkAttr.href);
    }
    console.log("LinkAtt ", linkAttr);
  };

  // embed link
  const handleEmbed = () => {
    if (href === "") return;

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
          <DialogDescription>
            <Input
              type="url"
              value={href}
              onChange={(e) => setHref(e.target.value)}
            />
          </DialogDescription>
        </DialogHeader>
        <DialogClose asChild>
          <DialogFooter>
            <Button type="reset" variant={"secondary"}>
              Close
            </Button>
            <Button type="submit" onClick={handleEmbed}>
              Toggle
            </Button>
          </DialogFooter>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default ToolBarLink;
