import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useRouter } from "next/navigation";

import { MessageCircle, Send } from "lucide-react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { useGetPostOfSpecificCommuntiyQuery } from "@/redux/api/core/communitiesApi";
import "./index.css";

import PostCard from "./components/PostCard";
import PostDetailCardSkeletal from "./PostDetailCardSkeletal";

interface CommunityDetailPageProps {
  community_id: number;
  setCommunity_id: (id: number) => void;
  community_slug: string;
  setCommunity_slug: (slug: string) => void;
}

const CommunityDetailPage: React.FC<CommunityDetailPageProps> = ({
  community_id,
  setCommunity_id,
  community_slug,
  setCommunity_slug,
}) => {
  const { data, isLoading } = useGetPostOfSpecificCommuntiyQuery(
    `community_id=${community_id}`
  );

  const posts = data?.payload?.results || [];

  return (
    <div className="p-2.5  text-black dark:text-white bg-[#f0f2f5] dark:bg-black h-[calc(100vh-130px)] scrollbar_hide_custom">
      <div className="space-y-6">
        {isLoading ? (
          Array.from({ length: 5 }).map((item, index) => (
            <PostDetailCardSkeletal key={index} />
          ))
        ) : posts.length > 0 ? (
          posts.map((post, index) => (
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
