// src/components/SmartImage.tsx
import React from "react";
import Image from "next/image";
// import useImageExists from "@/hooks/useImageExists";
import { useSelector } from "react-redux";
// import {
//   Dark_Mode_Bestnow_Icon,
//   Light_Mode_Bestnow_Icon,
// } from "@/assets/coreAssets/coreAssets";
import { THEME_DATA } from "@/data/coreData/coreData";
import useImageExists from "@/utils/coreUtils/useImageExists";
import { BestonDarkLogo, BestonLightLogo } from "@/assets";

const SmartImage = ({
  src,
  className = "",
  customDiv = false,
  onClick = () => {},
}: {
  src: string;
  className?: string;
  customDiv?: boolean;
  onClick?: () => void;
}) => {
  const { theme_mode } = useSelector((state: any) => state.coreAppSlice);
  const exists = useImageExists(src);
  const fallback =
    theme_mode === THEME_DATA.DARK ? BestonLightLogo.src : BestonDarkLogo.src;

  return (
    <>
      {customDiv ? (
        <>
          {exists ? (
            <Image
              src={src}
              alt="Profile"
              width={24}
              height={24}
              className="w-full h-full object-cover"
              onClick={onClick}
            />
          ) : (
            <Image
              src={fallback}
              alt="Fallback"
              width={24}
              height={24}
              className="w-full h-full object-cover"
              onClick={onClick}
            />
          )}
        </>
      ) : (
        <div
          className={`w-[48px] h-[48px] rounded-full overflow-hidden ${className}`}
        >
          {exists ? (
            <Image
              src={src}
              alt="Profile"
              width={48}
              height={48}
              className="w-full h-full object-cover"
              onClick={onClick}
            />
          ) : (
            <Image
              src={fallback}
              alt="Fallback"
              width={48}
              height={48}
              className="w-full h-full object-cover"
              onClick={onClick}
            />
          )}
        </div>
      )}
    </>
  );
};

export default SmartImage;
