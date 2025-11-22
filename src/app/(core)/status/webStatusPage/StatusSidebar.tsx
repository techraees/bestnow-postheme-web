import React, { useState } from "react";
import RecentUpdates from "./RecentUpdates";
import Communities from "./Communities";
import CommunitiesPage from "./communities/CommunitiesPage";

interface StatusSidebarProps {
  community_id: number | null;
  setCommunity_id: (id: number | null) => void;
  community_slug: string | null;
  setCommunity_slug: (slug: string | null) => void;
}

const StatusSidebar: React.FC<StatusSidebarProps> = ({
  community_id,
  setCommunity_id,
  community_slug,
  setCommunity_slug,
}) => {
  const [activeAllCommunities, setAllCommunities] = useState<boolean>(false);
  return (
    <div>
      {!activeAllCommunities ? (
        <>
          <div className="w-full h-[48px] flex items-center text-[1.25rem] font-[500] text-light_mode_text dark:text-dark_mode_text">
            Reel/Status
          </div>
          <RecentUpdates
            community_id={community_id}
            setCommunity_id={setCommunity_id}
            community_slug={community_slug}
            setCommunity_slug={setCommunity_slug}
          />

          <Communities
            setAllCommunities={setAllCommunities}
            community_id={community_id}
            setCommunity_id={setCommunity_id}
            community_slug={community_slug}
            setCommunity_slug={setCommunity_slug}
          />
        </>
      ) : (
        <>
          <CommunitiesPage
            setAllCommunities={setAllCommunities}
            community_id={community_id}
            setCommunity_id={setCommunity_id}
            community_slug={community_slug}
            setCommunity_slug={setCommunity_slug}
          />
        </>
      )}
    </div>
  );
};

export default StatusSidebar;
