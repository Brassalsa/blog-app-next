"use client";

import NextNProgress from "nextjs-progressbar";
const TopLoader = () => (
  <NextNProgress
    options={{
      easing: "ease-in",
      showSpinner: true,
    }}
  />
);

export default TopLoader;
