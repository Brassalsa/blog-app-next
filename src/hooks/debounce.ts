"use client";

type Cb = () => void;
const useDebounce = (interval: number = 200) => {
  return (cb: Cb, int: number = interval) => {
    const timeout = setTimeout(() => {
      cb();
    }, int);

    return clearTimeout(timeout);
  };
};

export default useDebounce;
