"use client";

import { Heart } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useEngagementOnSpecificStatusMutation } from "@/redux/api/core/communitiesApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

interface Reaction {
  type: string;
  emoji: string;
}

const reactions: Reaction[] = [
  { type: "love", emoji: "❤️" },
  { type: "like", emoji: "👍" },
  { type: "haha", emoji: "😂" },
  { type: "wow", emoji: "😮" },
  { type: "angry", emoji: "😡" },
];

interface StatusReactProps {
  slug: string;
  status?: {
    slug: string;
    emoji?: string;
  };
  setSlug: (slug: string) => void;
  handlePause: () => void;
  handleResume: () => void;
}

const StatusReact: React.FC<StatusReactProps> = ({
  slug,
  status,
  setSlug,
  handlePause,
  handleResume,
}) => {
  const reactionRef = useRef<HTMLDivElement>(null);
  const [showReactions, setShowReactions] = useState(false);
  const [reactionType, setReactionType] = useState(status?.emoji);
  const [EngagementPost] = useEngagementOnSpecificStatusMutation();
  const { user_profile } = useSelector((state: any) => state.coreAppSlice);
  const router = useRouter();

  const handleReaction = async (type: string) => {
    if (!user_profile) {
      return router.push("/auth/login");
    }
    setSlug(status?.slug || slug);
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
      handleResume();
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
        handleResume();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleResume]);

  return (
    <div>
      <div
        ref={reactionRef}
        className="relative flex justify-center bg-white dark:bg-black rounded-full w-[40px] h-[40px] items-center"
      >
        {reactionType ? (
          <span
            className="text-[22px] cursor-pointer"
            onClick={() => {
              setShowReactions((prev) => !prev);
              handlePause();
            }}
          >
            {reactions.find((r) => r.type === reactionType)?.emoji || "❤️"}
          </span>
        ) : (
          <Heart
            className="w-6 h-6 text-black dark:text-white cursor-pointer hover:scale-110 transition-transform duration-150"
            onClick={() => {
              setShowReactions((prev) => !prev);
              handlePause();
            }}
          />
        )}

        {showReactions && (
          <div className="absolute bottom-full mb-2 -left-[70px] -translate-x-1/2 bg-white dark:bg-black shadow-lg rounded-full px-6 py-1 flex space-x-2 z-50">
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

export default StatusReact;
