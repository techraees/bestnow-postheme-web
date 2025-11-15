import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { commonBaseQueryWithoutToken } from "./customerAuthBaseQuery";

export const customerAuthApi = createApi({
  reducerPath: "customerAuthApi",
  baseQuery: commonBaseQueryWithoutToken,
  endpoints: (builder) => ({
    loginCustomer: builder.mutation({
      query: (data: any) => ({
        url: "/mobile-accessories/web/auth/customer/login",
        method: "POST",
        body: data,
      }),
    }),
    registerCustomer: builder.mutation({
      query: (data: any) => ({
        url: "/customer-auth/register",
        method: "POST",
        body: data,
      }),
    }),
    logoutCustomer: builder.mutation({
      query: (data: any) => ({
        url: "/mobile-accessories/web/auth/customer/logout",
        method: "POST",
        body: data,
      }),
    }),
    loginUserFoundName: builder.mutation({
      query: (data: any) => ({
        url: "/customer-auth/get-user-role",
        method: "POST",
        body: data,
      }),
    }),
    loginUserOTP: builder.mutation({
      query: (data: any) => ({
        url: "/customer-auth/generate-otp",
        method: "POST",
        body: data,
      }),
    }),
    verifyLoginUserData: builder.mutation({
      query: (data: any) => ({
        url: "/customer-auth/verify-login",
        method: "POST",
        body: data,
      }),
    }),
    forgotPasswordOtpVerify: builder.mutation({
      query: (data: any) => ({
        url: "/customer-auth/forgot-password-otp-verify",
        method: "POST",
        body: data,
      }),
    }),
    forgotPasswordChnage: builder.mutation({
      query: (data: any) => ({
        url: "/customer-auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginCustomerMutation,
  useRegisterCustomerMutation,
  useLoginUserOTPMutation,
  useLoginUserFoundNameMutation,
  useVerifyLoginUserDataMutation,
  useForgotPasswordOtpVerifyMutation,
  useForgotPasswordChnageMutation,
  useLogoutCustomerMutation,
} = customerAuthApi;
