"use client";

import React from "react";
import { ChevronDown, Home, Store, Briefcase } from "lucide-react";

interface AddressFormProps {
  addressType: string;
  onAddressTypeChange: (type: string) => void;
  addressName: string;
  onAddressNameChange: (name: string) => void;
  addressLine1: string;
  onAddressLine1Change: (line1: string) => void;
  addressLine2: string;
  onAddressLine2Change: (line2: string) => void;
  cityState: string;
  onCityStateChange: (cityState: string) => void;
  postalCode: string;
  onPostalCodeChange: (code: string) => void;
  onSubmit: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({
  addressType,
  onAddressTypeChange,
  addressName,
  onAddressNameChange,
  addressLine1,
  onAddressLine1Change,
  addressLine2,
  onAddressLine2Change,
  cityState,
  onCityStateChange,
  postalCode,
  onPostalCodeChange,
  onSubmit,
}) => {
  const [showTypeDropdown, setShowTypeDropdown] = React.useState(false);

  const addressTypes = [
    { value: "home", label: "Home", icon: <Home className="w-4 h-4" /> },
    { value: "shop", label: "Shop", icon: <Store className="w-4 h-4" /> },
    { value: "work", label: "Work", icon: <Briefcase className="w-4 h-4" /> },
  ];

  const selectedType = addressTypes.find((type) => type.value === addressType) || addressTypes[0];

  return (
    <div className="space-y-4 md:space-y-5">
      {/* Address Type Dropdown */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowTypeDropdown(!showTypeDropdown)}
          className="w-full flex items-center justify-between p-4 bg-light_mode_color2 dark:bg-dark_mode_color2 text-light_mode_text dark:text-dark_mode_text placeholder:text-light_mode_gray_color dark:placeholder:text-dark_mode_gray_color border border-light_mode_color2 dark:border-dark_mode_color2 rounded-2xl text-left text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-light_mode_yellow_color dark:focus:ring-dark_mode_yellow_color"
        >
          <div className="flex items-center gap-2">
            <div className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color">
              {selectedType.icon}
            </div>
            <span>{selectedType.label}</span>
          </div>
          <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-light_mode_gray_color dark:text-dark_mode_gray_color" />
        </button>
        {showTypeDropdown && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-2xl border border-light_mode_color3 dark:border-dark_mode_color3 shadow-lg z-10">
            {addressTypes.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => {
                  onAddressTypeChange(type.value);
                  setShowTypeDropdown(false);
                }}
                className="w-full flex items-center gap-2 p-4 hover:bg-light_mode_color3 dark:hover:bg-dark_mode_color3 transition-colors first:rounded-t-2xl last:rounded-b-2xl"
              >
                <div className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color">
                  {type.icon}
                </div>
                <span className="text-light_mode_text dark:text-dark_mode_text text-sm md:text-base">
                  {type.label}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Address Name */}
      <input
        type="text"
        value={addressName}
        onChange={(e) => onAddressNameChange(e.target.value)}
        placeholder="Type name for your Address"
        className="w-full p-4 bg-light_mode_color2 dark:bg-dark_mode_color2 text-light_mode_text dark:text-dark_mode_text placeholder:text-light_mode_gray_color dark:placeholder:text-dark_mode_gray_color border border-light_mode_color2 dark:border-dark_mode_color2 rounded-2xl text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-light_mode_yellow_color dark:focus:ring-dark_mode_yellow_color"
      />

      {/* Address Line 1 */}
      <input
        type="text"
        value={addressLine1}
        onChange={(e) => onAddressLine1Change(e.target.value)}
        placeholder="Address line 1"
        className="w-full p-4 bg-light_mode_color2 dark:bg-dark_mode_color2 text-light_mode_text dark:text-dark_mode_text placeholder:text-light_mode_gray_color dark:placeholder:text-dark_mode_gray_color border border-light_mode_color2 dark:border-dark_mode_color2 rounded-2xl text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-light_mode_yellow_color dark:focus:ring-dark_mode_yellow_color"
      />

      {/* Address Line 2 */}
      <input
        type="text"
        value={addressLine2}
        onChange={(e) => onAddressLine2Change(e.target.value)}
        placeholder="Address line 2"
        className="w-full p-4 bg-light_mode_color2 dark:bg-dark_mode_color2 text-light_mode_text dark:text-dark_mode_text placeholder:text-light_mode_gray_color dark:placeholder:text-dark_mode_gray_color border border-light_mode_color2 dark:border-dark_mode_color2 rounded-2xl text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-light_mode_yellow_color dark:focus:ring-dark_mode_yellow_color"
      />

      {/* City, State and Postal Code */}
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        <input
          type="text"
          value={cityState}
          onChange={(e) => onCityStateChange(e.target.value)}
          placeholder="City, State"
          className="w-full p-4 bg-light_mode_color2 dark:bg-dark_mode_color2 text-light_mode_text dark:text-dark_mode_text placeholder:text-light_mode_gray_color dark:placeholder:text-dark_mode_gray_color border border-light_mode_color2 dark:border-dark_mode_color2 rounded-2xl text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-light_mode_yellow_color dark:focus:ring-dark_mode_yellow_color"
        />
        <input
          type="text"
          value={postalCode}
          onChange={(e) => onPostalCodeChange(e.target.value)}
          placeholder="Postal code"
          className="w-full p-4 bg-light_mode_color2 dark:bg-dark_mode_color2 text-light_mode_text dark:text-dark_mode_text placeholder:text-light_mode_gray_color dark:placeholder:text-dark_mode_gray_color border border-light_mode_color2 dark:border-dark_mode_color2 rounded-2xl text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-light_mode_yellow_color dark:focus:ring-dark_mode_yellow_color"
        />
      </div>

      {/* Done Button - Hidden on mobile, shown on desktop */}
      <button
        onClick={onSubmit}
        disabled={!addressName || !addressLine1 || !cityState || !postalCode}
        className="hidden md:block w-full bg-light_mode_yellow_color dark:bg-dark_mode_yellow_color text-black dark:text-black py-4 md:py-5 rounded-2xl font-semibold text-base md:text-lg hover:opacity-90 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Done
      </button>
    </div>
  );
};

export default AddressForm;

