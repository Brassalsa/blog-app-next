"use client";

import { useEffect, useState } from "react";

export const useImagePreview = (image?: File | string) => {
  const [imgData, setImgData] = useState<string>();

  useEffect(() => {
    if (!image || typeof image !== "object") return;

    const reader = new FileReader();
    const ev = () => {
      setImgData(reader.result?.toString());
    };
    reader.addEventListener("load", ev);

    reader.readAsDataURL(image);

    return () => {
      reader.removeEventListener("load", ev);
    };
  }, [image]);

  return imgData || "";
};
