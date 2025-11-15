import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./customerAuthBaseQuery";

// Define a service using a base URL and expected endpoints
export const authProfileApi = createApi({
  reducerPath: "authProfileApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Condition"],
  endpoints: (builder) => ({
    verifyToken: builder.query({
      query: () => "/mobile-accessories/web/auth/customer/profile",
    }),
  }),
});

export const { useVerifyTokenQuery } = authProfileApi;
