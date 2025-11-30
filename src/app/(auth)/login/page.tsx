"use client";
import { FormProvider, useForm } from "react-hook-form";
import React, { useState } from "react";
import CustomInputField from "@/components/input/CustomInputField";
import { Button } from "@/components/button";
import { BestonDarkLogo, BestonLightLogo } from "@/assets";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { useLoginCustomerMutation } from "@/redux/api/auth/customerAuthApi";
import { setCookie } from "@/utils/coreUtils/cookieFunction";
import { toast } from "react-toastify";

const LoginPage = () => {
  const methods = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { theme_mode } = useSelector((s: RootState) => s.coreAppSlice);
  const [isLoading, setIsLoading] = useState(false);

  const [loginCustomer] = useLoginCustomerMutation();

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);

      // Call the Api
      const response = await loginCustomer(data);

      if (response?.error && "data" in response.error) {
        toast.error((response.error.data as any)?.message, {
          toastId: "errorMessage",
        });
      } else if (response?.data?.status) {
        if (response?.data?.status === "success") {
          setCookie("access_token", response?.data?.payload?.access_token);
          setCookie("refresh_token", response?.data?.payload?.refresh_token);
          // toast.success("Login successful!...");
          methods.reset();

          // Now Reroute to other page
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        } else {
          toast.error("Unexpected response. Please try again.");
        }
      } else {
        toast.error("Unknown error happened");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="lg:w-[50%] w-full bg-light_mode_color dark:bg-dark_mode_color py-8">
      <div className="">
        {/* Logo */}
        <div className="flex items-center justify-center py-6">
          {theme_mode == "dark" ? (
            <Image
              src={BestonDarkLogo}
              alt="Beston Dark Logo"
              width={48}
              height={48}
              className="w-12 h-12"
            />
          ) : (
            <Image
              src={BestonLightLogo}
              alt="Beston Light Logo"
              width={48}
              height={48}
              className="w-12 h-12"
            />
          )}
        </div>

        {/* Heading */}
        <div className="text-center lg:text-left mb-8 w-full">
          <h1 className="text-[42px] font-semibold text-left leading-14 text-light_mode_text dark:text-dark_mode_text mb-1">
            Hey, <br /> Login Now!
          </h1>
          <p className="text-light_mode_gray1_color dark:text-dark_mode_gray1_color font-outfit text-left font-light text-[15px] leading-[22px] tracking-[0] mt-2">
            Please enter your username / Mobile and password
            <br />
            to login to your existing account
          </p>
        </div>

        {/* Form */}
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-4"
          >
            {/* username / Phone */}
            <CustomInputField
              name="username"
              placeholder="Username"
              icon={
                <div className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color w-[20px] h-[20px]">
                  <svg
                    className="w-[20px] h-[20px]"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.1946 10.75C15.1946 13.2045 13.2047 15.1944 10.7501 15.1944C8.29551 15.1944 6.30566 13.2045 6.30566 10.75C6.30566 8.29539 8.29551 6.30554 10.7501 6.30554C13.2047 6.30554 15.1946 8.29539 15.1946 10.75Z"
                      stroke="currentColor"
                      stroke-width="1.5"
                    />
                    <path
                      d="M16.3056 19.0661C14.7166 20.1297 12.8057 20.75 10.75 20.75C5.22716 20.75 0.75 16.2729 0.75 10.75C0.75 5.22716 5.22716 0.75 10.75 0.75C16.2729 0.75 20.75 5.22716 20.75 10.75C20.75 15.1944 15.1944 15.1944 15.1944 10.75"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
              }
              validation={{ required: "username is required" }}
              inputClassName=" !w-full !bg-light_mode_color dark:!bg-dark_mode_color2 border placeholder:text-light_mode_gray1_color dark:placeholder:text-dark_mode_color3 !border-light_mode_border1 dark:!border-dark_mode_border1 text-light_mode_text dark:text-dark_mode_text"
            />

            {/* Password */}
            <CustomInputField
              name="password"
              placeholder="Password"
              validation={{ required: "Password is required" }}
              icon={
                <div className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color">
                  <svg
                    className="w-[20px] h-[20px]"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.75 14.75C0.75 11.9216 0.75 10.5074 1.62868 9.6287C2.50736 8.75 3.92157 8.75 6.75 8.75H14.75C17.5784 8.75 18.9926 8.75 19.8713 9.6287C20.75 10.5074 20.75 11.9216 20.75 14.75C20.75 17.5784 20.75 18.9926 19.8713 19.8713C18.9926 20.75 17.5784 20.75 14.75 20.75H6.75C3.92157 20.75 2.50736 20.75 1.62868 19.8713C0.75 18.9926 0.75 17.5784 0.75 14.75Z"
                      stroke="currentColor"
                      stroke-width="1.5"
                    />
                    <path
                      d="M10.75 16.75C11.8546 16.75 12.75 15.8546 12.75 14.75C12.75 13.6454 11.8546 12.75 10.75 12.75C9.64543 12.75 8.75 13.6454 8.75 14.75C8.75 15.8546 9.64543 16.75 10.75 16.75Z"
                      stroke="currentColor"
                      stroke-width="1.5"
                    />
                    <path
                      d="M4.75 8.75V6.75C4.75 3.43629 7.43629 0.75 10.75 0.75C14.0637 0.75 16.75 3.43629 16.75 6.75V8.75"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
              }
              type="password"
              showPasswordToggle
              inputClassName=" !w-full !bg-light_mode_color dark:!bg-dark_mode_color2 border placeholder:text-light_mode_gray1_color dark:placeholder:text-dark_mode_color3 !border-light_mode_border1 dark:!border-dark_mode_border1 text-light_mode_text dark:text-dark_mode_text"
            />

            {/* Forgot Password */}
            <div className="text-right">
              <a
                href="#"
                className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color text-sm hover:underline font-medium"
              >
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              isLoading={isLoading}
              fullWidth
              variant="primary"
              size="md"
            >
              Login
            </Button>
          </form>
        </FormProvider>

        {/* Register Link */}
        {/* <p className="text-light_mode_gray_color dark:text-dark_mode_gray_color absolute bottom-5 text-sm mt-8 text-center lg:text-left w-full">
          Don't have any account?{" "}
          <a
            href="#"
            className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color font-semibold hover:underline"
          >
            Register Now
          </a>
        </p> */}
      </div>
    </div>
  );
};

export default LoginPage;
