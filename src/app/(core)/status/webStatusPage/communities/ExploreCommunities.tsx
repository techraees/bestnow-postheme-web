import React from "react";
import {
  useFollowCommunityMutation,
  useGetAllCommunitiesWithNestedQuery,
} from "@/redux/api/core/communitiesApi";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import Image from "next/image";
import ExploreCardSkeletal from "./ExploreCardSkeletal";
import { getImgBaseUrl } from "@/utils/coreUtils/getImgBaseUrl";

interface ExploreCommunitiesProps {
  community_id: number | null;
  setCommunity_id: (id: number | null) => void;
  community_slug: string | null;
  setCommunity_slug: (slug: string | null) => void;
}

const ExploreCommunities: React.FC<ExploreCommunitiesProps> = ({
  community_id,
  setCommunity_id,
  community_slug,
  setCommunity_slug,
}) => {
  const { theme_mode } = useSelector((state: any) => state.coreAppSlice);

  const {
    data: getAllCommunitiesAndNested,
    isLoading: getAllCommunitiesLoading,
    refetch,
  } = useGetAllCommunitiesWithNestedQuery("");

  const explore_communities: any[] = [];
  const single_communities: any[] = [];

  const communitiesData = getAllCommunitiesAndNested?.payload?.results || [];
  communitiesData.forEach((item: any) => {
    if (item.community_parent_id !== null) return; // Skip children directly

    if (Array.isArray(item.children) && item.children.length > 0) {
      explore_communities.push({
        community_name: item.name,
        communities: item.children.map((child: any) => ({
          community_name: child.name,
          followers: item.community_member_count,
          id: item.id,
          slug: item.slug,
          follow: item.follow,
          img_url:
            "https://images.unsplash.com/photo-1560250056-07ba64664864?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2FsZXNtYW58ZW58MHx8MHx8fDA%3D",
        })),
      });
    } else {
      single_communities.push({
        community_name: item.name,
        id: item.id,
        followers: item.community_member_count,
        slug: item.slug,
        follow: item.follow,
        img_url:
          "https://adminapi.beston.co//uploads/products/7314/images/SUNLONG UNIT -- LCD VIVO Y91 BLACK 1.webp",
      });
    }
  });
  const { user_profile } = useSelector((state: any) => state.coreAppSlice);
  const router = useRouter();
  const [FollowCommunity, { isLoading: followLoading, originalArgs }] =
    useFollowCommunityMutation();

  const handleFollowCommunities = async (slug: string) => {
    if (!user_profile) {
      return router.push("/auth/login");
    }
    const res = await FollowCommunity(slug);
    if ("data" in res && res.data?.status === "success") {
      // toast.success(res.data?.payload?.message);
      refetch();
    } else if (
      "error" in res &&
      res.error &&
      typeof res.error === "object" &&
      res.error !== null &&
      "data" in res.error &&
      res.error.data &&
      typeof res.error.data === "object" &&
      res.error.data !== null &&
      "message" in res.error.data
    ) {
      toast.error((res.error.data as any).message || "Something went wrong");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      {/* Render Parent Communities with their Children */}
      {getAllCommunitiesLoading
        ? Array.from({
            length: 4,
          }).map((item, index) => <ExploreCardSkeletal key={index} />)
        : explore_communities.map((item, index) => (
            <div className={`${index === 0 ? "mb-5" : "my-7"}`} key={index}>
              {/* Parent Name with See All */}
              <div className="flex items-center justify-between">
                <h2>{item?.community_name}</h2>
              </div>

              {/* Child Communities List */}
              <div className="flex flex-col gap-5 mt-4">
                {item.communities?.map((item: any) => {
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
                        <div className="flex">
                          <Image
                            src={getImgBaseUrl(item.img_url)}
                            alt={item.community_name}
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                          />

                          <div className="flex items-center justify-between ml-3">
                            <div>
                              <p>
                                {item?.community_name
                                  ?.split(" ")
                                  .slice(0, 3)
                                  .join(" ")}
                              </p>
                              <span className="text-[14px] text-gray-600 dark:text-dark_mode_gray_color">
                                {item?.followers} followers
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <button
                            onClick={(e: any) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleFollowCommunities(item.slug);
                            }}
                            disabled={isThisLoading}
                            className={`w-full h-full rounded-lg px-3 py-0.5 flex items-center justify-center text-[14px]
                        ${
                          item.follow
                            ? "bg-transparent border border-primary text-primary"
                            : "bg-blue-200 dark:bg-blue-900 dark:text-blue-300 text-primary"
                        }
                      `}
                          >
                            {item?.follow ? (
                              isThisLoading ? (
                                <ClipLoader
                                  size={15}
                                  className="!text-white mx-3 my-1"
                                />
                              ) : (
                                "Following"
                              )
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
          ))}

      <div className="flex items-center justify-between">
        <h2>Others</h2>
      </div>
      {/* Render Standalone Communities (without children) */}
      {single_communities.length > 0 && (
        <div className="flex flex-col gap-5 mt-4">
          {single_communities?.map((item: any) => {
            const isThisLoading = followLoading && originalArgs === item.slug;

            return (
              <div key={item.id}>
                <div
                  onClick={() => {
                    setCommunity_id(item.id);
                    setCommunity_slug(item.slug);
                  }}
                  className="flex items-center justify-between"
                >
                  <div className="flex">
                    <div className="w-[48px] h-[48px] rounded-full overflow-hidden">
                      <Image
                        src={getImgBaseUrl(item.img_url)}
                        alt={item.community_name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex items-center justify-between ml-3">
                      <div>
                        <p className="text-light_mode_text dark:text-dark_mode_text"> 
                          {item?.community_name
                            ?.split(" ")
                            .slice(0, 3)
                            .join(" ")}
                        </p>
                        <span className="text-[14px] text-gray-600 dark:text-dark_mode_gray_color">
                          {item?.followers} followers
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={(e: any) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleFollowCommunities(item.slug);
                      }}
                      disabled={isThisLoading}
                      className={`w-full h-full rounded-lg px-3 py-0.5 flex items-center cursor-pointer justify-center text-[14px]
    ${
      item.follow
        ? "bg-transparent border border-primary text-primary"
        : "bg-blue-200 dark:bg-blue-900 dark:text-blue-300 text-primary"
    }
  `}
                    >
                      {item?.follow ? (
                        isThisLoading ? (
                          <ClipLoader
                            size={15}
                            className="!text-white mx-3 my-1"
                            color="#006BFF"
                          />
                        ) : (
                          "Following"
                        )
                      ) : isThisLoading ? (
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
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ExploreCommunities;
