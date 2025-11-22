"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  useGetSingleCommunityQuery,
  useGetStatusOfSpecificCommunityQuery,
} from "@/redux/api/core/communitiesApi";
import StatusHeader from "../webStatusPage/statusComponents/StatusHeader";
import StatusViewer from "../webStatusPage/statusComponents/StatusViewer";

const CommunityStatusPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const community_slug = params?.community_slug as string;

  const { data: getCommunityDetail } =
    useGetSingleCommunityQuery(community_slug);

  const { data } = useGetStatusOfSpecificCommunityQuery({
    slug: community_slug,
  });

  const statuses = data?.payload || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="w-full h-screen relative overflow-hidden bg-black">
      <StatusHeader 
        item={getCommunityDetail?.payload} 
        onClose={() => router.push("/status")}
      />
      {statuses.length > 0 && (
        <StatusViewer
          status={statuses[currentIndex]}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          total={statuses.length}
          onClose={() => router.push("/status")}
          community_id={getCommunityDetail?.payload?.id}
        />
      )}
    </div>
  );
};

export default CommunityStatusPage;
