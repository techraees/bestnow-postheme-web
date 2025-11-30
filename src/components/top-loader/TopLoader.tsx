"use client";

import NextTopLoader from "nextjs-toploader";

export default function TopLoaderProvider() {
  return (
    <NextTopLoader
      color="#fdb801"
      initialPosition={0.08}
      crawlSpeed={200}
      height={3}
      crawl={true}
      showSpinner={false}
      easing="ease"
      speed={200}
    />
  );
}
