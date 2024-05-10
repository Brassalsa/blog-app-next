"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function useUrlQuery() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const constructUrl = (query: string) => {
    return pathName + "?" + query;
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const getParam = (key: string) => {
    return searchParams.get(key);
  };

  const setParam = (key: string, value: string | number) => {
    const query = createQueryString(key, String(value));
    router.push(constructUrl(query));
  };

  return {
    get: getParam,
    set: setParam,
  };
}
