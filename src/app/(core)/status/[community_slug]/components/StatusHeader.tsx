"use client";

import React from "react";
import { useSelector } from "react-redux";
import { getImgBaseUrl } from "@/utils/coreUtils/getImgBaseUrl";
import { THEME_DATA } from "@/data/coreData/coreData";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";
import { BestonDarkLogo, BestonLightLogo } from "@/assets/icons/logo";

interface StatusHeaderProps {
  item?: {
    name: string;
    profile_photo_url?: string;
    community_member_count: number;
  };
}

const StatusHeader: React.FC<StatusHeaderProps> = ({ item }) => {
  const { theme_mode } = useSelector((state: any) => state.coreAppSlice);

  return (
    <div className="fixed top-0 left-0 right-0 bg-transparent z-50 p-4">
      <div className="flex items-center justify-between w-full gap-2">
        <Link href="/status" className="w-[5%]">
          <IoMdArrowRoundBack className="text-lg" />
        </Link>
        <div className="flex w-[95%] items-center justify-between gap-5">
          <div className="flex items-center">
            <div className="w-[40px] h-[40px] rounded-full overflow-hidden flex justify-center items-center">
              <img
                src={
                  item?.profile_photo_url
                    ? getImgBaseUrl(item.profile_photo_url)
                    : theme_mode === THEME_DATA.DARK
                    ? BestonDarkLogo.src
                    : BestonLightLogo.src
                }
                alt=""
                className="w-[24px] h-[24px] object-cover"
              />
            </div>
            <div className="flex items-center justify-between ml-3">
              <div>
                <p className="truncate whitespace-nowrap w-[180px]">
                  {item?.name}
                </p>
                <span className="text-[14px] text-gray-600 dark:text-dark_mode_gray_color">
                  {item?.community_member_count}
                  {" followers"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusHeader;
