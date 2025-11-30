import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";
import { BestonDarkLogo, BestonLightLogo } from "@/assets/icons/logo";
import { THEME_DATA } from "@/data/coreData/coreData";
import { getImgBaseUrl } from "@/utils/coreUtils/getImgBaseUrl";

interface StatusHeaderProps {
  item: {
    profile_photo_url?: string;
    name: string;
    community_member_count: number;
  };
  onClose: () => void;
}

const StatusHeader: React.FC<StatusHeaderProps> = ({ item, onClose }) => {
  const { theme_mode } = useSelector((state: any) => state.coreAppSlice);
  return (
    <div className=" absolute top-0 left-0 right-0 bg-transparent z-50 p-4 ">
      <div className="flex items-center justify-between w-full  gap-2">
        <div
          onClick={() => {
            onClose();
          }}
          className="w-[5%]"
        >
          <IoMdArrowRoundBack className="text-lg" />
        </div>
        <div className="flex w-[95%] items-center justify-between gap-5">
          <div className="flex items-center">
            <div className="w-[40px] h-[40px]  rounded-full overflow-hidden flex justify-center items-center">
              <img
                src={
                  getImgBaseUrl(item?.profile_photo_url) ||
                  theme_mode === THEME_DATA.DARK
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
                <span className="text-[14px] text-light_mode_gray_color dark:text-dark_mode_gray_color">
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
