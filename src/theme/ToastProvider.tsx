"use client";

import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider() {
  const { theme_mode } = useSelector((state: any) => state.coreAppSlice);

  return (
    <ToastContainer
      theme={theme_mode === "dark" ? "dark" : "light"}
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
}
