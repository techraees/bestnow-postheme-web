"use client";

import React, { useState } from "react";
import { GoBellSlash } from "react-icons/go";
import { getImgBaseUrl } from "@/utils/coreUtils/getImgBaseUrl";
import { THEME_DATA } from "@/data/coreData/coreData";
import { useGetAllCommunitiesHavingActiveStatusQuery } from "@/redux/api/core/communitiesApi";
import formatTime from "@/utils/coreUtils/formatTime";
import { useSelector } from "react-redux";
import { BestonDarkLogo, BestonLightLogo } from "@/assets/icons/logo";
import Link from "next/link";
import StatusCardSkeletal from "./StatusCardSkeletal";

interface Community {
  slug: string;
  profile_photo_url?: string;
  name: string;
  createdAt: string;
  all_statuses_viewed: boolean;
}

const RecentUpdates: React.FC = () => {
  const { theme_mode } = useSelector((state: any) => state.coreAppSlice);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const {
    data: recentUpdates,
    isLoading,
    isFetching,
  } = useGetAllCommunitiesHavingActiveStatusQuery({
    queryParams: `page=${page}&limit=${limit}`,
  });

  return (
    <>
      <div className="flex items-center justify-between select-none text-[14px]">
        <span className="text-dark_mode_gray_color dark:text-white">
          Recent Updates
        </span>
      </div>
      <div className={`flex flex-col mt-4 ${!isLoading ? "gap-7" : "gap-3"}`}>
        {isLoading
          ? Array.from({ length: 4 }).map((item, index) => (
              <StatusCardSkeletal key={index} />
            ))
          : Array.isArray(recentUpdates?.payload) &&
            recentUpdates?.payload.map((item: Community) => (
              <Link key={item.slug} href={`/status/${item.slug}`}>
                <div className="flex items-center justify-between">
                  <div className="flex">
                    {item?.all_statuses_viewed ? (
                      <div className="w-[56px] h-[56px] flex items-center justify-center rounded-full">
                        {item?.profile_photo_url ? (
                          <div className="w-[48px] h-[48px] rounded-full overflow-hidden">
                            <img
                              src={getImgBaseUrl(item.profile_photo_url)}
                              alt="Profile"
                            />
                          </div>
                        ) : (
                          <div className="w-[45px] h-[45px] rounded-full overflow-hidden">
                            <img
                              src={
                                theme_mode === THEME_DATA.DARK
                                  ? BestonDarkLogo.src
                                  : BestonLightLogo.src
                              }
                              className="w-full h-full object-cover"
                              alt="Profile"
                            />
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="w-[56px] h-[56px] flex items-center justify-center bg-primary rounded-full">
                        <div className="w-[52px] h-[52px] flex items-center justify-center bg-white dark:bg-dark_mode_primary rounded-full">
                          {item?.profile_photo_url ? (
                            <div className="w-[48px] h-[48px] rounded-full overflow-hidden">
                              <img
                                src={getImgBaseUrl(item.profile_photo_url)}
                                alt="Profile"
                              />
                            </div>
                          ) : (
                            <div className="w-[45px] h-[45px] rounded-full overflow-hidden">
                              <img
                                src={
                                  theme_mode === THEME_DATA.DARK
                                    ? BestonDarkLogo.src
                                    : BestonLightLogo.src
                                }
                                className="w-full h-full object-cover"
                                alt="Profile"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between ml-3">
                      <div>
                        <p>{item?.name}</p>
                        <span className="text-[14px] text-gray-600 dark:text-dark_mode_gray_color">
                          {formatTime(item?.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </>
  );
};

export default RecentUpdates;
