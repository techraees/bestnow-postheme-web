import React, { useState } from "react";
import StatusSidebar from "./StatusSidebar";
import StatusContent from "./StatusContent";

const StatusPage: React.FC = () => {
  const [community_id, setCommunity_id] = useState<number | null>(null);
  const [community_slug, setCommunity_slug] = useState<string | null>(null);
  return (
    <div className="h-[calc(100vh-60px)] flex bg-light_mode_color dark:bg-dark_mode_color">
      <div className="w-[20%] dark:bg-dark_mode_color1 bg-light_mode_color1 p-3 border-r border-light_mode_border2 dark:border-dark_mode_border2">
        <StatusSidebar
          community_id={community_id}
          setCommunity_id={setCommunity_id}
          community_slug={community_slug}
          setCommunity_slug={setCommunity_slug}
        />
      </div>
      <div className="w-[80%] rounded-lg p-3 bg-light_mode_color dark:bg-dark_mode_color">
        <StatusContent
          community_id={community_id}
          setCommunity_id={setCommunity_id}
          community_slug={community_slug}
          setCommunity_slug={setCommunity_slug}
        />
      </div>
    </div>
  );
};
export default StatusPage;
