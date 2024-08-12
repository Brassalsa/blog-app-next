"use client";

import { useEffect, useRef, useState } from "react";

export const useImagePreview = (image?: File | string | null) => {
  const [img, setImg] = useState<File | null>();
  const [imgData, setImgData] = useState<string | null>(() =>
    typeof image === "string" ? image : null
  );
  const [isLoading, setIsLoading] = useState(false);
  const onLoadRef = useRef((val: string) => {});
  useEffect(() => {
    if (!img && typeof image === "object") {
      setImg(image || null);
    }
    if (!image) return;

    if (typeof image === "string") {
      setImgData(image);
      return;
    }

    const reader = new FileReader();
    const ev = () => {
      setIsLoading(false);
      setImgData(reader.result?.toString() || "");
      onLoadRef?.current?.(reader.result?.toString() || "");
    };
    reader.addEventListener("load", ev);

    reader.readAsDataURL(image);
    setIsLoading(true);

    return () => {
      reader.removeEventListener("load", ev);
      reader.onload = null;
      setIsLoading(false);
      setImgData(null);
    };
  }, [image, setImgData]);

  return { url: imgData, isLoading, onLoadRef, setImg, img };
};
