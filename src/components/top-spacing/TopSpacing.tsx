import React, { ReactNode } from "react";

interface TopSpacingProps {
  children: ReactNode;
  className?: string;
}

const TopSpacingWrapper: React.FC<TopSpacingProps> = ({
  children,
  className,
}) => {
  return (
    <div className={`mt-[54px] ${className} lg:mt-[60px]`}>{children}</div>
  );
};

export default TopSpacingWrapper;
