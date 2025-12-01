import { RootState } from "@/redux/store/store";
import { motion } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";
import { BestonDarkLogo, BestonLightLogo } from "@/assets";
import { THEME_DATA } from "@/data/coreData/coreData";

const TransparentLoadingSkeletal: React.FC = () => {
  const { theme_mode } = useSelector((state: RootState) => state.coreAppSlice);

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* 🟦 Blurred transparent background layer */}
      <div className="absolute inset-0 backdrop-blur-md bg-black/20" />

      {/* 🟨 Animated Logo */}
      <motion.img
        src={
          String(
            theme_mode === THEME_DATA.DARK ? BestonDarkLogo : BestonLightLogo
          )
        }
        alt="App Logo"
        className="w-20 h-20 relative z-10"
        animate={{
          scale: [0.5, 1.5, 0.5],
          opacity: [1, 1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

export default TransparentLoadingSkeletal;
