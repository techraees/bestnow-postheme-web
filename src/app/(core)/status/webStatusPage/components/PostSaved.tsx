import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEngagementOnSpecificPostMutation } from "@/redux/api/core/communitiesApi";
import { Bookmark, BookmarkCheck } from "lucide-react";

interface PostSavedProps {
  slug: string;
  saved: boolean;
}

const PostSaved: React.FC<PostSavedProps> = ({ slug, saved }) => {
  const [EngagementPost] = useEngagementOnSpecificPostMutation();
  const { user_profile } = useSelector((state: any) => state.coreAppSlice);
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState<boolean>(saved);
  const handleBookmark = async (slug: string) => {
    if (!user_profile) {
      return router.push("/auth/login");
    }

    try {
      const data = {
        action_type: "bookmark",
      };
      await EngagementPost({
        slug: slug,
        data,
      }).unwrap();

      setIsBookmarked((prev) => !prev);
      // toast.success(!isBookmarked ? "Bookmarked!" : "Removed from bookmarks");
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };
  return (
    <div>
      {isBookmarked ? (
        <BookmarkCheck
          className="w-6 h-6 cursor-pointer  hover:scale-110 transition-transform duration-150"
          onClick={() => {
            handleBookmark(slug);
          }}
        />
      ) : (
        <Bookmark
          className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform duration-150"
          onClick={() => {
            handleBookmark(slug);
          }}
        />
      )}
    </div>
  );
};

export default PostSaved;
