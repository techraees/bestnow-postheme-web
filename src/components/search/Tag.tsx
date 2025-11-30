import React from "react";

interface TagProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const Tag: React.FC<TagProps> = ({ children, onClick }) => {
  return (
    <li
      onClick={onClick}
      className="px-5 lg:px-6 py-2 lg:py-1 cursor-pointer text-light_mode_text
                 dark:text-dark_mode_text text-sm md:text-base lg:text-lg
                 hover:bg-light_mode_color2 dark:hover:bg-dark_mode_color2
                  transition-colors duration-200 text-nowrap border rounded-full"
    >
      {children}
    </li>
  );
};

export default Tag;
