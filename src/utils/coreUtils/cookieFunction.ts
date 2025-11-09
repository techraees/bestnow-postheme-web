import Cookies from "js-cookie";

interface CookieOptions {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
}

export const setCookie = (
  key: string,
  value: string,
  options: CookieOptions = {}
): void => {
  // Calculate expiration date 2 days from now
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 2);

  // Set the cookie with expiration date and path
  Cookies.set(key, value, { ...options, expires: expirationDate, path: "/" });
};

export const getCookie = (key: string): string | undefined => {
  return Cookies.get(key);
};

export const removeCookie = (key: string): void => {
  Cookies.remove(key, { path: "/" });
};
