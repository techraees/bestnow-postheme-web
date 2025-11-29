"use client";

import React, { useState } from "react";
import TopSpacingWrapper from "@/components/top-spacing/TopSpacing";
import SubHeader from "@/components/navigation/SubHeader";
import { ReplaceCard, ReplaceStatus } from "@/components/replace";

interface Replace {
  id: string;
  replaceId: string;
  time: string;
  status: ReplaceStatus;
  amount: string;
  date: string; // Format: "Today" or "12 Feb, 2025"
}

const replaces: Replace[] = [
  {
    id: "1",
    replaceId: "#RP34543",
    time: "03:42 PM",
    status: "in-progress",
    amount: "Rs. 3,451,560",
    date: "Today",
  },
  {
    id: "2",
    replaceId: "#RT34543",
    time: "03:42 PM",
    status: "complete",
    amount: "Rs. 3,451,560",
    date: "Today",
  },
  {
    id: "3",
    replaceId: "#RP34543",
    time: "03:42 PM",
    status: "complete",
    amount: "Rs. 3,451,560",
    date: "12 Feb, 2025",
  },
  {
    id: "4",
    replaceId: "#RT34543",
    time: "03:42 PM",
    status: "canceled",
    amount: "Rs. 3,451,560",
    date: "12 Feb, 2025",
  },
];

const ReplacePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter replaces based on search
  const filteredReplaces = replaces.filter((replace) =>
    replace.replaceId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group replaces by date
  const groupedReplaces = filteredReplaces.reduce((groups, replace) => {
    const date = replace.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(replace);
    return groups;
  }, {} as Record<string, Replace[]>);

  const handleReplaceClick = (replaceId: string) => {
    console.log("Replace clicked:", replaceId);
    // Navigate to replace details
  };

  return (
    <TopSpacingWrapper>
      <SubHeader title="Replace" subtitle="Done" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-4 md:py-6">
        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="max-w-5xl mx-auto">
            <div className="bg-light_mode_color1 dark:bg-dark_mode_color1 rounded-2xl shadow-lg p-8 lg:p-10">
              <div className="space-y-8">
                {Object.keys(groupedReplaces).length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 md:py-20">
                    <p className="text-light_mode_text dark:text-dark_mode_text text-lg md:text-xl font-medium mb-2">
                      No replaces found
                    </p>
                    <p className="text-light_mode_gray_color dark:text-dark_mode_gray_color text-sm md:text-base">
                      Try searching with different keywords
                    </p>
                  </div>
                ) : (
                  Object.entries(groupedReplaces).map(
                    ([date, dateReplaces]) => (
                      <div key={date} className="space-y-4">
                        {/* Date Separator */}
                        <div className="relative flex items-center justify-center py-2">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-light_mode_color3 dark:border-dark_mode_color3"></div>
                          </div>
                          <span className="relative bg-light_mode_color1 dark:bg-dark_mode_color1 px-4 text-light_mode_text dark:text-dark_mode_text text-base font-semibold">
                            {date}
                          </span>
                        </div>

                        {/* Replaces for this date */}
                        <div className="space-y-3">
                          {dateReplaces.map((replace, index) => (
                            <ReplaceCard
                              key={replace.id}
                              id={replace.id}
                              replaceId={replace.replaceId}
                              time={replace.time}
                              status={replace.status}
                              amount={replace.amount}
                              index={index + 1}
                              onClick={() => handleReplaceClick(replace.id)}
                            />
                          ))}
                        </div>
                      </div>
                    )
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          <div className="space-y-6 md:space-y-8">
            {Object.keys(groupedReplaces).length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 md:py-20">
                <p className="text-light_mode_text dark:text-dark_mode_text text-lg md:text-xl font-medium mb-2">
                  No replaces found
                </p>
                <p className="text-light_mode_gray_color dark:text-dark_mode_gray_color text-sm md:text-base">
                  Try searching with different keywords
                </p>
              </div>
            ) : (
              Object.entries(groupedReplaces).map(([date, dateReplaces]) => (
                <div key={date} className="space-y-3 md:space-y-4">
                  {/* Date Separator */}
                  <div className="relative flex items-center justify-center py-2">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-light_mode_color3 dark:border-dark_mode_color3"></div>
                    </div>
                    <span className="relative bg-light_mode_color dark:bg-dark_mode_color px-4 text-light_mode_text dark:text-dark_mode_text text-sm md:text-base font-medium">
                      {date}
                    </span>
                  </div>

                  {/* Replaces for this date */}
                  {dateReplaces.map((replace, index) => (
                    <ReplaceCard
                      key={replace.id}
                      id={replace.id}
                      replaceId={replace.replaceId}
                      time={replace.time}
                      status={replace.status}
                      amount={replace.amount}
                      index={index + 1}
                      onClick={() => handleReplaceClick(replace.id)}
                    />
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </TopSpacingWrapper>
  );
};

export default ReplacePage;
