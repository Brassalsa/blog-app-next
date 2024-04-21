import React, { useRef } from "react";
import ToolBarToggle from "./ToolBarToggle";
import { type Editor } from "@tiptap/react";
import { Upload } from "lucide-react";
import uploadFile from "@/lib/services/cdn/upload";
import { useToast } from "@/hooks/use-toast";

type Props = {
  editor: Editor;
};
function ToolBarImage({ editor }: Props) {
  const { toast } = useToast();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("image", file);

      toast({
        title: "File Upload",
        description: "File upload in progress",
      });

      const res = await uploadFile(formData, "image");

      toast({
        title: "File Upload",
        description: "File uploaded successfully!",
      });

      editor
        .chain()
        .setImage({
          src: res,
        })
        .run();
    } catch (err: unknown) {
      toast({
        title: "Error",
        description: "File uploading failed.....",
      });

      console.log(err);
    }
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
