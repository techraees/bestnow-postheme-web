import React, { useEffect, useRef, useState } from "react";
import BottomDrawer from "./CommentsDrawer";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import {
  useEngagementOnSpecificStatusMutation,
  useGetTheUserPermissionToSeeTheCommunityMutation,
} from "@/redux/api/core/communitiesApi";
import { getImgBaseUrl } from "@/utils/coreUtils/getImgBaseUrl";

interface StatusViewerProps {
  status: {
    file_url?: string;
    bg_color?: string;
    content?: string;
    slug: string;
  };
  currentIndex: number;
  setCurrentIndex: (fn: (prev: number) => number) => void;
  total: number;
  onClose: () => void;
  community_id: string;
}

const StatusViewer: React.FC<StatusViewerProps> = ({
  status,
  currentIndex,
  setCurrentIndex,
  total,
  onClose,
  community_id,
}) => {
  const fixedDuration = 6000;
  const [progress, setProgress] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement | null>(null);
  const [mediaDuration, setMediaDuration] = useState<number>(fixedDuration);
  const elapsedTimeRef = useRef<number>(0);

  const extension = status?.file_url?.split(".").pop()?.toLowerCase();
  const isImage = ["jpg", "jpeg", "png", "webp"].includes(extension || "");
  const isVideo = extension === "mp4";
  const isAudio = extension === "mp3";
  const isPdf = extension === "pdf";
  const isExcel = ["xls", "xlsx", "csv"].includes(extension || "");

  const isFixed5s = !status?.file_url || isImage; // content or image

  useEffect(() => {
    let localInterval: NodeJS.Timeout | null = null;

    const duration = isFixed5s ? fixedDuration : mediaDuration;
    const step = 100 / (duration / 100);

    if (!isPaused) {
      localInterval = setInterval(() => {
        elapsedTimeRef.current += 100; // Track real time spent
        setProgress((elapsedTimeRef.current / duration) * 100);
      }, 100);
    }

    return () => {
      if (localInterval) clearInterval(localInterval);
    };
  }, [currentIndex, isPaused, mediaDuration, isFixed5s]);

  const handlePrev = () => currentIndex > 0 && setCurrentIndex((p) => p - 1);
  const handleNext = () =>
    currentIndex < total - 1 ? setCurrentIndex((p) => p + 1) : onClose();

  useEffect(() => {
    if (progress === 100) {
      handleNext();
    }
  }, [progress]);

  const handleMouseDown = () => {
    console.log(progress);
    setIsPaused(true);
  };
  const handleMouseUp = () => setIsPaused(false);

  const [EngagementPost] = useEngagementOnSpecificStatusMutation();

  const handleViewPost = async (slug: string) => {
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
    setProgress(0);
    elapsedTimeRef.current = 0; // Reset elapsed time
  }, [currentIndex]);

  const handlePause = () => {
    setIsPaused(true);
    if (mediaRef.current && "pause" in mediaRef.current) {
      mediaRef.current.pause();
    }
    console.log("hfdfnj");
  };

  const handleResume = () => {
    setIsPaused(false);
    if (mediaRef.current && "play" in mediaRef.current) {
      mediaRef.current.play();
    }
  };

  useEffect(() => {
    if (progress === 50) {
      handleViewPost(status?.slug);
    }
  }, [progress]);

  console.log(isPaused);

  return (
    <div
      className="absolute inset-0 flex flex-col items-center text-white"
      style={{ backgroundColor: status?.bg_color || "#000" }}
      onMouseDown={handlePause}
      onMouseUp={handleResume}
      onTouchStart={handlePause}
      onTouchEnd={handleResume}
    >
      {/* Progress bar */}
      <div className="w-full flex space-x-1 p-2 z-10">
        {[...Array(total)].map((_, i) => (
          <div
            key={i}
            className="h-1 bg-gray-400 rounded-full overflow-hidden flex-1"
          >
            <div
              className="h-full bg-white transition-all duration-75"
              style={{
                width:
                  i < currentIndex
                    ? "100%"
                    : i === currentIndex
                    ? `${progress}%`
                    : "0%",
              }}
            />
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 w-full h-full flex justify-center items-center relative z-10 overflow-hidden">
        {/* Image */}
        {isImage && (
          <img
            src={getImgBaseUrl(status.file_url)}
            alt="status"
            className="max-h-full max-w-full h-[100%] object-contain"
          />
        )}

        {/* Video */}
        {isVideo && (
          <video
            ref={mediaRef as React.RefObject<HTMLVideoElement>}
            src={getImgBaseUrl(status.file_url)}
            onLoadedMetadata={(
              e: React.SyntheticEvent<HTMLVideoElement, Event>
            ) =>
              setMediaDuration(
                (e.target as HTMLVideoElement).duration * 1000 || fixedDuration
              )
            }
            onPlay={() =>
              isPaused && (mediaRef.current as HTMLVideoElement)?.pause()
            }
            controls
            autoPlay
            controlsList="nodownload noplaybackrate nofullscreen"
            className="max-h-full max-w-full h-[100%]  object-contain pointer-events-none select-none"
          />
        )}

        {/* Audio */}
        {isAudio && (
          <audio
            ref={mediaRef as React.RefObject<HTMLAudioElement>}
            onLoadedMetadata={(
              e: React.SyntheticEvent<HTMLAudioElement, Event>
            ) =>
              setMediaDuration(
                (mediaRef.current as HTMLAudioElement)?.duration * 1000 ||
                  fixedDuration
              )
            }
            onPlay={() =>
              isPaused && (mediaRef.current as HTMLAudioElement)?.pause()
            }
            controls
            autoPlay
            controlsList="nodownload noplaybackrate nofullscreen"
            className="w-[300px] pointer-events-none select-none"
          >
            <source src={getImgBaseUrl(status.file_url)} />
            Your browser does not support the audio element.
          </audio>
        )}

        {/* PDF/Excel File */}
        {(isPdf || isExcel) && (
          <div className="flex flex-col items-center justify-center space-y-2 text-white">
            <p className="text-sm">This is a {extension?.toUpperCase()} file</p>
            <a
              href={getImgBaseUrl(status.file_url)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-4 py-2 rounded-full font-bold"
            >
              Open File
            </a>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="absolute inset-0 flex justify-between items-center px-4">
          <button
            onClick={handlePrev}
            className="bg-black w-[40px] h-[40px] flex justify-center items-center rounded-full shadow-md transition"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={handleNext}
            className="bg-black w-[40px] h-[40px] flex justify-center items-center rounded-full shadow-md transition"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Plain text */}
        {!status?.file_url && status?.content && (
          <div className="absolute px-4 text-white text-center max-w-[90vw] overflow-x-hidden">
            <div
              dangerouslySetInnerHTML={{ __html: status.content }}
              className="break-words whitespace-pre-line"
            />
          </div>
        )}
      </div>

      <BottomDrawer
        setIsPaused={setIsPaused}
        status={status}
        community_id={community_id}
        handlePause={handlePause}
        handleResume={handleResume}
      />
      {/* Reply input */}
    </div>
  );
};

export default StatusViewer;
