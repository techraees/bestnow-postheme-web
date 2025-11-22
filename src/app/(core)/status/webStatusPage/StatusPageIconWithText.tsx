import React from "react";

interface StatusPageIconWithTextProps {
  item: {
    icon: string;
    text?: string;
    notWidth?: boolean;
  };
}

const StatusPageIconWithText: React.FC<StatusPageIconWithTextProps> = ({
  item,
}) => {
  return (
    <div>
      <div className="flex items-center justify-center flex-col gap-1.5 font-roboto_font">
        <div className="flex items-center justify-center flex-col gap-2 rounded-full p-2 w-[48px] h-[48px]">
          <div className={`${item?.notWidth && "w-[24px] h-[24px]"}`}>
            <img
              src={item.icon}
              alt=""
              className="w-full h-full  shadow-2xl "
            />
          </div>
        </div>
        {item.text && (
          <div>
            <p className="text-[16px] text-shadow-lg/20 ">{item.text}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusPageIconWithText;
