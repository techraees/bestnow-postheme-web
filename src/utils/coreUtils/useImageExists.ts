import { useEffect, useState } from "react";

const useImageExists = (url: string) => {
  const [exists, setExists] = useState<boolean | null>(null); // null = loading, true = exists, false = not exists

  useEffect(() => {
    if (!url) {
      setExists(null);
      return;
    }

    const img = new Image();
    img.onload = () => setExists(true);
    img.onerror = () => setExists(null);
    img.src = url;
  }, [url]);

  return exists as boolean | null | undefined;
};

export default useImageExists;
