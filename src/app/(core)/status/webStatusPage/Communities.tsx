import React from "react";
import {
  // getImgBaseUrl,
  useFollowCommunityMutation,
  useGetAllCommunitiesQuery,
} from "@/redux/api/core/communitiesApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import Image from "next/image";

import CommunityCardSkeletal from "./CommunityCardSkeletal";
import { getImgBaseUrl } from "@/utils/coreUtils/getImgBaseUrl";

interface CommunitiesProps {
  setAllCommunities: (value: boolean) => void;
  community_id: number | null;
  setCommunity_id: (id: number | null) => void;
  community_slug: string | null;
  setCommunity_slug: (slug: string | null) => void;
}

const Communities: React.FC<CommunitiesProps> = ({
  setAllCommunities,
  community_id,
  setCommunity_id,
  community_slug,
  setCommunity_slug,
}) => {
  const { theme_mode } = useSelector((state: any) => state.coreAppSlice);

  const { user_profile } = useSelector((state: any) => state.coreAppSlice);
  const {
    data: getAllCommunities,
    refetch,
    isLoading,
  } = useGetAllCommunitiesQuery("");
  const [FollowCommunity, { isLoading: followLoading, originalArgs }] =
    useFollowCommunityMutation();

  const handleFollowCommunities = async (slug: string) => {
    if (!user_profile) {
      return toast.error("Please login to follow communities");
    }
    const res = await FollowCommunity(slug);
    if (res?.data?.status === "success") {
      // toast.success(res?.data?.payload?.message);
      refetch();
    } else {
      toast.error("Failed to follow community");
    }
  };
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
              const isThisLoading =
                followLoading && originalArgs === item.slug;

              return (
                <div key={item.id}>
                  <div
                    onClick={() => {
                      setCommunity_id(item.id);
                      setCommunity_slug(item.slug);
                    }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <Image
                        src={item.profile_photo_url}
                        alt={item.name}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />

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
                        disabled={isThisLoading}
                        className={`w-full h-full rounded-lg px-3 py-0.5 flex items-center cursor-pointer justify-center text-[14px]
    ${item.follow
                            ? "bg-transparent border border-primary text-primary"
                            : "bg-light_mode_yellow_highlight_color dark:bg-dark_mode_yellow_highlight_color dark:text-dark_mode_yellow_color text-light_mode_yellow_color"
                          }
  `}
                      >
                        {item?.follow ? (
                          isThisLoading ? (
                            <div className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color">
                              <ClipLoader
                                size={15}
                                className="!text-white mx-3 my-1"
                                color="currentColor"
                              />
                            </div>
                          ) : (
                            "Following"
                          )
                        ) : isThisLoading ? (
                          <div className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color">
                            <ClipLoader
                              size={15}
                              className="!text-white mx-3 my-1"
                              color="currentColor"
                            />
                          </div>
                        ) : (
                          "Follow"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <div className="my-5">
        <button
          onClick={() => setAllCommunities(true)}
          className="cursor-pointer border border-light_mode_border1 dark:border-dark_mode_border1 px-5 py-1.5 rounded-full text-[14px] text-primary transition-colors duration-200 active:bg-light_mode_color2 dark:active:bg-dark_mode_color2"
        >
          <span>Explore more</span>
        </button>
      </div>
    </>
  );
};

export default Communities;
