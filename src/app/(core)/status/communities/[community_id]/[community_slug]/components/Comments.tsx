import React, { useEffect, useState } from "react";
import {
  // ALLOWED_WEB_USER,
  // THEME_DATA,
  useCommentOnSpecificPostMutation,
  useLazyGetCommentsOfSpecificCommunityQuery,
} from "@/redux/api/core/communitiesApi";
import formatTime from "@/utils/coreUtils/formatTime";
import { useForm } from "react-hook-form";
import { SendHorizonal } from "lucide-react";
import CommentReply from "./CommentReply";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { ALLOWED_WEB_USER, THEME_DATA } from "@/data/coreData/coreData";

const stringToColor = (str: any, theme_mode: any) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  const lightness = theme_mode === THEME_DATA.LIGHT ? "85%" : "35%";
  return `hsl(${hue}, 70%, ${lightness})`;
};

export const Comments = ({
  postSlug,
  setPostSlug,
}: {
  postSlug: any;
  setPostSlug: (slug: any) => void;
}) => {
  const { user_profile, theme_mode } = useSelector(
    (state: any) => state.coreAppSlice
  );
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [comments, setComments] = useState<any[]>([] as any);

  const [replyInputVisible, setReplyInputVisible] = useState<any>(null);
  const [nestedReplyVisible, setNestedReplyVisible] = useState<any>(null);
  const [triggerGetComments, { isFetching }] =
    useLazyGetCommentsOfSpecificCommunityQuery();
  const [commentPost] = useCommentOnSpecificPostMutation();

  useEffect(() => {
    if (postSlug) {
      loadComments();
    }
  }, [postSlug]);

  const loadComments = async () => {
    const res = await triggerGetComments({
      slug: postSlug,
      query: `page=1&limit=100`,
    });
    const results = res?.data?.payload?.rows || [];
    setComments(results);
  };

  const handleReplyClick = (commentId: string) => {
    setReplyInputVisible((prev: any) =>
      prev === commentId ? null : commentId
    );
  };

  const handleNestedReplyClick = (commentId: string) => {
    setNestedReplyVisible((prev: any) =>
      prev === commentId ? null : commentId
    );
  };

  const onSubmit = async (data: any | undefined) => {
    if (!user_profile) {
      return router.push("/auth/login");
    }
    try {
      const req_data = {
        comment_parent_id: null,
        content: data.commentText,
      };

      const res = await commentPost({
        slug: postSlug,
        data: req_data,
      }).unwrap();
      console.log(res);

      const newComment = res?.payload?.data;

      setComments((prev) => [newComment, ...prev]);

      reset();
    } catch (err) {
      console.error("Failed to comment:", err);
    }
  };
  return (
    <div>
      {" "}
      <div
        id="scrollableDiv"
        style={{
          height: 300,
          overflow: "auto",
        }}
      >
        {isFetching ? (
          <div className="text-center p-4">
            <p className="text-light_mode_gray_color dark:text-dark_mode_gray_color">
              Loading...
            </p>
          </div>
        ) : (
          comments.map((comment: any) => {
            const name =
              comment?.user_type === ALLOWED_WEB_USER.TBLCHART
                ? comment?.user?.fldName
                : comment?.webUser?.UserName || "";
            const initial = name.charAt(0).toUpperCase();
            const bgColor = stringToColor(name, theme_mode);

            return (
              <div key={comment.id} className="p-3 ">
                <div className="flex items-start w-full">
                  <div
                    className="w-[44px] h-[44px] rounded-full flex justify-center items-center font-semibold text-white"
                    style={{ backgroundColor: bgColor }}
                  >
                    {initial}
                  </div>
                  <div className=" w-[calc(100%-44px)]  ml-3">
                    <div>
                      <div className=" flex justify-between items-center w-full">
                        <p className="text-[14px] font-[600] text-light_mode_text dark:text-dark_mode_text">
                          {comment?.user_type === ALLOWED_WEB_USER.TBLCHART
                            ? comment?.user?.fldName
                            : `@admin ${comment?.webUser?.UserName}`}
                        </p>
                        <p className="text-[12px] text-light_mode_gray_color dark:text-dark_mode_gray_color">
                          {formatTime(comment.createdAt)}
                        </p>
                      </div>

                      <p className="text-[13px] text-light_mode_text dark:text-dark_mode_text">
                        {comment.content}
                      </p>
                      <button
                        onClick={() => {
                          handleReplyClick(comment.id);
                          setPostSlug(postSlug);
                        }}
                        className="text-xs text-blue-500 mt-1"
                      >
                        Reply
                      </button>
                      {/* REPLY INPUT */}
                      {replyInputVisible === comment.id && (
                        <CommentReply
                          setComments={setComments}
                          comment_id={replyInputVisible}
                          slug={postSlug}
                          setReply={() => setReplyInputVisible(null)}
                        />
                      )}

                      {/* REPLIES LIST */}
                      <div className="mt-2">
                        {comment.replies?.length > 0 &&
                          comment.replies.map((item: any, index: number) => {
                            const replyName =
                              item?.user_type === ALLOWED_WEB_USER.TBLCHART
                                ? item?.user?.fldName
                                : item?.webUser?.UserName || "";
                            const replyInitial = replyName
                              .charAt(0)
                              .toUpperCase();
                            const replyBgColor = stringToColor(
                              replyName,
                              theme_mode
                            );

                            return (
                              <div
                                className="flex items-start w-full"
                                key={index}
                              >
                                {/* avatar */}
                                <div
                                  className="w-[35px] h-[35px] rounded-full flex justify-center items-center font-semibold text-white text-sm"
                                  style={{ backgroundColor: replyBgColor }}
                                >
                                  {replyInitial}
                                </div>

                                {/* content */}
                                <div className="w-[calc(100%-44px)] ml-3">
                                  <div>
                                    <div className="flex justify-between items-center w-full">
                                      <p className="text-[14px] font-[600] text-light_mode_text dark:text-dark_mode_text">
                                        {item?.user_type ===
                                        ALLOWED_WEB_USER.TBLCHART
                                          ? item?.user?.fldName
                                          : `@admin ${item?.webUser?.UserName}`}
                                      </p>
                                      <p className="text-[12px] text-light_mode_gray_color dark:text-dark_mode_gray_color">
                                        {formatTime(item?.createdAt)}
                                      </p>
                                    </div>

                                    <p className="text-[13px] text-light_mode_text dark:text-dark_mode_text">
                                      {item.content}
                                    </p>

                                    <button
                                      onClick={() => {
                                        handleNestedReplyClick(item.id);
                                        setPostSlug(postSlug);
                                      }}
                                      className="text-xs text-blue-500 mt-1"
                                    >
                                      Reply
                                    </button>

                                    {nestedReplyVisible === item.id && (
                                      <CommentReply
                                        comment_id={nestedReplyVisible}
                                        setReply={() =>
                                          setNestedReplyVisible(null)
                                        }
                                        slug={postSlug}
                                      />
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-2 flex w-full gap-2 items-center"
      >
        <div className="w-full">
          <input
            {...register("commentText", { required: true })}
            placeholder="Write your comment..."
            className="w-full px-3 py-[7px] border border-light_mode_border1 dark:border-dark_mode_border1 rounded-lg text-sm bg-light_mode_color dark:bg-dark_mode_color text-light_mode_text dark:text-dark_mode_text"
          />
          {errors.commentText && (
            <p className="text-red-500 text-xs mt-1">Comment is required</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-2 flex justify-center items-center rounded-full text-sm"
        >
          <SendHorizonal size={20} />
        </button>
      </form>
    </div>
  );
};
