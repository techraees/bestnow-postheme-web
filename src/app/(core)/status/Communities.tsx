"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getImgBaseUrl } from "@/utils/coreUtils/getImgBaseUrl";
import { THEME_DATA } from "@/data/coreData/coreData";
import {
  useFollowCommunityMutation,
  useGetAllCommunitiesQuery,
} from "@/redux/api/core/communitiesApi";
import { useSelector } from "react-redux";
import { BestonDarkLogo, BestonLightLogo } from "@/assets/icons/logo";
import CommunityCardSkeletal from "./CommunityCardSkeletal";
import CommunityCard from "./CommunityCard";

const Communities: React.FC = () => {
  const {
    data: getAllCommunities,
    refetch,
    isLoading,
  } = useGetAllCommunitiesQuery("");

  return (
    <>
      <div>
        {/* Communities */}
        <div className="my-4">
          <h3 className="mb-1 font-[800] text-light_mode_text dark:text-dark_mode_text">
            Communities
          </h3>
          <p className="text-[14px] text-light_mode_gray_color dark:text-dark_mode_gray_color">
            Stay updated on topics that matter to you. Find communities to
            follow.
          </p>
        </div>
      </div>

      {/* Find Communities to Follow */}
      <div className="flex items-center justify-between select-none cursor-pointer text-[14px]">
        <span className="text-light_mode_text dark:text-dark_mode_text">
          Find communities to follow
        </span>
      </div>
      <div>
        <div className="flex flex-col gap-5 mt-4">
          {isLoading
            ? Array.from({ length: 5 }).map((item, index) => (
                <CommunityCardSkeletal key={index} />
              ))
            : getAllCommunities?.payload?.results?.map((item: any) => {
                return (
                  <CommunityCard key={item.id} item={item} refetch={refetch} />
                );
              })}
        </div>
      </div>

      <div className="my-5">
        <button className="cursor-pointer border border-light_mode_border1 dark:border-dark_mode_border1 px-5 py-1.5 rounded-full text-[14px] text-primary transition-colors duration-200 active:bg-light_mode_color2 dark:active:bg-dark_mode_color2">
          <Link href="/status/communities">Explore more</Link>
        </button>
      </div>
    </>
  );
};

export default Communities;
