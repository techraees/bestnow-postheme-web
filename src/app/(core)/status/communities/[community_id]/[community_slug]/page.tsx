"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { MessageCircle, Send } from "lucide-react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import {
  useEngagementOnSpecificPostMutation,
  useGetPostOfSpecificCommuntiyQuery,
  useGetSingleCommunityQuery,
  useGetTheUserPermissionToSeeTheCommunityMutation,
} from "@/redux/api/core/communitiesApi";
import { formattedDate } from "@/utils/coreUtils/formatedDate";
import { formatTimeFromISO } from "@/utils/coreUtils/formatTimeFromISO";
import { getImgBaseUrl } from "@/utils/coreUtils/getImgBaseUrl";
import "./index.css";
import { Comments } from "./components/Comments";
import CommunityDetailHeader from "./components/CommunityDetailHeader";
import PostReact from "./components/PostReact";
import PostSaved from "./components/PostSaved";
import ShareModal from "./components/ShareModel";
import PostDetailCardSkeletal from "./PostDetailCardSkeletal";
import PostCard from "./components/PostCard";

const sliderSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const getFileName = (url: string) => {
  if (!url) return "";
  return url.split("/").pop();
};

const CommunityDetailPage: React.FC = () => {
  const params = useParams();
  const community_id = params?.community_id as string;
  const community_slug = params?.community_slug as string;

  const { user_profile } = useSelector((state: any) => state.coreAppSlice);

  const [selectedPostSlug, setSelectedPostSlug] = useState("");
  const [userPermission, setUserPermission] = useState("");
  const [isOpenShareModal, setIsOpenShareModal] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  const { data, isLoading } = useGetPostOfSpecificCommuntiyQuery(
    `community_id=${community_id}`
  );

  const { data: getCommunityDetail, refetch } =
    useGetSingleCommunityQuery(community_slug);

  const posts = data?.payload?.results || [];

  return (
    <div className="p-2.5 text-black dark:text-white bg-[#f0f2f5] dark:bg-black">
      {/* Community Header */}
      <CommunityDetailHeader
        item={getCommunityDetail?.payload}
        refetch={refetch}
      />

      <div className="my-20 space-y-6">
        {isLoading ? (
          Array.from({ length: 5 }).map((item, index) => (
            <PostDetailCardSkeletal key={index} />
          ))
        ) : posts.length > 0 ? (
          posts.map((post: any, index: number) => (
            <PostCard key={index} post={post} community_id={community_id} />
          ))
        ) : (
          <div className="w-full text-center text-gray-500 py-4">
            No Record Found
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityDetailPage;
