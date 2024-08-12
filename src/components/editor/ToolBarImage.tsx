import React, { useRef, useState } from "react";
import ToolBarToggle from "./ToolBarToggle";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { uploadImage } from "@/lib/services/server/utils";
import { useEditorCtx } from ".";
import { useImagePreview } from "@/hooks/image-preview";

function ToolBarImage() {
  const { toast } = useToast();
  const { editor, pushImgPubId } = useEditorCtx();
  const [img, setImg] = useState<File | null>(null);
  const { onLoadRef } = useImagePreview(img);
  const inputRef = useRef<HTMLInputElement>(null);

  onLoadRef.current = (url) =>
    editor!
      .chain()
      .setImage({
        src: url!,
        alt: "uploading...",
        //@ts-expect-error
        class: "img-loading",
      })
      .run();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImg(file);
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
      setImg(null);
      return;
    }

    toast({
      title: "File Upload",
      description: "File uploaded successfully!",
    });
    const { pubId, url } = res.data;
    pushImgPubId(pubId);
    editor!
      .chain()
      .setNode("image")
      .setImage({
        src: url,
        alt: `image-${pubId}`,
        //@ts-expect-error
        pubId,
      })
      .run();
    inputRef.current!.value = "";
  };

  return (
    <div>
      <ToolBarToggle
        pressed={editor!.isActive("image")}
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
