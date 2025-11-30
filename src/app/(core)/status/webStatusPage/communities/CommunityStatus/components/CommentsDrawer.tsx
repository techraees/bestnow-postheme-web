import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import {
  useCommentOnSpecificStatusMutation,
  useLazyGetCommentsOfSpecificStatusQuery,
  useGetTheUserPermissionToSeeTheCommunityMutation,
} from "@/redux/api/core/communitiesApi";
import formatTime from "@/utils/coreUtils/formatTime";
import { useForm } from "react-hook-form";
import { SendHorizonal } from "lucide-react";
import CommentReply from "./CommentReply";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import StatusReact from "./StatusReact";
import {
  ALLOWED_COMMUNITY_SYSTEM_USER_PERMISSIONS_STATUS,
  ALLOWED_WEB_USER,
} from "@/data/coreData/coreData";

interface BottomDrawerProps {
  status: any;
  community_id: number;
  handlePause: () => void;
  handleResume: () => void;
}

export default function BottomDrawer({
  status,
  community_id,
  handlePause,
  handleResume,
}: BottomDrawerProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [postSlug, setPostSlug] = useState<string>("");

  const toggleDrawer = (open: boolean) => () => {
    setOpen(open);
    handlePause();
    setPostSlug(status.slug);
  };

  const toggleDrawerClose = (open: boolean) => () => {
    setOpen(open);
    handleResume();
    setPostSlug(status.slug);
  };

  const { user_profile } = useSelector((state: any) => state.coreAppSlice);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ commentText: string }>();

  const [page, setPage] = useState<number>(1);
  const [comments, setComments] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [replyInputVisible, setReplyInputVisible] = useState<number | null>(
    null
  );
  const [nestedReplyVisible, setNestedReplyVisible] = useState<number | null>(
    null
  );
  const [replyCommentID, setReplyCommentID] = useState<number | null>(null);

  const [triggerGetComments, { isFetching }] =
    useLazyGetCommentsOfSpecificStatusQuery();

  const [commentPost] = useCommentOnSpecificStatusMutation();

  const [userPermission, setUserPermission] = useState<string>("");

  useEffect(() => {
    if (postSlug) {
      setPage(1);
      setComments([]);
      loadComments(1, true);
    }
  }, [postSlug]);

  const loadComments = async (pageNumber: number, resetList = false) => {
    const res = await triggerGetComments({
      slug: postSlug,
      query: `page=${pageNumber}&limit=20`,
    });

    const results = res?.data?.payload?.rows || [];

    if (results.length === 0) {
      setHasMore(false);
    } else {
      setComments((prev) => (resetList ? results : [...prev, ...results]));
      setPage(pageNumber + 1);
    }
  };

  const onSubmit = async (data: { commentText: string }) => {
    if (!user_profile) return router.push("/auth/login");

    try {
      const req_data = {
        comment_parent_id: null,
        content: data.commentText,
      };

      const res = await commentPost({
        slug: postSlug,
        data: req_data,
      }).unwrap();

      const newComment = res?.payload?.data;
      setComments((prev) => [newComment, ...prev]);

      reset();
    } catch (err) {
      console.error("Failed to comment:", err);
    }
  };

  useEffect(() => {
    if (status) setPostSlug(status.slug);
  }, [status]);

  const [user_permission] = useGetTheUserPermissionToSeeTheCommunityMutation();

  useEffect(() => {
    const fetchUserPermission = async () => {
      const res = await user_permission({
        user_id: user_profile?.id,
        community_id: community_id,
        entity_type: "communityStatus",
      });
      setUserPermission(res?.data?.payload);
    };

    fetchUserPermission();
  }, [community_id]);

  const list = (
    <Box sx={{ width: "auto" }} className="h-[80vh] p-4" role="presentation">
      <h2 className="font-[500] text-[17px]">Comments</h2>

      <div
        id="manualScroll"
        style={{
          height: "90%",
          overflowY: "auto",
        }}
        className="mt-2"
      >
        {comments.map((comment: any) => (
          <div key={comment.id} className="p-3">
            <div className="flex items-start w-full">
              <div className="w-[44px] h-[44px] rounded-full flex justify-center items-center text-gray-300 dark:text-gray-600">
                <svg
                  className="mb-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="currentColor"
                    d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"
                  />
                </svg>
              </div>

              <div className="ml-3 w-[calc(100%-44px)]">
                <div className="flex justify-between">
                  <p className="text-[14px] font-[600]">
                    {comment?.user_type === ALLOWED_WEB_USER.TBLCHART
                      ? comment?.user?.fldName
                      : `@admin ${comment?.webUser?.UserName}`}
                  </p>

                  <p className="text-[12px] text-gray-600 dark:text-gray-300">
                    {formatTime(comment?.createdAt)}
                  </p>
                </div>

                <p className="text-[13px]">{comment.content}</p>

                <button
                  onClick={() => {
                    setReplyInputVisible(comment.id);
                    setPostSlug(status.slug);
                  }}
                  className="text-xs text-blue-500 mt-1"
                >
                  Reply
                </button>

                {replyInputVisible === comment.id && (
                  <CommentReply
                    setComments={setComments}
                    comment_id={replyInputVisible}
                    slug={postSlug}
                    setReply={setReplyInputVisible}
                    setReplyCommentID={setReplyCommentID}
                  />
                )}

                {/* Replies */}
                <div className="mt-2">
                  {comment.replies?.map((item: any) => (
                    <div className="flex items-start w-full" key={item.id}>
                      <div className="w-[35px] h-[35px] rounded-full flex justify-center items-center text-gray-300 dark:text-gray-600">
                        <svg
                          className="mb-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill="currentColor"
                            d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"
                          />
                        </svg>
                      </div>

                      <div className="ml-3 w-full">
                        <div className="flex justify-between">
                          <p className="text-[14px] font-[600]">
                            {item?.user_type === ALLOWED_WEB_USER.TBLCHART
                              ? item?.user?.fldName
                              : `@admin ${item?.webUser?.UserName}`}
                          </p>

                          <p className="text-[12px] text-gray-600 dark:text-gray-300">
                            {formatTime(item?.createdAt)}
                          </p>
                        </div>

                        <p className="text-[13px]">{item.content}</p>

                        <button
                          onClick={() => {
                            setNestedReplyVisible(comment.id);
                            setReplyCommentID(item.id);
                            setPostSlug(status.slug);
                          }}
                          className="text-xs text-blue-500 mt-1"
                        >
                          Reply
                        </button>

                        {replyCommentID === item.id && (
                          <CommentReply
                            comment_id={nestedReplyVisible}
                            setReply={setNestedReplyVisible}
                            slug={postSlug}
                            setComments={setComments}
                            setReplyCommentID={setReplyCommentID}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* ✔ Load More button instead of InfiniteScroll */}
        {hasMore && !isFetching && (
          <div className="w-full flex justify-center my-4">
            <button
              onClick={() => loadComments(page)}
              className="text-blue-600 text-sm font-semibold px-4 py-2 border rounded-md"
            >
              Load More
            </button>
          </div>
        )}

        {!hasMore && comments.length > 0 && (
          <p className="text-center text-gray-500 text-sm my-3">
            No more comments.
          </p>
        )}
      </div>

      {/* Comment Input */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-2 flex w-full gap-2 items-center"
      >
        <div className="w-full">
          <input
            {...register("commentText", { required: true })}
            placeholder="Write your comment..."
            className="w-full px-3 py-[7px] border border-gray-400 rounded-lg text-sm"
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
    </Box>
  );

  return (
    <>
      <div className="w-full absolute bottom-16 px-4 pb-4 z-50">
        <div className="flex justify-between gap-x-3 items-center">
          {!user_profile ||
          !userPermission?.includes(
            ALLOWED_COMMUNITY_SYSTEM_USER_PERMISSIONS_STATUS.CANNOT_COMMENT_STATUS
          ) ? (
            <input
              type="text"
              onClick={toggleDrawer(true)}
              placeholder="Reply..."
              className="w-full py-2 px-4 rounded-full bg-black text-white placeholder-gray-500"
            />
          ) : (
            <div className="w-full"></div>
          )}

          {(!user_profile ||
            !userPermission?.includes(
              ALLOWED_COMMUNITY_SYSTEM_USER_PERMISSIONS_STATUS.CANNOT_LIKE_STATUS
            )) && (
            <StatusReact
              handlePause={handlePause}
              handleResume={handleResume}
              slug={postSlug}
              status={status}
              setSlug={setPostSlug}
            />
          )}
        </div>
      </div>

      <Drawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawerClose(false)}
        PaperProps={{
          sx: {
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
          },
        }}
      >
        {list}
      </Drawer>
    </>
  );
}
