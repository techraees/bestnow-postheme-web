"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
import { User, Phone, Building2, MapPin } from "lucide-react";
import TopSpacingWrapper from "@/components/top-spacing/TopSpacing";
import SubHeader from "@/components/navigation/SubHeader";
import CartItem from "@/components/cart/CartItem";
import {
  useGetCartQuery,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
} from "@/redux/api/core/cartApi";
import { selectUserProfile } from "@/redux/slice/coreSlice";
import { toast } from "react-toastify";
import CartItemSkeleton from "@/components/cart/CartItemSkeleton";
import { usePlaceOrderMutation } from "@/redux/api/core/orderApi";

// const checkoutSchema = z.object({
//   new_active_phone_number: z
//     .string()
//     .min(11, "Phone number must be exactly 11 digits")
//     .max(11, "Phone number must be exactly 11 digits")
//     .regex(/^\d{11}$/, "Phone number must contain exactly 11 digits"),
//   new_type_city: z.string().min(1, "City is required"),
//   whole_address_of_customer: z.string().min(1, "Address is required"),
// });

// type CheckoutFormData = z.infer<typeof checkoutSchema>;

const CheckoutPage = () => {
  const router = useRouter();

  const userProfile = useSelector(
    (state: any) => state.coreAppSlice.userProfile
  );
  const {
    data: cartData,
    isLoading: isCartLoading,
    refetch: refetchCart,
  } = useGetCartQuery();
  const [placeOrder, { isLoading: isPlacingOrder }] = usePlaceOrderMutation();
  const [items, setItems] = useState<any[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // Transform cart items
  useEffect(() => {
    if (cartData?.payload?.results || cartData?.payload?.items) {
      const cartItems = (
        cartData?.payload?.results ||
        cartData?.payload?.items ||
        []
      ).map((item: any) => ({
        id: item.id || item.cart_item_id || "",
        product_name: item.product_name || item.name || "",
        price_rate: item.price_rate || item.unitPrice || item.price || 0,
        quantity: item.quantity || item.item_quantity || 1,
        total_amount:
          item.total_amount ||
          (item.price_rate || item.unitPrice || item.price || 0) *
            (item.quantity || item.item_quantity || 1),
        image:
          item.image ||
          "https://adminapi.beston.co/uploads/products/commonImages/7646/images/RF_PARTS_____BOARD_FLEX_HUAWEI_Y6_20182.webp",
      }));
      setItems(cartItems);
    }
  }, [cartData]);

  // Set default phone number from profile if available
  useEffect(() => {
    if (userProfile?.phone) {
      setValue("new_active_phone_number", userProfile.phone);
    }
  }, [userProfile, setValue]);

  const handleQuantityChange = (id: string, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    refetchCart();
  };

  const handleUpdateSuccess = () => {
    refetchCart();
  };

  const onSubmit = async (data: any) => {
    try {
      const orderData = {
        new_active_phone_number: data.new_active_phone_number,
        new_type_city: data.new_type_city,
        whole_address_of_customer: data.whole_address_of_customer,
      };

      await placeOrder(orderData).unwrap();
      toast.success("Order placed successfully!");
      router.push("/orders");
    } catch (error: any) {
      toast.error(
        error?.data?.message || error?.message || "Failed to place order"
      );
    }
  };

  const total = items.reduce(
    (sum, item) => sum + item.price_rate * item.quantity,
    0
  );
  const previousBalance = cartData?.payload?.summary?.previous_balance || 0;
  const discount = 0;
  const deliveryCharges = 120;
  const totalPayable = total - discount + previousBalance;

  const formatPrice = (price: number) => {
    return `Rs. ${Math.abs(price).toLocaleString("en-PK")}`;
  };

  const userName = userProfile?.name || userProfile?.username || "";
  const userPhone = userProfile?.phone || "";

  return (
    <TopSpacingWrapper>
      <SubHeader title="Checkout" subtitle="" />
      <div className="min-h-[calc(100vh-230px)] bg-light_mode_color dark:bg-dark_mode_color w-full pb-0 md:pb-0 lg:pb-0 relative">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-4 md:py-6 lg:py-8">
          <form id="checkout-form" onSubmit={handleSubmit(onSubmit)}>
            {/* Two Column Layout for Desktop */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 pb-[200px] md:pb-0 lg:pb-0">
              {/* Left Column - Customer Info & Order Items (Scrollable on Desktop) */}
              <div className="w-full lg:w-2/3 space-y-6 md:space-y-8">
                {/* Customer Information Section */}
                <div className="lg:bg-light_mode_color1 lg:dark:bg-dark_mode_color1 rounded-xl md:rounded-2xl p-0 md:p-6 lg:p-8 space-y-4 md:space-y-5">
                  <h2 className="text-light_mode_text dark:text-dark_mode_text text-lg md:text-xl lg:text-2xl font-semibold mb-4 md:mb-6">
                    Customer Information
                  </h2>

                  {/* Name - Read Only */}
                  <div className="relative">
                    <span className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-light_mode_gray1_color dark:text-dark_mode_gray1_color pointer-events-none">
                      <User className="w-4 h-4 md:w-5 md:h-5" />
                    </span>
                    <input
                      type="text"
                      value={userName}
                      readOnly
                      disabled
                      className="w-full rounded-lg md:rounded-xl border py-2.5 md:py-3 lg:py-3.5 pl-9 md:pl-11 pr-4 text-sm md:text-base text-light_mode_text dark:text-dark_mode_text bg-light_mode_color dark:bg-dark_mode_color border-light_mode_color3 dark:border-dark_mode_color3 opacity-60 cursor-not-allowed"
                      placeholder="Name"
                    />
                  </div>

                  {/* Phone - Read Only */}
                  <div className="relative">
                    <span className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-light_mode_gray1_color dark:text-dark_mode_gray1_color pointer-events-none">
                      <Phone className="w-4 h-4 md:w-5 md:h-5" />
                    </span>
                    <input
                      type="text"
                      value={userPhone}
                      readOnly
                      disabled
                      className="w-full rounded-lg md:rounded-xl border py-2.5 md:py-3 lg:py-3.5 pl-9 md:pl-11 pr-4 text-sm md:text-base text-light_mode_text dark:text-dark_mode_text bg-light_mode_color dark:bg-dark_mode_color border-light_mode_color3 dark:border-dark_mode_color3 opacity-60 cursor-not-allowed"
                      placeholder="Phone Number"
                    />
                  </div>

                  {/* Actual Phone Number - Editable */}
                  <div className="relative">
                    <span className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-light_mode_gray1_color dark:text-dark_mode_gray1_color pointer-events-none">
                      <Phone className="w-4 h-4 md:w-5 md:h-5" />
                    </span>
                    <input
                      type="text"
                      {...register("new_active_phone_number")}
                      className={`w-full rounded-lg md:rounded-xl border py-2.5 md:py-3 lg:py-3.5 pl-9 md:pl-11 pr-4 text-sm md:text-base text-light_mode_text dark:text-dark_mode_text placeholder:text-light_mode_gray_color dark:placeholder:text-dark_mode_gray_color bg-light_mode_color dark:bg-dark_mode_color ${
                        errors.new_active_phone_number
                          ? "border-2 !border-light_mode_red_color dark:!border-dark_mode_red_color focus:!border-light_mode_red_color dark:focus:!border-dark_mode_red_color focus:!ring-0"
                          : "border-light_mode_color3 dark:border-dark_mode_color3 focus:outline-none focus:ring-2 focus:ring-light_mode_yellow_color dark:focus:ring-dark_mode_yellow_color focus:border-light_mode_yellow_color dark:focus:border-dark_mode_yellow_color"
                      }`}
                      placeholder="Enter actual phone number"
                      maxLength={11}
                    />
                    {errors.new_active_phone_number && (
                      <span className="text-xs md:text-sm text-red-500 mt-1 ml-1 block">
                        {errors.new_active_phone_number?.message as string}
                      </span>
                    )}
                  </div>

                  {/* City - Editable */}
                  <div className="relative">
                    <span className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-light_mode_gray1_color dark:text-dark_mode_gray1_color pointer-events-none">
                      <Building2 className="w-4 h-4 md:w-5 md:h-5" />
                    </span>
                    <input
                      type="text"
                      {...register("new_type_city")}
                      className={`w-full rounded-lg md:rounded-xl border py-2.5 md:py-3 lg:py-3.5 pl-9 md:pl-11 pr-4 text-sm md:text-base text-light_mode_text dark:text-dark_mode_text placeholder:text-light_mode_gray_color dark:placeholder:text-dark_mode_gray_color bg-light_mode_color dark:bg-dark_mode_color ${
                        errors.new_type_city
                          ? "border-2 !border-light_mode_red_color dark:!border-dark_mode_red_color focus:!border-light_mode_red_color dark:focus:!border-dark_mode_red_color focus:!ring-0"
                          : "border-light_mode_color3 dark:border-dark_mode_color3 focus:outline-none focus:ring-2 focus:ring-light_mode_yellow_color dark:focus:ring-dark_mode_yellow_color focus:border-light_mode_yellow_color dark:focus:border-dark_mode_yellow_color"
                      }`}
                      placeholder="City"
                    />
                    {errors.new_type_city && (
                      <span className="text-xs md:text-sm text-red-500 mt-1 ml-1 block">
                        {errors.new_type_city.message as string}
                      </span>
                    )}
                  </div>

                  {/* Address - Editable */}
                  <div className="relative">
                    <span className="absolute left-3 md:left-4 top-3 md:top-4 text-light_mode_gray1_color dark:text-dark_mode_gray1_color pointer-events-none">
                      <MapPin className="w-4 h-4 md:w-5 md:h-5" />
                    </span>
                    <textarea
                      {...register("whole_address_of_customer")}
                      rows={3}
                      className={`w-full rounded-lg md:rounded-xl border py-2.5 md:py-3 lg:py-3.5 pl-9 md:pl-11 pr-4 text-sm md:text-base text-light_mode_text dark:text-dark_mode_text placeholder:text-light_mode_gray_color dark:placeholder:text-dark_mode_gray_color bg-light_mode_color dark:bg-dark_mode_color resize-none ${
                        errors.whole_address_of_customer
                          ? "border-2 !border-light_mode_red_color dark:!border-dark_mode_red_color focus:!border-light_mode_red_color dark:focus:!border-dark_mode_red_color focus:!ring-0"
                          : "border-light_mode_color3 dark:border-dark_mode_color3 focus:outline-none focus:ring-2 focus:ring-light_mode_yellow_color dark:focus:ring-dark_mode_yellow_color focus:border-light_mode_yellow_color dark:focus:border-dark_mode_yellow_color"
                      }`}
                      placeholder="Enter complete address"
                    />
                    {errors.whole_address_of_customer && (
                      <span className="text-xs md:text-sm text-red-500 mt-1 ml-1 block">
                        {errors.whole_address_of_customer.message as string}
                      </span>
                    )}
                  </div>
                </div>

                {/* Cart Items Section */}
                <div className="lg:bg-light_mode_color1 lg:dark:bg-dark_mode_color1 rounded-xl md:rounded-2xl p-0 md:p-6 lg:p-8 space-y-4 md:space-y-5">
                  <h2 className="text-light_mode_text dark:text-dark_mode_text text-lg md:text-xl lg:text-2xl font-semibold mb-4 md:mb-6">
                    Order Items
                  </h2>

                  {isCartLoading ? (
                    <div className="space-y-2 md:space-y-3 lg:space-y-4">
                      {Array.from({ length: 3 }).map((_, index) => (
                        <CartItemSkeleton key={`skeleton-${index}`} />
                      ))}
                    </div>
                  ) : items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 md:py-12">
                      <svg
                        className="w-16 h-16 md:w-20 md:h-20 text-light_mode_gray_color dark:text-dark_mode_gray_color opacity-50 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                      <p className="text-light_mode_text dark:text-dark_mode_text text-base md:text-lg font-medium">
                        No items in cart
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2 md:space-y-3 lg:space-y-4">
                      {items.map((item) => (
                        <CartItem
                          key={item.id}
                          id={item.id}
                          name={item.product_name}
                          image={item.image}
                          unitPrice={item.price_rate}
                          quantity={item.quantity}
                          onQuantityChange={handleQuantityChange}
                          onRemove={handleRemoveItem}
                          onUpdateSuccess={handleUpdateSuccess}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Order Summary (Fixed Bottom on Mobile, Fixed on Desktop) */}
              <div className="w-full lg:w-1/3 lg:hidden">
                {items.length > 0 && (
                  <div className="fixed bottom-0 left-0 right-0 md:relative md:bottom-auto md:left-auto md:right-auto z-50 md:z-auto">
                    <div className="bg-light_mode_color1 dark:bg-dark_mode_color1 rounded-t-2xl md:rounded-xl p-4 md:p-6 lg:p-8 space-y-4 md:space-y-5 shadow-2xl md:shadow-none border-t border-light_mode_color3 dark:border-dark_mode_color3 md:border-t-0">
                      <h2 className="text-light_mode_text dark:text-dark_mode_text text-lg md:text-xl lg:text-2xl font-semibold mb-4 md:mb-6">
                        Order Summary
                      </h2>

                      <div className="space-y-3 md:space-y-4">
                        <div className="flex justify-between items-center text-sm md:text-base lg:text-lg">
                          <span className="text-light_mode_text dark:text-dark_mode_text font-medium">
                            Sub Total
                          </span>
                          <span className="text-light_mode_text dark:text-dark_mode_text font-semibold">
                            {formatPrice(total)}
                          </span>
                        </div>

                        {previousBalance !== 0 && (
                          <div className="flex justify-between items-center text-sm md:text-base lg:text-lg">
                            <span className="text-light_mode_text dark:text-dark_mode_text font-medium">
                              Prev. Bal
                            </span>
                            <span
                              className={`font-semibold ${
                                previousBalance < 0
                                  ? "text-red-500 dark:text-red-400"
                                  : "text-light_mode_text dark:text-dark_mode_text"
                              }`}
                            >
                              {formatPrice(previousBalance)}
                            </span>
                          </div>
                        )}

                        {discount !== 0 && (
                          <div className="flex justify-between items-center text-sm md:text-base lg:text-lg">
                            <span className="text-light_mode_text dark:text-dark_mode_text font-medium">
                              Discount
                            </span>
                            <span className="text-green-500 dark:text-green-400 font-semibold">
                              -{formatPrice(discount)}
                            </span>
                          </div>
                        )}

                        <div className="border-t border-light_mode_color3 dark:border-dark_mode_color3 my-2 md:my-3 pt-3 md:pt-4"></div>

                        <div className="flex justify-between items-center">
                          <span className="text-light_mode_text dark:text-dark_mode_text font-bold text-base md:text-lg lg:text-xl">
                            Total Payable
                          </span>
                          <span className="text-light_mode_text dark:text-dark_mode_text font-bold text-base md:text-lg lg:text-xl">
                            {formatPrice(totalPayable)}
                          </span>
                        </div>
                      </div>

                      {/* Place Order Button */}
                      <button
                        type="submit"
                        disabled={isPlacingOrder || isCartLoading}
                        className="w-full bg-light_mode_yellow_color dark:bg-dark_mode_yellow_color hover:opacity-90 active:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed text-dark_mode_color dark:text-light_mode_text font-bold py-3 md:py-4 lg:py-5 rounded-xl md:rounded-2xl text-sm md:text-base lg:text-lg transition-all active:scale-[0.98] shadow-lg hover:shadow-xl mt-4 md:mt-6"
                      >
                        {isPlacingOrder ? "Placing Order..." : "Place Order"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Desktop Fixed Summary - Outside Container */}
        {items.length > 0 && (
          <div className="hidden lg:block fixed top-[calc(120px+1.5rem)] right-[max(1.5rem,calc((100vw-1600px)/2+1.5rem))] w-[calc((1600px-2rem)*0.333)] max-w-md z-40">
            <div className="bg-light_mode_color1 dark:bg-dark_mode_color1 rounded-2xl p-6 lg:p-8 space-y-4 md:space-y-5 shadow-2xl">
              <h2 className="text-light_mode_text dark:text-dark_mode_text text-lg md:text-xl lg:text-2xl font-semibold mb-4 md:mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 md:space-y-4">
                <div className="flex justify-between items-center text-sm md:text-base lg:text-lg">
                  <span className="text-light_mode_text dark:text-dark_mode_text font-medium">
                    Sub Total
                  </span>
                  <span className="text-light_mode_text dark:text-dark_mode_text font-semibold">
                    {formatPrice(total)}
                  </span>
                </div>

                {previousBalance !== 0 && (
                  <div className="flex justify-between items-center text-sm md:text-base lg:text-lg">
                    <span className="text-light_mode_text dark:text-dark_mode_text font-medium">
                      Prev. Bal
                    </span>
                    <span
                      className={`font-semibold ${
                        previousBalance < 0
                          ? "text-red-500 dark:text-red-400"
                          : "text-light_mode_text dark:text-dark_mode_text"
                      }`}
                    >
                      {formatPrice(previousBalance)}
                    </span>
                  </div>
                )}

                {discount !== 0 && (
                  <div className="flex justify-between items-center text-sm md:text-base lg:text-lg">
                    <span className="text-light_mode_text dark:text-dark_mode_text font-medium">
                      Discount
                    </span>
                    <span className="text-green-500 dark:text-green-400 font-semibold">
                      -{formatPrice(discount)}
                    </span>
                  </div>
                )}

                <div className="border-t border-light_mode_color3 dark:border-dark_mode_color3 my-2 md:my-3 pt-3 md:pt-4"></div>

                <div className="flex justify-between items-center">
                  <span className="text-light_mode_text dark:text-dark_mode_text font-bold text-base md:text-lg lg:text-xl">
                    Total Payable
                  </span>
                  <span className="text-light_mode_text dark:text-dark_mode_text font-bold text-base md:text-lg lg:text-xl">
                    {formatPrice(totalPayable)}
                  </span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                form="checkout-form"
                disabled={isPlacingOrder || isCartLoading}
                className="w-full bg-light_mode_yellow_color dark:bg-dark_mode_yellow_color hover:opacity-90 active:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed text-dark_mode_color dark:text-light_mode_text font-bold py-3 md:py-4 lg:py-5 rounded-2xl text-sm md:text-base lg:text-lg transition-all active:scale-[0.98] shadow-lg hover:shadow-xl mt-4 md:mt-6"
              >
                {isPlacingOrder ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </div>
        )}
      </div>
    </TopSpacingWrapper>
  );
};

export default CheckoutPage;
