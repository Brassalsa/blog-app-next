"use client";

import { useEffect, useState } from "react";
import useDebounce from "./debounce";

const useLocalStorage = <T>(key: string) => {
  const [getItems, setItems] = useState<T | null>(null);
  const debounceSave = useDebounce();
  // set items
  useEffect(() => {
    const getItem = localStorage.getItem(key);
    setItems(getItem ? JSON.parse(getItem) : getItem);
  }, [key]);

  function saveItemToLocal(items: T, debounce = false, debounceTime = 200) {
    const cb = () => {
      localStorage.setItem(key, JSON.stringify(items));
    };
    if (debounce) {
      debounceSave(cb, debounceTime);
    } else {
      cb();
    }
  }

  function removeItems() {
    localStorage.removeItem(key);
  }

  return {
    getItems,
    saveItemToLocal,
    removeItems,
  };
};

export default useLocalStorage;
