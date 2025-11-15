import { AuthBgImage } from "@/assets";
import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen">
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
