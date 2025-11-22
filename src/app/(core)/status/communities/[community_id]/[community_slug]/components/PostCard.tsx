import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { MessageCircle, Send } from "lucide-react";
import {
  useEngagementOnSpecificPostMutation,
  useGetTheUserPermissionToSeeTheCommunityMutation,
} from "@/redux/api/core/communitiesApi";
import ShareModal from "./ShareModel";
import { Comments } from "./Comments";
import PostReact from "./PostReact";
import PostSaved from "./PostSaved";

import Modal from "react-modal";
import { ALLOWED_COMMUNITY_SYSTEM_USER_PERMISSIONS_POST } from "@/data/coreData/coreData";
import { formattedDate } from "@/utils/coreUtils/formatedDate";
import { formatTimeFromISO } from "@/utils/coreUtils/formatTimeFromISO";
import { getImgBaseUrl } from "@/utils/coreUtils/getImgBaseUrl";
import Link from "next/link";

const sliderSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const getFileName = (url: any) => {
  if (!url) return "";
  return url.split("/").pop();
};

const PostCard = ({ post, community_id }: { post: any; community_id: any }) => {
  const { user_profile } = useSelector((state: any) => state.coreAppSlice);
  const [selectedPostSlug, setSelectedPostSlug] = useState("");

  const [user_permission] = useGetTheUserPermissionToSeeTheCommunityMutation();
  const [EngagementPost] = useEngagementOnSpecificPostMutation();
  const [userPermission, setUserPermission] = useState("");
  const [activeImgUrl, setActiveImgUrl] = useState("");
  const [isOpenShareModal, setIsOpenShareModal] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  useEffect(() => {
    const fetchUserPermission = async () => {
      const res = await user_permission({
        user_id: user_profile?.id,
        community_id: community_id,
        entity_type: "communityPost",
      });
      setUserPermission(res?.data?.payload);
    };

    fetchUserPermission();
  }, []);

  const handleViewPost = async (slug: any) => {
    try {
      const data = {
        action_type: "view",
      };
      await EngagementPost({
        slug: slug,
        data,
      }).unwrap();
    } catch (err) {}
  };

  useEffect(() => {
    if (post) {
      handleViewPost(post.slug);
    }
  }, [post]);

  const getMergedMedia = (post: any) => {
    const images = (post?.images || []).map((img: any) => ({
      type: "image",
      url: getImgBaseUrl(`${img.filePath}`),
    }));
    const videos = (post?.videso || []).map((vid: any) => ({
      type: "video",
      url: getImgBaseUrl(`${vid.filePath}`),
    }));
    const documents = (post?.documents || []).map((doc: any) => ({
      type: "document",
      url: getImgBaseUrl(`${doc.filePath}`),
    }));

    return [...images, ...videos, ...documents];
  };
  return (
    <>
      <div className="bg-white   dark:bg-dark_mode_primary_overlay_5 rounded-lg p-2 shadow-md">
        <p className="mt-1 mb-5 text-[1.25rem]" style={{ fontWeight: 500 }}>
          {post?.title}
        </p>
        {getMergedMedia(post).length > 0 && (
          <Slider {...sliderSettings}>
            {getMergedMedia(post).map((media, i) => (
              <div key={i} className="rounded-lg overflow-hidden">
                {media.type === "video" ? (
                  <video
                    controls
                    onError={(e: any) =>
                      (e.target.parentNode.style.display = "none")
                    }
                    className="w-full max-h-[400px] rounded-lg"
                  >
                    <source src={media.url} type="video/mp4" />
                  </video>
                ) : media.type === "image" ? (
                  <img
                    src={media.url}
                    onClick={() => {
                      setActiveImgUrl(media.url);
                    }}
                    alt="media"
                    onError={(e: any) => (e.target.style.display = "none")}
                    className="w-full max-h-[400px] object-contain h-[400px]"
                  />
                ) : (
                  <div
                    onError={(e: any) =>
                      (e.currentTarget.style.display = "none")
                    }
                    className="p-4  rounded-lg bg-red-100 dark:bg-cyan-900 h-[400px] flex flex-col justify-center items-center text-center shadow-sm"
                  >
                    <div className="w-full px-2">
                      <p className="text-[20px] text-black dark:text-gray-300  px-5 mb-4">
                        {getFileName(media.url)}
                      </p>
                      <Link
                        href={media.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[15px] bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 py-2 px-4 rounded-full font-medium hover:underline transition"
                      >
                        View Document
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </Slider>
        )}

        <div
          className="mt-2 text-[15px] "
          dangerouslySetInnerHTML={{ __html: post?.content || "" }}
        ></div>

        <div className="flex items-center justify-between px-1 py-2 ">
          <div className="flex items-center gap-4">
            {(!user_profile ||
              !userPermission?.includes(
                ALLOWED_COMMUNITY_SYSTEM_USER_PERMISSIONS_POST.CANNOT_LIKE_POST
              )) && <PostReact slug={post.slug} liked={post?.liked} />}
            {(!user_profile ||
              !userPermission?.includes(
                ALLOWED_COMMUNITY_SYSTEM_USER_PERMISSIONS_POST.CANNOT_COMMENT_POST
              )) && (
              <MessageCircle
                onClick={() => {
                  setSelectedPostSlug((prev) =>
                    prev === post.slug ? null : post.slug
                  );
                  setIsCommentOpen(!isCommentOpen);
                }}
                className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform duration-150"
              />
            )}
            {(!user_profile ||
              !userPermission?.includes(
                ALLOWED_COMMUNITY_SYSTEM_USER_PERMISSIONS_POST.CANNOT_SHARE_POST
              )) && (
              <Send
                onClick={() => {
                  setIsOpenShareModal(true);
                  setSelectedPostSlug((prev) =>
                    prev === post.slug ? null : post.slug
                  );
                }}
                className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform duration-150"
              />
            )}
          </div>
          {(!user_profile ||
            !userPermission?.includes(
              ALLOWED_COMMUNITY_SYSTEM_USER_PERMISSIONS_POST.CANNOT_SAVE_POST
            )) && <PostSaved slug={post.slug} saved={post?.saved} />}
        </div>
        <div className="flex justify-end items-center gap-x-2 mt-0.5 text-[0.75rem]">
          <p className="">{formattedDate(post?.createdAt)}</p>
          <p className="">{formatTimeFromISO(post?.createdAt)}</p>
        </div>
        {isCommentOpen && (
          <>
            <Comments
              postSlug={selectedPostSlug}
              setPostSlug={setSelectedPostSlug}
            />
          </>
        )}
        {isOpenShareModal && (
          <ShareModal
            onClose={() => {
              setIsOpenShareModal(false);
            }}
            url={`${window.location.origin}/status/communities/${post.id}/${post.slug}`}
            post_slug={selectedPostSlug}
          />
        )}
      </div>

      {/* Modal to display the full image */}
      <Modal
        isOpen={!!activeImgUrl}
        onRequestClose={() => {
          setActiveImgUrl("");
        }}
        contentLabel="Product Image"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "80%",
            maxHeight: "80%",
            padding: "0",
            border: "none",
            background: "transparent",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            zIndex: 1000,
          },
        }}
      >
        <img
          src={activeImgUrl}
          alt="Product full view"
          className="w-full h-auto"
          onClick={(e) => e.stopPropagation()}
        />
      </Modal>
    </>
  );
};

export default PostCard;
