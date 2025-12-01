export const getImgBaseUrl = (path: string | undefined | null): string => {
  // Return empty string if path is invalid
  if (!path || path.trim() === "") {
    return "";
  }

  // If path is already a full URL, return it as is (prevents double URL issue)
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_IMAGE_PATH_NEW_PATH || "";

  // If BASE_URL is not configured, return the path as is
  if (!BASE_URL || BASE_URL.trim() === "") {
    return path.replace(/^undefined\//, "");
  }

  // Remove trailing slash from BASE_URL and leading slash from path
  const cleanBaseUrl = BASE_URL.replace(/\/+$/, "");
  const cleanPath = path.replace(/^\/+/, "").replace(/^undefined\//, "");

  return `${cleanBaseUrl}/${cleanPath}`;
};
