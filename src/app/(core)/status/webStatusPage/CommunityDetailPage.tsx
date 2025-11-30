import { FC } from "react";
import { useGetPostOfSpecificCommuntiyQuery } from "@/redux/api/core/communitiesApi";

import PostCard from "./components/PostCard";
import PostDetailCardSkeletal from "./PostDetailCardSkeletal";

interface CommunityDetailPageProps {
  community_id: number;
  setCommunity_id: (id: number) => void;
  community_slug: string;
  setCommunity_slug: (slug: string) => void;
}

// Define the type of a post safely
interface CommunityPost {
  id: number;
  slug: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  user?: any;
  media?: any[];
  [key: string]: any; // fallback to avoid TS errors
}

const CommunityDetailPage: FC<CommunityDetailPageProps> = ({
  community_id,
}) => {
  const { data, isLoading } = useGetPostOfSpecificCommuntiyQuery(
    `community_id=${community_id}`
  );

  // Safe fallback typing
  const posts: CommunityPost[] = data?.payload?.results ?? [];

  return (
    <div className="p-2.5 text-black dark:text-white bg-[#f0f2f5] dark:bg-black h-[calc(100vh-130px)] scrollbar_hide_custom">
      <div className="space-y-6">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <PostDetailCardSkeletal key={index} />
          ))
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <PostCard key={post.id} post={post} community_id={community_id} />
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
