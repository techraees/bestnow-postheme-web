export const getImgBaseUrl = (path: string): string => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_IMAGE_PATH_NEW_PATH || "";
  return `${BASE_URL}/${path}`;
};
