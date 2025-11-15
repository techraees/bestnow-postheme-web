"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TopSpacingWrapper from "@/components/top-spacing/TopSpacing";
import SubHeader from "@/components/navigation/SubHeader";
import { AddressCard, AddAddressCard } from "@/components/profile";

interface Address {
  id: string;
  label: string;
  type: "home" | "shop" | "work" | "other";
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
}

const sampleAddresses: Address[] = [
  {
    id: "1",
    label: "My Home Address",
    type: "home",
    addressLine1:
      "House no 130, street no.3 walantia town near meezan bank, Gulberg 3, Lahore",
    city: "Lahore",
    state: "Punjab",
    postalCode: "52964",
  },
  {
    id: "2",
    label: "My Shop Address",
    type: "shop",
    addressLine1:
      "Shop no 4, Floor no.3 walantia town near meezan bank, Gulberg 3, Lahore",
    city: "Lahore",
    state: "Punjab",
    postalCode: "52964",
  },
];

const AddressPage = () => {
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>(sampleAddresses);

  const handleAddAddress = () => {
    router.push("/profile/address/new");
  };

  const handleEditAddress = (id: string) => {
    router.push(`/profile/address/edit/${id}`);
  };

  return (
    <TopSpacingWrapper>
      <SubHeader title="Address" subtitle="Done" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 md:py-8">
        <div className="space-y-3 md:space-y-4">
          {/* Add New Address Card */}
          <AddAddressCard onClick={handleAddAddress} />

          {/* Address List */}
          {addresses.map((address, index) => (
            <AddressCard
              key={address.id}
              id={address.id}
              index={index + 1}
              label={address.label}
              type={address.type}
              addressLine1={address.addressLine1}
              addressLine2={address.addressLine2}
              city={address.city}
              state={address.state}
              postalCode={address.postalCode}
              onEdit={() => handleEditAddress(address.id)}
            />
          ))}
        </div>
      </div>
    </TopSpacingWrapper>
  );
};

export default AddressPage;
