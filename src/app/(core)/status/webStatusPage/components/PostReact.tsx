import { Heart } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useEngagementOnSpecificPostMutation } from "@/redux/api/core/communitiesApi";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const reactions = [
  { type: "love", emoji: "❤️" },
  { type: "like", emoji: "👍" },
  { type: "haha", emoji: "😂" },
  { type: "wow", emoji: "😮" },
  { type: "angry", emoji: "😡" },
];

interface PostReactProps {
  slug: string;
  liked: string | null;
}

const PostReact: React.FC<PostReactProps> = ({ slug, liked }) => {
  const reactionRef = useRef<HTMLDivElement>(null);
  const [showReactions, setShowReactions] = useState<boolean>(false);
  const [reactionType, setReactionType] = useState<string | null>(liked);
  const [EngagementPost] = useEngagementOnSpecificPostMutation();
  const { user_profile } = useSelector((state: any) => state.coreAppSlice);
  const router = useRouter();
  const handleReaction = async (type: string) => {
    if (!user_profile) {
      return router.push("/auth/login");
    }
    try {
      const data = {
        action_type: "like",
        reaction_type: type,
      };

      await EngagementPost({
        slug,
        data,
      }).unwrap();

      setReactionType(type);
      // toast.success(`Reacted with ${type}`);
      setShowReactions(false);
    } catch (err) {
      toast.error("Failed to react");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        reactionRef.current &&
        !reactionRef.current.contains(event.target as Node)
      ) {
        setShowReactions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div>
      <div
        ref={reactionRef}
        className="relative flex justify-center items-center "
      >
        {reactionType ? (
          <span
            className="text-[22px] cursor-pointer"
            onClick={() => setShowReactions((prev) => !prev)}
          >
            {reactions.find((r) => r.type === reactionType)?.emoji || "❤️"}
          </span>
        ) : (
          <Heart
            className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform duration-150"
            onClick={() => setShowReactions((prev) => !prev)}
          />
        )}

        {showReactions && (
          <div className="absolute bottom-full mb-2 left-[80px] -translate-x-1/2 bg-white dark:bg-black shadow-lg rounded-full px-6 py-1 flex space-x-2 z-50">
            {reactions.map(({ type, emoji }) => (
              <button
                key={type}
                onClick={() => handleReaction(type)}
                className="text-[25px] hover:scale-125 transition-transform"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostReact;
