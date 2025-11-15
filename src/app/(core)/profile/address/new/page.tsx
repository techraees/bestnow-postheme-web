"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TopSpacingWrapper from "@/components/top-spacing/TopSpacing";
import { AddressForm, AddressSuccessModal } from "@/components/profile";
import { ChevronLeft } from "lucide-react";

const NewAddressPage = () => {
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [addressType, setAddressType] = useState("home");
  const [addressName, setAddressName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [cityState, setCityState] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = () => {
    // In production, save address to backend
    console.log("Address submitted:", {
      addressType,
      addressName,
      addressLine1,
      addressLine2,
      cityState,
      postalCode,
    });

    // Show success modal
    setShowSuccessModal(true);
  };

  const handleSuccessDone = () => {
    setShowSuccessModal(false);
    router.push("/profile/address");
  };

  return (
    <TopSpacingWrapper>
      <div className="bg-light_mode_color dark:bg-dark_mode_color">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-4 md:py-5 lg:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-0 md:gap-4">
              <button
                onClick={handleCancel}
                className="text-light_mode_text dark:text-dark_mode_text hover:opacity-80 active:opacity-60 transition-opacity rounded-full hover:bg-light_mode_color2 dark:hover:bg-dark_mode_color2 p-1"
                aria-label="Go back"
              >
                <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
              </button>
              <h1 className="text-light_mode_text dark:text-dark_mode_text text-xl md:text-2xl lg:text-3xl font-[500]">
                New Address
              </h1>
            </div>
            <button
              onClick={handleCancel}
              className="text-red-500 text-base md:text-lg font-medium hover:opacity-80 active:opacity-60 transition-opacity"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 md:py-8 pb-24 md:pb-8">
        <AddressForm
          addressType={addressType}
          onAddressTypeChange={setAddressType}
          addressName={addressName}
          onAddressNameChange={setAddressName}
          addressLine1={addressLine1}
          onAddressLine1Change={setAddressLine1}
          addressLine2={addressLine2}
          onAddressLine2Change={setAddressLine2}
          cityState={cityState}
          onCityStateChange={setCityState}
          postalCode={postalCode}
          onPostalCodeChange={setPostalCode}
          onSubmit={handleSubmit}
        />
      </div>

      {/* Fixed Bottom Done Button for Mobile */}
      <div className="fixed bottom-4 left-4 right-4 md:hidden">
        <button
          onClick={handleSubmit}
          disabled={!addressName || !addressLine1 || !cityState || !postalCode}
          className="w-full bg-light_mode_yellow_color dark:bg-dark_mode_yellow_color text-black dark:text-black py-4 rounded-2xl font-semibold text-base hover:opacity-90 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Done
        </button>
      </div>

      {/* Success Modal */}
      <AddressSuccessModal
        isOpen={showSuccessModal}
        onDone={handleSuccessDone}
      />
    </TopSpacingWrapper>
  );
};

export default NewAddressPage;

