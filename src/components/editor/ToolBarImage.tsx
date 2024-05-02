import React, { useRef } from "react";
import ToolBarToggle from "./ToolBarToggle";
import { type Editor } from "@tiptap/react";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { uploadImage } from "@/lib/services/server/utils";

type Props = {
  editor: Editor;
};
function ToolBarImage({ editor }: Props) {
  const { toast } = useToast();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    toast({
      title: "File Upload",
      description: "File upload in progress",
    });

    const res = await uploadImage(formData, "image");
    if (!res.data) {
      toast({
        title: "File Upload",
        description: res.err,
        className: "text-red-400",
      });
      return;
    }

    toast({
      title: "File Upload",
      description: "File uploaded successfully!",
    });

    editor
      .chain()
      .setImage({
        src: res.data,
      })
      .run();
  };

  return (
    <div>
      <ToolBarToggle
        pressed={editor.isActive("image")}
        onPressedChange={() => {
          inputRef.current?.click();
        }}
        Icon={Upload}
        onHoverMessage="Upload file"
      />

      <input
        name="image"
        type="file"
        hidden
        ref={inputRef}
        onChange={handleImageUpload}
      />
    </div>
  );
}

export default ToolBarImage;
