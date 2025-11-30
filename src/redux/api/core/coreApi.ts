import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./coreBaseQuery";

// Define a service using a base URL and expected endpoints
export const coreApi = createApi({
  reducerPath: "coreApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllModelValueBasedOnEnumService: builder.query({
      query: (enum_value: string) =>
        `/core/model/data/enums?enum_value=${enum_value}`,
    }),

    // Get All Products Based on Filter
    getAllProductsBasedOnFilter: builder.query({
      query: (queryParams: string) =>
        `/mobile-accessories/web/sales/products?${queryParams}`,
    }),

    // Get All Categories of Products
    getAllProductsCategories: builder.query({
      query: () => `/filters/categories?is_stock_available=true`,
    }),

    // Get All Brand Name of Products
    getAllProductsBrandsNames: builder.query({
      query: () => `/filters/brands?is_stock_available=true`,
    }),

    // Used to verify the image
    verifyImageFaceDetection: builder.mutation({
      query: (data: any) => ({
        url: `/core/facial/recognition`,
        method: "POST",
        body: data,
      }),
    }),

    // Used to get SignContact Number
    getSignupContactNumber: builder.query({
      query: (queryParams: string) => `/core/contact-number/get?${queryParams}`,
    }),

    // Used to get all social links
    getAllSocialLinks: builder.query<any, void>({
      query: () => `/common-features/social-links/get`,
    }),
    getAllCategories: builder.query({
      query: () => `/mobile-accessories/web/sales/products/category-list`,
    }),
    getAllSocialLinksWithEngagements: builder.query({
      query: () => `/mobile-accessories/web/engagements/social-media-links`,
    }),
  }),
});

export const {
  useGetAllModelValueBasedOnEnumServiceQuery,
  useGetAllProductsBasedOnFilterQuery,
  useGetAllProductsBrandsNamesQuery,
  useGetAllProductsCategoriesQuery,
  useVerifyImageFaceDetectionMutation,
  useGetSignupContactNumberQuery,
  useGetAllSocialLinksQuery,
  useGetAllCategoriesQuery,
  useGetAllSocialLinksWithEngagementsQuery
} = coreApi;
