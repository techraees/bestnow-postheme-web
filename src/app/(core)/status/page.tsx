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
        <div className="max-w-md mx-auto min-h-[calc(100vh-230px)] font-sans p-4 pt-0 overflow-y-auto relative lg:hidden block bg-light_mode_color dark:bg-dark_mode_color">
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
