import { ActionButton } from "@/components/action-buttons";
import Image from "next/image";
import React from "react";

const MenuGrid = ({ data }: { data: any }) => {
  return (
    <div>
      <div className="w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 lg:gap-5">
          {data.map((item: any, index: number) => (
            <ActionButton
              key={item.label || index}
              icon={item.icon}
              label={item.label}
              onClick={item.onClick}
              badge={item.badge}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuGrid;
