import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import Image from "next/image";
import {
  useFollowCommunityMutation,
  useGetSingleCommunityQuery,
} from "@/redux/api/core/communitiesApi";
import { getImgBaseUrl } from "@/utils/coreUtils/getImgBaseUrl";

interface CommunityDetailHeaderProps {
  community_id: number;
  setCommunity_id: (id: number | null) => void;
  community_slug: string;
  setCommunity_slug: (slug: string | null) => void;
  refetch?: () => void;
}

const CommunityDetailHeader: React.FC<CommunityDetailHeaderProps> = ({
  community_id,
  setCommunity_id,
  community_slug,
  setCommunity_slug,
  refetch,
}) => {
  const { data } = useGetSingleCommunityQuery(community_slug);
  const item = data?.payload;
  console.log(data);
  const { user_profile } = useSelector((state: any) => state.coreAppSlice);
  const [FollowCommunity, { isLoading: followLoading, originalArgs }] =
    useFollowCommunityMutation();

  const handleFollowCommunities = async (slug: string) => {
    if (!user_profile) {
      return;
    }
    const res = await FollowCommunity(slug);
    if (res?.data?.status === "success") {
      toast.success(res?.data?.payload?.message);
      refetch?.();
    } else {
      toast.error((res?.error as any)?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="-mx-3 px-3 pb-2 border-b border-b-light_bottom_top_border dark:border-dark_bottom_top_border">
      <div className="flex items-center justify-between w-full  gap-2">
        <div className="flex items-center w-full">
          <div className="flex items-center">
            <div className="w-[40px] h-[40px]  rounded-full overflow-hidden flex justify-center items-center">
              <div className="w-[24px] h-[24px] object-cover">
                <Image
                  src={item?.profile_photo_url}
                  alt={item?.name || "Sunlong Official"}
                  width={24}
                  height={24}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex items-center justify-between ml-3">
              <div>
                <p className="truncate whitespace-nowrap w-[180px] text-light_mode_text dark:text-dark_mode_text">
                  {item?.name || "Sunlong Official"}
                </p>
                <span className="text-[14px] text-light_mode_gray_color dark:text-dark_mode_gray_color">
                  {item?.community_member_count}
                  {"0 followers"}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div>
            <button
              onClick={(e: any) => {
                e.preventDefault();
                e.stopPropagation();
                handleFollowCommunities(item.slug);
              }}
              disabled={followLoading}
              className={`w-full h-full rounded-lg px-3 py-0.5 flex items-center cursor-pointer justify-center text-[14px]
                        ${
                          item?.follow
                            ? "bg-transparent border border-primary text-primary"
                            : "bg-blue-200 dark:bg-blue-900 dark:text-blue-300 text-primary"
                        }
                      `}
            >
              {item?.follow ? (
                followLoading ? (
                  <ClipLoader
                    size={15}
                    className="!text-white mx-3 my-1"
                    color="#006BFF"
                  />
                ) : (
                  "Following"
                )
              ) : followLoading ? (
                <ClipLoader
                  size={15}
                  className="!text-white mx-3 my-1"
                  color="#006BFF"
                />
              ) : (
                "Follow"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetailHeader;
