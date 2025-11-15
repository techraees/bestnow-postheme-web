import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./coreBaseQuery";

// Banner response types
export interface Banner {
  id: string | number;
  display_name?: string;
  mobile_img_path?: string;
  tablet_img_path?: string;
  desktop_img_path?: string;
  link?: string;
  title?: string;
  [key: string]: any;
}

interface AllBannersResponse {
  status: string;
  payload: Banner[];
}

export const bannerApi = createApi({
  reducerPath: "bannerApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllBanner: builder.query<AllBannersResponse, void>({
      query: () =>
        "/mobile-accessories/web/engagements/banners?type=homepage&platform_type=WEB",
    }),
  }),
});

export const { useGetAllBannerQuery } = bannerApi;
