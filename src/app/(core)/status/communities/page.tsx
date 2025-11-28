"use client";

import React from "react";
import {
  Dark_Mode_Bestnow_Icon,
  Light_Mode_Bestnow_Icon,
} from "@/assets/coreAssets/coreAssets";
import { useSelector } from "react-redux";
import { IoMdArrowRoundBack } from "react-icons/io";
import ExploreCommunities from "./ExploreCommunities";
import Link from "next/link";
import TopSpacingWrapper from "@/components/top-spacing/TopSpacing";

const CommunitiesPage: React.FC = () => {
  const { theme_mode } = useSelector((state: any) => state.coreAppSlice);

  return (
    <TopSpacingWrapper>
      <div className="max-w-md mx-auto min-h-[calc(100vh-230px)] text-black font-sans p-4 pt-0 overflow-y-auto relative">
        <div className="sticky top-0 z-[1000] flex items-center justify-between p-3 pt-4 px-0 dark:bg-dark_mode_primary bg-light_mode_primary text-black dark:text-white text-lg font-semibold">
          <div className="flex items-center gap-2">
            <Link href="/status">
              <IoMdArrowRoundBack className="text-xl" />
            </Link>
            <div>Communities</div>
          </div>
        </div>

        <div className="text-light_mode_primary_text_primary dark:text-dark_mode_primary_text_primary">
          <ExploreCommunities />
        </div>
      </div>
    </TopSpacingWrapper>
  );
};

export default CommunitiesPage;
