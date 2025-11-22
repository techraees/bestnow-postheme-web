"use client";

import { SendHorizonal } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { useCommentOnSpecificStatusMutation } from "@/redux/api/core/communitiesApi";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

interface CommentReplyProps {
  comment_id: string | null;
  slug: string;
  setReply: (reply: string | null) => void;
  setComments: React.Dispatch<React.SetStateAction<any[]>>;
  setReplyCommentID?: (id: string | null) => void;
}

interface FormData {
  replyText: string;
}

const CommentReply: React.FC<CommentReplyProps> = ({
  comment_id,
  slug,
  setReply,
  setComments,
  setReplyCommentID,
}) => {
  const [commentPost] = useCommentOnSpecificStatusMutation();
  const { user_profile } = useSelector((state: any) => state.coreAppSlice);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onReply = async (data: FormData) => {
    if (!user_profile) {
      return router.push("/auth/login");
    }
    try {
      const req_data = {
        comment_parent_id: comment_id,
        content: data.replyText,
      };

      const res = await commentPost({
        slug: slug,
        data: req_data,
      }).unwrap();

      const newReply = res?.payload?.data;

      setComments((prevComments: any[]) =>
        prevComments.map((comment: any) => {
          if (comment.id === comment_id) {
            return {
              ...comment,
              replies: comment.replies
                ? [...comment.replies, newReply]
                : [newReply],
            };
          }
          return comment;
        })
      );
      setReplyCommentID && setReplyCommentID(null);
      setReply(null);
      reset();
    } catch (err) {
      console.error("Failed to comment:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onReply)} className="mt-2 flex gap-2">
      <div className="w-full">
        <input
          {...register("replyText", {
            required: true,
          })}
          placeholder="Write a reply..."
          className="w-full px-3 py-[7px] border border-gray-400 rounded-lg text-sm"
        />
        {errors.replyText && (
          <p className="text-red-500 text-xs mt-1">Reply is required</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-3 py-2 flex justify-center items-center rounded-full text-sm"
      >
        <SendHorizonal size={20} />
      </button>
    </form>
  );
};

export default CommentReply;
