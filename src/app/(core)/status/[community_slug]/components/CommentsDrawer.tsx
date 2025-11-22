import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import {
  // ALLOWED_COMMUNITY_SYSTEM_USER_PERMISSIONS_STATUS,
  // ALLOWED_WEB_USER,
  useCommentOnSpecificPostMutation,
  useCommentOnSpecificStatusMutation,
  useGetTheUserPermissionToSeeTheCommunityMutation,
  useLazyGetCommentsOfSpecificCommunityQuery,
  useLazyGetCommentsOfSpecificStatusQuery,
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

export default function BottomDrawer({
  status,
  community_id,
  handlePause,
  handleResume,
}: {
  status: any;
  community_id: string;
  handlePause: () => void;
  handleResume: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [postSlug, setPostSlug] = useState("");

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
  } = useForm();
  const [comments, setComments] = useState<any[]>([]);

  const [replyInputVisible, setReplyInputVisible] = useState<string | null>(
    null
  );
  const [nestedReplyVisible, setNestedReplyVisible] = useState<string | null>(
    null
  );
  const [replyCommentID, setReplyCommentID] = useState<string | null>(null);
  const [triggerGetComments, { isFetching }] =
    useLazyGetCommentsOfSpecificStatusQuery();
  const [userPermission, setUserPermission] = useState("");

  const [commentPost] = useCommentOnSpecificStatusMutation();

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

    console.log(res, triggerGetComments);

    const results = res?.data?.payload?.rows || [];
    setComments(results);
  };
  const handleReplyClick = (commentId: string) => {
    setReplyInputVisible((prev: any) =>
      prev === commentId ? null : commentId
    );
  };

  const handleNestedReplyClick = (commentId: string) => {
    setNestedReplyVisible((prev) => (prev === commentId ? null : commentId));
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

  useEffect(() => {
    if (status) {
      setPostSlug(status.slug);
    }
  }, [status]);

  const list = (
    <Box sx={{ width: "auto" }} className="h-[80vh] p-4" role="presentation">
      <h2 className=" font-[500] text-[17px]">Comments</h2>
      <div
        id="scrollableDiv"
        style={{
          height: "90%",
          overflow: "auto",
        }}
      >
        {isFetching && comments.length === 0 ? (
          <h4 className="text-center">Loading...</h4>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="p-3 ">
              <div className="flex items-start w-full">
                <div className="w-[44px] h-[44px] text-gray-300 dark:text-gray-600  rounded-full overflow-hidden flex justify-center items-center">
                  <svg
                    className=" mb-1"
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
                <div className=" w-[calc(100%-44px)]  ml-3">
                  <div>
                    <div className=" flex justify-between items-center w-full">
                      <p className="text-[14px] font-[600]">
                        {comment?.user_type === ALLOWED_WEB_USER.TBLCHART
                          ? comment?.user?.fldName
                          : `@admin ${comment?.webUser?.UserName}`}
                      </p>
                      <p className="text-[12px] text-gray-600  dark:text-gray-300">
                        {formatTime(comment?.createdAt)}
                      </p>
                    </div>

                    <p className=" text-[13px] ">{comment.content}</p>
                    <button
                      onClick={() => {
                        handleReplyClick(comment.id);
                        setPostSlug(status?.slug);
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
                        setReply={setReplyInputVisible}
                      />
                    )}

                    {/* REPLIES LIST */}
                    <div className="mt-2">
                      {comment.replies?.length > 0 &&
                        comment.replies.map((item: any, index: number) => {
                          return (
                            <div
                              className="flex items-start w-full"
                              key={index}
                            >
                              {/* avatar */}
                              <div className="w-[35px] h-[35px] text-gray-300 dark:text-gray-600 rounded-full overflow-hidden flex justify-center items-center">
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

                              {/* content */}
                              <div className="w-[calc(100%-44px)] ml-3">
                                <div>
                                  <div className="flex justify-between items-center w-full">
                                    <p className="text-[14px] font-[600]">
                                      {item?.user_type ===
                                      ALLOWED_WEB_USER.TBLCHART
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
                                      handleNestedReplyClick(comment.id);
                                      setReplyCommentID(item.id);
                                      setPostSlug(status?.slug);
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
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
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

  const [user_permission, { isLoading }] =
    useGetTheUserPermissionToSeeTheCommunityMutation();

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

  return (
    <>
      <div className="w-full absolute bottom-16 px-4 pb-4 z-50">
        {!isLoading && (
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

            {!userPermission?.includes(
              ALLOWED_COMMUNITY_SYSTEM_USER_PERMISSIONS_STATUS.CANNOT_LIKE_STATUS ||
                !user_profile
            ) && (
              <StatusReact
                handlePause={handlePause}
                handleResume={handleResume}
                slug={postSlug}
                status={status}
                setSlug={setPostSlug}
              />
            )}
          </div>
        )}
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
