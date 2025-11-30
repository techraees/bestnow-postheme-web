"use client";

import React from "react";
import { THEME_DATA } from "@/data/coreData/coreData";
import { useFollowCommunityMutation } from "@/redux/api/core/communitiesApi";
import { useSelector } from "react-redux";
import { BestonDarkLogo, BestonLightLogo } from "@/assets/icons/logo";
import { useRouter } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import Link from "next/link";

interface CommunityDetailHeaderProps {
  item: any;
  refetch: () => void;
}

const CommunityDetailHeader: React.FC<CommunityDetailHeaderProps> = ({ item, refetch }) => {
  const { theme_mode } = useSelector((state: any) => state.coreAppSlice);
  const { user_profile } = useSelector((state: any) => state.coreAppSlice);
  const router = useRouter();
  const [FollowCommunity, { isLoading: followLoading, originalArgs }] =
    useFollowCommunityMutation();

  const handleFollowCommunities = async (slug: string) => {
    if (!user_profile) {
      return router.push("/auth/login");
    }
    const res: any = await FollowCommunity(slug);
    if (res?.data?.status === "success") {
      // toast.success(res?.data?.payload?.message);
      refetch();
    } else {
      toast.error(res?.error?.data?.message);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-white dark:bg-dark_mode_primary z-50 p-4 shadow-md">
      <div className="flex items-center justify-between w-full gap-2">
        <div className="flex items-center w-full">
          <Link href="/status">
            <IoMdArrowRoundBack className="text-lg" />
          </Link>
          <div className="flex items-center">
            <div className="w-[40px] h-[40px] rounded-full overflow-hidden flex justify-center items-center">
              <div className="w-[24px] h-[24px] object-cover">
                {item?.profile_photo_url ? (
                  <img
                    src={item.profile_photo_url}
                    alt="Community"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={
                      theme_mode === THEME_DATA.DARK
                        ? BestonDarkLogo.src
                        : BestonLightLogo.src
                    }
                    alt="Default"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
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
        <div className="">
          <div>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (item?.slug) {
                  handleFollowCommunities(item.slug);
                }
              }}
              disabled={followLoading}
              className={`w-full h-full rounded-lg px-3 py-0.5 flex items-center cursor-pointer justify-center text-[14px]
                        ${
                          item?.follow
                            ? "bg-transparent border border-primary text-primary"
                            : "bg-blue-200 dark:bg-blue-900 dark:text-blue-300 text-primary"
                        }
                      `}
            >
              {item?.follow ? (
                followLoading ? (
                  <ClipLoader
                    size={15}
                    className="!text-white mx-3 my-1"
                    color="#006BFF"
                  />
                ) : (
                  "Following"
                )
              ) : followLoading ? (
                <ClipLoader
                  size={15}
                  className="!text-white mx-3 my-1"
                  color="#006BFF"
                />
              ) : (
                "Follow"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetailHeader;
