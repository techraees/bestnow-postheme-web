'use client'

import { THEME_DATA } from "@/data/coreData/coreData";
import { RootState } from "@/redux/store/store";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { BestonDarkLogo, BestonLightLogo } from "@/assets";

const MotionImage = motion(Image);

const SplashScreen: React.FC = () => {
  const { theme_mode } = useSelector((state: RootState) => state.coreAppSlice);

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-screen dark:bg-dark_mode_color bg-light_mode_color relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <MotionImage
        src={theme_mode === THEME_DATA.DARK ? BestonDarkLogo : BestonLightLogo}
        alt="App Logo"
        width={100}
        height={100}
        className="w-20 h-20 z-10"
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

export default SplashScreen;
