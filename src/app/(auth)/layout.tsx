"use client";

import { AuthBgImage } from "@/assets";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useVerifyTokenQuery } from "@/redux/api/auth/customerAuthProfileApi";
import { setUserProfile } from "@/redux/slice/coreSlice";
import NextTopLoader from "nextjs-toploader";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Get user profile from Redux state
  const userProfile = useSelector(
    (state: any) => state.coreAppSlice.user_profile
  );

  // Verify token to check if user is logged in
  const { data, isLoading } = useVerifyTokenQuery(undefined);

  // Update user profile in Redux when data is fetched
  useEffect(() => {
    if (data?.payload) {
      dispatch(setUserProfile(data.payload));
    }
  }, [data, dispatch]);

  // Redirect to home page if user is already logged in
  useEffect(() => {
    if (!isLoading) {
      // Check if user profile exists in Redux or in the API response
      const hasUserProfile = userProfile || data?.payload;

      if (hasUserProfile) {
        router.push("/");
      }
    }
  }, [userProfile, data, isLoading, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-light_mode_text dark:text-dark_mode_text">
          Loading...
        </div>
      </div>
    );
  }

  // Don't render auth pages if user is logged in (will redirect)
  if (userProfile || data?.payload) {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <NextTopLoader
        color="#fdb801"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        showSpinner={false}
        easing="ease"
        speed={200}
      />
      {/* Left Panel */}
      <div className="w-full md:w-1/2 bg-light_mode_color dark:bg-dark_mode_color dark:text-dark_mode_text lg:pt-0 pt-20 flex flex-col lg:justify-center lg:items-center px-6">
        {children}
      </div>

      {/* Right Panel */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-cover bg-center relative">
        {/* Use next/image for optimized image loading */}
        <Image
          src={AuthBgImage}
          alt="Authentication Background"
          layout="fill"
          objectFit="cover"
          priority
          className="z-0"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
