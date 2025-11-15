import {
  fetchBaseQuery,
  FetchArgs,
  BaseQueryApi,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import {
  getCookie,
  removeCookie,
  setCookie,
} from "@/utils/coreUtils/cookieFunction";
import { REFRESH_TOKEN_ERROR } from "@/data/coreData/coreData";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL_BACKEND,
  prepareHeaders: (headers) => {
    const token = getCookie("access_token");
    headers.set("x-business-name", "BESTNOW Mobile Accessories");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

interface RefreshTokenResponse {
  payload: {
    access_token: string;
    message?: string;
  };
}

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 403) {
    const refreshToken = getCookie("refresh_token");

    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: "/auth/refresh",
          method: "POST",
          body: { refresh_token: refreshToken },
        },
        api,
        extraOptions
      );

      console.log(refreshResult);

      if (refreshResult.data) {
        const refreshData = refreshResult.data as RefreshTokenResponse;
        setCookie("access_token", refreshData.payload.access_token);

        result = await baseQuery(args, api, extraOptions);
      } else {
        console.error("Failed to refresh token.");
        if (
          (refreshResult?.data as any)?.payload?.message ==
          REFRESH_TOKEN_ERROR.EXPIRED_TOKEN
        ) {
          removeCookie("access_token");
          removeCookie("refresh_token");
        }

        // Return the original failed result (no recursion)
        return result;
      }
    }
  }

  return result;
};

export default baseQueryWithReauth;

export const commonBaseQueryWithoutToken = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL_BACKEND,
  prepareHeaders: (headers) => {
    headers.set("x-business-name", "BESTNOW Mobile Accessories");
    return headers;
  },
});
