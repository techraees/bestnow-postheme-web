import React, { ReactNode } from "react";

interface TopSpacingProps {
  children: ReactNode;
}

const TopSpacingWrapper: React.FC<TopSpacingProps> = ({ children }) => {
  return <div className="mt-[54px] lg:mt-[60px]">{children}</div>;
};

export default TopSpacingWrapper;
