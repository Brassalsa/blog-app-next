"use client";

import NextTopLoader from "nextjs-toploader";
const TopLoader = () => (
  <NextTopLoader
    color="blue"
    initialPosition={0.08}
    crawlSpeed={200}
    height={3}
    crawl={true}
    showSpinner={false}
    easing="ease"
    speed={200}
    shadow="0 0 10px #2299DD,0 0 5px #2299DD"
  />
);

export default TopLoader;
