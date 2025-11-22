"use client";

import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { GoBellSlash } from "react-icons/go";

interface MutedUpdate {
  community_name: string;
  time: string;
  img_url: string;
}

const MutedUpdates: React.FC = () => {
  const [isOpenMutedUpdated, setIsOpenMutedUpdates] = useState(false);
  const mutedUpdates: MutedUpdate[] = [
    {
      community_name: "Sunlong Official",
      time: "Just now",
      img_url:
        "https://adminapi.beston.co//uploads/products/7314/images/SUNLONG UNIT -- LCD VIVO Y91 BLACK 1.webp",
    },
    {
      community_name: "Royal Falcon",
      time: "12 minutes ago",
      img_url:
        "https://adminapi.beston.co//uploads/products/5581/images/FALCON UNIT  -- LCD VIVO Y20 BLACK 1.webp",
    },
    {
      community_name: "Daily Updates",
      time: "1 hour ago",
      img_url:
        "https://images.unsplash.com/photo-1707837326082-0687ef884c34?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGFpbHklMjB1cGRhdGVzfGVufDB8fDB8fHww",
    },
    {
      community_name: "Sales Man",
      time: "2 hour ago",
      img_url:
        "https://images.unsplash.com/photo-1560250056-07ba64664864?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2FsZXNtYW58ZW58MHx8MHx8fDA%3D",
    },
    {
      community_name: "Golden Crown",
      time: "1 week ago",
      img_url:
        "https://adminapi.beston.co//uploads/products/5757/images/UNIT_GC_____LCD_VIVO_Y20_BLACK 1.webp",
    },
  ];
  return (
    <>
      <div
        className="flex items-center justify-between select-none cursor-pointer text-[14px] mt-5"
        onClick={() => setIsOpenMutedUpdates(!isOpenMutedUpdated)}
      >
        <span className="text-light_mode_primary_text_primary dark:text-dark_mode_primary_text_primary">
          Muted Updates
        </span>
        {isOpenMutedUpdated ? (
          <span className="text-light_mode_primary_4 dark:text-white">
            {" "}
            <FaChevronUp size={10} />
          </span>
        ) : (
          <span className="text-light_mode_primary_4 dark:text-white">
            <FaChevronDown size={10} />
          </span>
        )}
      </div>
      {isOpenMutedUpdated && (
        <>
          <div className="flex flex-col gap-7 mt-4">
            {mutedUpdates.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between opacity-50"
              >
                <div className="flex">
                  <div className="w-[56px] h-[56px] flex items-center justify-center bg-primary rounded-full">
                    <div className="w-[52px] h-[52px] flex items-center justify-center bg-light_mode_color dark:bg-dark_mode_primary rounded-full">
                      <div className="w-[48px] h-[48px] rounded-full overflow-hidden">
                        <img src={item?.img_url} alt="" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between ml-3">
                    <div>
                      <p className="text-light_mode_text dark:text-dark_mode_text">
                        {item?.community_name}
                      </p>
                      <span className="text-[14px] text-light_mode_gray_color dark:text-dark_mode_gray_color">
                        {item?.time}
                      </span>
                    </div>
                  </div>
                </div>

                <GoBellSlash />
              </div>
            ))}
          </div>
          <div className="mb-5" />
        </>
      )}
    </>
  );
};

export default MutedUpdates;
