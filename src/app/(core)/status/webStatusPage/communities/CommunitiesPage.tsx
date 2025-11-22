import React from "react";
import {
  Dark_Mode_Bestnow_Icon,
  Light_Mode_Bestnow_Icon,
} from "@/assets/coreAssets/coreAssets";
import { useSelector } from "react-redux";
import { IoMdArrowRoundBack } from "react-icons/io";
import ExploreCommunities from "./ExploreCommunities";

interface ShivaCartoonUIProps {
  setAllCommunities: (value: boolean) => void;
  community_id: number | null;
  setCommunity_id: (id: number | null) => void;
  community_slug: string | null;
  setCommunity_slug: (slug: string | null) => void;
}

const ShivaCartoonUI: React.FC<ShivaCartoonUIProps> = ({
  setAllCommunities,
  community_id,
  setCommunity_id,
  community_slug,
  setCommunity_slug,
}) => {
  const { theme_mode } = useSelector((state: any) => state.coreAppSlice);

  return (
    <div className="max-w-md mx-auto text-black  font-sans  scrollbar_hide_custom relative">
      <div className="z-[1000] flex items-center mb-3 justify-between text-black dark:text-white text-lg font-semibold">
        <div className="flex items-center gap-2">
          <span
            onClick={() => {
              setAllCommunities(false);
            }}
          >
            <IoMdArrowRoundBack className="text-xl" />
          </span>
          <div>Communities</div>
        </div>
      </div>

      <div className="text-light_mode_primary_text_primary dark:text-dark_mode_primary_text_primary">
        <ExploreCommunities
          community_id={community_id}
          setCommunity_id={setCommunity_id}
          community_slug={community_slug}
          setCommunity_slug={setCommunity_slug}
        />
      </div>
    </div>
  );
};

export default ShivaCartoonUI;
