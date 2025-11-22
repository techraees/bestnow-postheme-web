"use client";
import React from "react";
import { FaChevronUp, FaUserCircle, FaChevronDown } from "react-icons/fa";
import { BestonDarkLogo, BestonLightLogo } from "@/assets/icons/logo";
import { GoBellSlash } from "react-icons/go";
import Communities from "./Communities";
import MutedUpdates from "./MutedUpdates";
import RecentUpdates from "./RecentUpdates";
import { THEME_DATA } from "@/data/coreData/coreData";
import { useSelector } from "react-redux";
import Image from "next/image";
import StatusPage from "./webStatusPage/StatusPage";
import TopSpacingWrapper from "@/components/top-spacing/TopSpacing";

const ShivaCartoonUI = () => {
  const { theme_mode } = useSelector((state: any) => state.coreAppSlice);

  return (
    <>
      <TopSpacingWrapper>
        <div className="max-w-md mx-auto h-screen font-sans p-4 pt-0 pb-[10rem] overflow-y-auto relative lg:hidden block bg-light_mode_color dark:bg-dark_mode_color">
          <div className="flex items-center justify-between sticky top-0 z-[1000] p-4 px-0 dark:bg-dark_mode_primary bg-light_mode_primary">
            <div className="flex items-center gap-2 text-light_mode_text dark:text-dark_mode_text text-lg font-semibold">
              <div>
                <Image
                  src={
                    theme_mode === THEME_DATA.DARK
                      ? BestonDarkLogo
                      : BestonLightLogo
                  }
                  alt="Beston"
                  width={24}
                  height={24}
                  className="w-[24px] h-[24px]"
                />
              </div>

              <div>
                <div>Bestnow Mobile Accessories</div>
                <div className="text-xs text-light_mode_gray_color dark:text-dark_mode_gray_color">
                  Active Users
                </div>
              </div>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 mr-2"
              viewBox="0 0 50 50"
            >
              <path
                fill="currentColor"
                d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"
              />
            </svg>
          </div>

          <div className="text-light_mode_primary_text_primary dark:text-dark_mode_primary_text_primary">
            {/* Recent Updates */}
            <RecentUpdates />

            {/* Muted Updates */}
            {/* <MutedUpdates /> */}

            {/* Communities */}
            <Communities />
          </div>
        </div>
        <div className=" lg:block hidden">
          <StatusPage />
        </div>
      </TopSpacingWrapper>
    </>
  );
};

export default ShivaCartoonUI;
