import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  useGetSingleCommunityQuery,
  useGetStatusOfSpecificCommunityQuery,
} from "@/redux/api/core/communitiesApi";
import StatusHeader from "./components/StatusHeader";
import StatusViewer from "./components/StatusViewer";

const CommunityStatusPage: React.FC = () => {
  const router = useRouter();
  const { community_slug } = useParams<{ community_slug: string }>();
  const { data: getCommunityDetail } = useGetSingleCommunityQuery(
    community_slug || ""
  );
  console.log(community_slug);
  const { data } = useGetStatusOfSpecificCommunityQuery({
    slug: community_slug || "",
  });

  const statuses = data?.payload || [];
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <div className="w-full h-screen relative overflow-hidden bg-black">
      <StatusHeader item={getCommunityDetail?.payload} />
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
