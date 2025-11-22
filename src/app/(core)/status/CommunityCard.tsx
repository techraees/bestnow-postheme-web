"use client";

import React from "react";
import { getImgBaseUrl } from "@/utils/coreUtils/getImgBaseUrl";
import { useFollowCommunityMutation } from "@/redux/api/core/communitiesApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

interface CommunityCardProps {
  item: {
    id: number;
    slug: string;
    name: string;
    profile_photo_url?: string;
    community_member_count: number;
    follow: boolean;
  };
  refetch: () => void;
}

const CommunityCard: React.FC<CommunityCardProps> = ({ item, refetch }) => {
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
      refetch();
    } else {
      toast.error(res?.error?.data?.message);
    }
  };
  return (
    <div>
      <Link href={`/status/communities/${item.id}/${item.slug}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-[36px] h-[36px] rounded-full overflow-hidden">
              {item?.profile_photo_url ? (
                <img
                  src={item.profile_photo_url}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-light_mode_color2 dark:bg-dark_mode_color2" />
              )}
            </div>

            <div className="flex items-center justify-between ml-3">
              <div>
                <p className="text-light_mode_text dark:text-dark_mode_text">
                  {item?.name?.split(" ").slice(0, 3).join(" ")}
                </p>
                <span className="text-[14px] text-light_mode_gray_color dark:text-dark_mode_gray_color">
                  {item?.community_member_count} followers
                </span>
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleFollowCommunities(item.slug);
              }}
              disabled={followLoading}
              className={`w-full h-full rounded-lg px-3 py-0.5 flex items-center cursor-pointer justify-center text-[14px]
    ${
      item.follow
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
      </Link>
    </div>
  );
};

export default CommunityCard;
