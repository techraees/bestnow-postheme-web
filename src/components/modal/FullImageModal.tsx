"use client";

import React, { useState } from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";
import { FullImageModalProps } from "./types";
import { X } from "lucide-react";

Modal.setAppElement("body");

const FullImageModal: React.FC<FullImageModalProps> = ({
    isOpen,
    onClose,
    imageUrl,
}) => {

    if (!isOpen) return null;

    return (
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={onClose}
                style={{
                    content: {
                        top: "50%",
                        left: "50%",
                        right: "auto",
                        bottom: "auto",
                        transform: "translate(-50%, -50%)",
                        width: "95%",
                        height: "95vh",
                        padding: 0,
                        border: "none",
                        background: "transparent",
                        overflow: "hidden",
                        borderRadius: "12px",
                    },
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.85)",
                        zIndex: 99999,
                    },
                }}
            >
                <motion.div
                    onClick={onClose}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    className="w-full h-full flex justify-center items-center relative"
                >
                    {/* Full Image */}
                    {imageUrl && (
                        <img
                            src={imageUrl}
                            alt="Full View"
                            onClick={(e) => e.stopPropagation()}
                            className="max-h-full max-w-full object-contain"
                        />
                    )}
                </motion.div>
            </Modal>
        </>
    );
};

export default FullImageModal;
