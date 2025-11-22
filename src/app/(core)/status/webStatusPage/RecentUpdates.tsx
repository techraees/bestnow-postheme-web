import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import {
  useGetAllCommunitiesHavingActiveStatusQuery,
  useGetSingleCommunityQuery,
  useGetStatusOfSpecificCommunityQuery,
} from "@/redux/api/core/communitiesApi";
import { BestonDarkLogo, BestonLightLogo } from "@/assets/icons/logo";
import formatTime from "@/utils/coreUtils/formatTime";
import StatusCardSkeletal from "./StatusCardSkeletal";
import StatusHeader from "./statusComponents/StatusHeader";
import StatusViewer from "./statusComponents/StatusViewer";
import { getImgBaseUrl } from "@/utils/coreUtils/getImgBaseUrl";
import { THEME_DATA } from "@/data/coreData/coreData";

// Modal animations
const modalVariants = {
  hidden: { scale: 0.7, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
  exit: { scale: 0.7, opacity: 0 },
};

interface RecentUpdatesProps {
  community_id: number | null;
  setCommunity_id: (id: number | null) => void;
}

const RecentUpdates: React.FC<RecentUpdatesProps> = ({
  community_id,
  setCommunity_id,
}) => {
  const { theme_mode } = useSelector((state: any) => state.coreAppSlice);
  const [community_slug, setCommunity_slug] = useState<string>("");

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [currentItemOfStatus, setCurrentItemOfStatus] = useState<any>(null);

  const { data: statusCommunity } = useGetStatusOfSpecificCommunityQuery({
    slug: community_slug,
  });

  const {
    data: recentUpdates,
    isLoading,
    isFetching,
  } = useGetAllCommunitiesHavingActiveStatusQuery({
    queryParams: `page=${page}&limit=${limit}`,
  });

  const statuses = statusCommunity?.payload || [];
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  useEffect(() => {
    document.body.style.overflow = isOpenModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpenModal]);

  const { data: getCommunityDetail } =
    useGetSingleCommunityQuery(community_slug);

  return (
    <>
      <div className="flex items-center justify-between select-none text-[14px] mt-1">
        <span className="text-light_mode_primary_text_primary dark:text-dark_mode_primary_text_primary mb-3">
          Recent Updates
        </span>
      </div>
      <div
        key="recent-updates-container"
        className={`flex flex-col mt-4 ${!isLoading ? "gap-7" : "gap-3"}`}
      >
        {isLoading
          ? Array.from({ length: 4 }).map((item, index) => (
              <StatusCardSkeletal key={index} />
            ))
          : Array.isArray(recentUpdates?.payload) &&
            recentUpdates?.payload.map((item: any) => (
              <div
                key={item.id}
                onClick={() => {
                  handleOpenModal();
                  setCommunity_slug(item.slug);
                }}
                className="flex cursor-pointer items-center justify-between "
              >
                <div className="flex">
                  {item?.all_statuses_viewed ? (
                    <div className="w-[56px] h-[56px] flex items-center justify-center rounded-full">
                      {item?.profile_photo_url ? (
                        <div className="w-[48px] h-[48px] rounded-full overflow-hidden">
                          <img
                            src={getImgBaseUrl(item.profile_photo_url)}
                            alt="Profile"
                          />
                        </div>
                      ) : (
                        <div className="w-[45px] h-[45px] rounded-full overflow-hidden">
                          <img
                            src={
                              theme_mode === THEME_DATA.DARK
                                ? BestonDarkLogo.src
                                : BestonLightLogo.src
                            }
                            className="w-full h-full object-cover"
                            alt="Profile"
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-[56px] h-[56px] flex items-center justify-center bg-primary rounded-full">
                      <div className="w-[52px] h-[52px] flex items-center justify-center bg-light_mode_color dark:bg-dark_mode_primary rounded-full">
                        {item?.profile_photo_url ? (
                          <div className="w-[48px] h-[48px] rounded-full overflow-hidden">
                            <img
                              src={getImgBaseUrl(item.profile_photo_url)}
                              alt="Profile"
                            />
                          </div>
                        ) : (
                          <div className="w-[45px] h-[45px] rounded-full overflow-hidden">
                            <img
                              src={
                                theme_mode === THEME_DATA.DARK
                                  ? BestonDarkLogo.src
                                  : BestonLightLogo.src
                              }
                              className="w-full h-full object-cover"
                              alt="Profile"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between ml-3">
                    <div>
                      <p className="text-light_mode_text dark:text-dark_mode_text">
                        {item?.name}
                      </p>
                      <span className="text-[14px] text-light_mode_gray_color dark:text-dark_mode_gray_color">
                        {formatTime(item?.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>

      {/* Show Popup For Shwoing the Status Page */}
      <AnimatePresence>
        {isOpenModal && (
          <Modal
            isOpen={isOpenModal}
            onRequestClose={handleCloseModal}
            contentLabel="Sign Up Info"
            ariaHideApp={false}
            style={{
              content: {
                background: "transparent",
                border: "none",
                padding: 0,
                inset: "0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
              overlay: {
                backgroundColor: "rgba(0,0,0,0.75)",
                zIndex: 1000,
              },
            }}
          >
            <motion.div
              className="flex justify-center items-center w-full h-full"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={modalVariants}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              onClick={handleCloseModal}
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                className="dark:bg-dark_mode_color1 bg-light_mode_color border border-light_mode_border1 dark:border-dark_mode_border1 shadow-2xl py-5 px-4 w-[80vw] h-[80vh]"
              >
                <div className="w-full h-[75vh] relative  overflow-hidden bg-black">
                  <StatusHeader
                    item={getCommunityDetail?.payload}
                    onClose={() => {
                      handleCloseModal(), setCurrentIndex(0);
                    }}
                  />
                  {statuses.length > 0 && (
                    <StatusViewer
                      status={statuses[currentIndex]}
                      currentIndex={currentIndex}
                      setCurrentIndex={setCurrentIndex}
                      total={statuses.length}
                      onClose={() => {
                        handleCloseModal(), setCurrentIndex(0);
                      }}
                      community_id={getCommunityDetail?.payload?.id}
                    />
                  )}
                </div>
              </motion.div>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default RecentUpdates;
