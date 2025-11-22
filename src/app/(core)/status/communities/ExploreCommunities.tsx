"use client";

import React from "react";
import { getImgBaseUrl } from "@/utils/coreUtils/getImgBaseUrl";
import { THEME_DATA } from "@/data/coreData/coreData";
import {
  useFollowCommunityMutation,
  useGetAllCommunitiesWithNestedQuery,
} from "@/redux/api/core/communitiesApi";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

import ExploreCardSkeletal from "./ExploreCardSkeletal";
import CommunityCard from "../CommunityCard";

interface Community {
  name: string;
  id: number;
  slug: string;
  follow: boolean;
  profile_photo_url?: string;
  community_member_count: number;
}

interface ExploreCommunity {
  community_name: string;
  communities: Community[];
}

const ExploreCommunities: React.FC = () => {
  const { theme_mode } = useSelector((state: any) => state.coreAppSlice);

  const {
    data: getAllCommunitiesAndNested,
    isLoading: getAllCommunitiesLoading,
    refetch,
  } = useGetAllCommunitiesWithNestedQuery("");

  const explore_communities: ExploreCommunity[] = [];
  const single_communities: Community[] = [];

  const communitiesData = getAllCommunitiesAndNested?.payload?.results || [];
  communitiesData.forEach((item: any) => {
    if (item.community_parent_id !== null) return; // Skip children directly

    if (Array.isArray(item.children) && item.children.length > 0) {
      explore_communities.push({
        community_name: item.name,
        communities: item.children.map((child: any) => ({
          name: child.name,
          community_member_count: item.community_member_count,
          id: item.id,
          slug: item.slug,
          follow: item.follow,
          profile_photo_url:
            "https://images.unsplash.com/photo-1560250056-07ba64664864?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2FsZXNtYW58ZW58MHx8MHx8fDA%3D",
        })),
      });
    } else {
      single_communities.push({
        name: item.name,
        id: item.id,
        community_member_count: item.community_member_count,
        slug: item.slug,
        follow: item.follow,
        profile_photo_url:
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
    const res: any = await FollowCommunity(slug);
    if (res?.data?.status === "success") {
      toast.success(res?.data?.payload?.message);
      refetch();
    } else {
      toast.error(res?.error?.data?.message);
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
                {item.communities?.map((community) => {
                  const isThisLoading =
                    followLoading && originalArgs === community.slug;

                  return (
                    <CommunityCard
                      key={community.id}
                      item={community}
                      refetch={refetch}
                    />
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
          {single_communities?.map((item) => {
            const isThisLoading = followLoading && originalArgs === item.slug;

            return (
              <CommunityCard key={item.id} item={item} refetch={refetch} />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ExploreCommunities;
