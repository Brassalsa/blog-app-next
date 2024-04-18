"use client";

import { useRef } from "react";

type Cb = () => void;
const useDebounce = (int: number = 200) => {
  const timerId = useRef<any>(null);

  return (cb: Cb, delay = int) => {
    clearTimeout(timerId.current);
    timerId.current = setTimeout(() => {
      cb();
    }, delay);
  };
};

export default useDebounce;
