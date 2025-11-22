import React, { useEffect, useRef, useState } from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import { InstagramIcon } from "lucide-react";
import { useEngagementOnSpecificPostMutation } from "@/redux/api/core/communitiesApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

interface ShareModalProps {
  onClose: () => void;
  url: string;
  post_slug: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ onClose, url, post_slug }) => {
  const { user_profile } = useSelector((state: any) => state.coreAppSlice);
  const router = useRouter();
  const [EngagementPost] = useEngagementOnSpecificPostMutation();
  const [showToast, setShowToast] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleInstagramShare = async () => {
    if (!user_profile) {
      return router.push("/auth/login");
    }
    const instagramUrl = `https://www.instagram.com/?url=${encodeURIComponent(
      url
    )}`;

    try {
      const data = {
        action_type: "share",
        share_platform: "instagram",
      };

      await EngagementPost({
        slug: post_slug,
        data: data,
      }).unwrap();
      onClose();
      window.open(instagramUrl, "_blank");
      console.log("Instagram share logged");
    } catch (error) {
      console.error("Failed to log Instagram share", error);
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div
        ref={modalRef}
        className="bg-white dark:bg-black text-white sm:p-6 p-3 rounded-2xl shadow-xl relative md:w-[500px] w-[90%]"
      >
        <button className="absolute top-2 right-2" onClick={onClose}>
          <div className="w-7 h-7">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="black"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7a1 1 0 1 0-1.41 1.41L10.59 12l-4.89 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4z" />
            </svg>
          </div>
        </button>
        <h2 className="text-lg font-bold mb-4 text-black dark:text-white">
          Share this drop
        </h2>
        <div className="flex overflow-x-auto space-x-4 mb-4 scrollbar-hidden">
          {[
            {
              Button: WhatsappShareButton,
              Icon: WhatsappIcon,
              label: "WhatsApp",
            },
            { Button: EmailShareButton, Icon: EmailIcon, label: "Email" },
            {
              Button: FacebookShareButton,
              Icon: FacebookIcon,
              label: "Facebook",
            },
            { Button: RedditShareButton, Icon: RedditIcon, label: "Reddit" },
            {
              Button: TelegramShareButton,
              Icon: TelegramIcon,
              label: "Telegram",
            },
            { Button: TwitterShareButton, Icon: TwitterIcon, label: "Twitter" },
          ].map(({ Button, Icon, label }, index) => (
            <div key={index} className="flex flex-col items-center space-y-1">
              {user_profile ? (
                <Button
                  url={url}
                  onClick={async () => {
                    try {
                      const data = {
                        action_type: "share",
                        share_platform: label.toLowerCase(),
                      };

                      await EngagementPost({
                        slug: post_slug,
                        data,
                      }).unwrap();
                      onClose();

                      toast.success(`${label} share logged successfully`);
                    } catch (error) {
                      toast.error(`Failed to log share on ${label}`);
                    }
                  }}
                >
                  <Icon size={44} round />
                </Button>
              ) : (
                <button
                  onClick={() => navigate("/auth/login")}
                  className="w-[44px] h-[44px] rounded-full flex items-center justify-center "
                >
                  <Icon size={44} round />
                </button>
              )}
              <span className="text-xs font-bold text-black dark:text-white">
                {label}
              </span>
            </div>
          ))}
          <div className="flex flex-col items-center space-y-1">
            <button onClick={handleInstagramShare}>
              <img
                src={InstagramIcon}
                alt="Instagram Icon"
                className="rounded-full"
                style={{ width: 44, height: 44 }}
              />
            </button>
            <span className="text-xs font-bold text-black dark:text-white">
              Instagram
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2 border border-gray-400 rounded-[10px] sm:px-3 px-1.5 sm:py-2.5 py-1.5">
          <input
            type="text"
            readOnly
            value={url}
            className="border-none px-2 text-black dark:text-white flex-1"
          />
          <button
            onClick={handleCopy}
            className="px-3 py-1 bg-blue-500 text-white rounded-2xl flex items-center space-x-1"
          >
            <span className="text-[16px]">Copy</span>
          </button>
        </div>
      </div>

      {showToast && (
        <div
          id="toast-bottom-left"
          className="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-gray-900 divide-x divide-gray-200 rounded-lg shadow bottom-5 left-5"
          role="alert"
        >
          <div className="text-sm text-white font-bold">
            URL copied to clipboard!
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareModal;
