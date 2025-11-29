"use client";

import React, { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { Phone, Building2, MapPin, User } from "lucide-react";
import TopSpacingWrapper from "@/components/top-spacing/TopSpacing";
import SubHeader from "@/components/navigation/SubHeader";
import { OrderItem, OrderSummary } from "@/components/orders";
import { useGetOrderDetailsQuery } from "@/redux/api/core/orderApi";

interface OrderItemData {
  id: string;
  name: string;
  image: string;
  unitPrice: number;
  quantity: number;
}

const OrderDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const orderId = params?.id as string;

  // Fetch order details from API
  const {
    data: orderData,
    isLoading,
    error,
  } = useGetOrderDetailsQuery({ order_id: orderId });

  // Transform API response to order format
  const order = useMemo(() => {
    if (!orderData?.payload) return null;

    const payload = orderData.payload;
    const preorderItems = payload.preorderItems || [];

    // Parse date and time from createdAt
    const createdAt = payload.createdAt || "";
    const [datePart, timePart] = createdAt.split(" ");
    const date = datePart || "";
    const time = timePart || "";

    // Map status
    const status = mapStatusToOrderStatus(payload.status);

    // Transform items
    const items: OrderItemData[] = preorderItems.map(
      (item: any, index: number) => ({
        id: item.id?.toString() || index.toString(),
        name: item.product_name || "",
        image: item.image?.[0] || item.image || "",
        unitPrice: item.price_rate || 0,
        quantity: item.quantity || 0,
      })
    );

    return {
      id: payload.id?.toString() || orderId,
      orderId: payload.id?.toString() || orderId,
      date: date,
      time: time,
      items: items,
      total: payload.total_amount || 0,
      discount: 0,
      deliveryCharges: 0,
      totalPayable: payload.total_amount || 0,
      paid: payload.total_amount || 0,
      methodOfPayment: "Transfer",
      status: status,
      newBalance: 0,
      // Additional fields from API
      active_phone_number: payload.active_phone_number || "",
      city_name: payload.city_name || "",
      whole_address_of_customer: payload.whole_address_of_customer || "",
    };
  }, [orderData, orderId]);

  // Map API status to order status
  function mapStatusToOrderStatus(
    status: string
  ): "completed" | "in-progress" | "canceled" {
    const statusLower = status?.toLowerCase() || "";
    if (statusLower === "accepted" || statusLower === "completed")
      return "completed";
    if (statusLower === "pending") return "in-progress";
    if (statusLower === "canceled" || statusLower === "cancelled")
      return "canceled";
    return "in-progress";
  }

  const totalItems = order
    ? order.items.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  const handleViewScreenshot = () => {
    console.log("View screenshot clicked");
    // Navigate to screenshot view or open modal
  };

  const formatAmount = (amount: number) => {
    return `Rs. ${Math.abs(amount).toLocaleString("en-PK")}`;
  };

  if (isLoading) {
    return (
      <TopSpacingWrapper>
        <div className="min-h-[calc(100vh-180px)] bg-light_mode_color dark:bg-dark_mode_color w-full flex flex-col items-center justify-center py-16 md:py-20 lg:py-24">
          <div className="animate-spin rounded-full h-12 w-12 md:h-16 md:w-16 border-4 border-light_mode_color3 dark:border-dark_mode_color3 border-t-light_mode_yellow_color dark:border-t-dark_mode_yellow_color mb-4"></div>
          <p className="text-light_mode_text dark:text-dark_mode_text text-base md:text-lg lg:text-xl font-medium">
            Loading order details...
          </p>
        </div>
      </TopSpacingWrapper>
    );
  }

  if (error || !order) {
    return (
      <TopSpacingWrapper>
        <div className="min-h-[calc(100vh-180px)] bg-light_mode_color dark:bg-dark_mode_color w-full flex flex-col items-center justify-center py-16 md:py-20 lg:py-24">
          <div className="mb-4 md:mb-6">
            <svg
              className="w-16 h-16 md:w-20 md:h-20 mx-auto text-light_mode_gray_color dark:text-dark_mode_gray_color opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-light_mode_text dark:text-dark_mode_text text-lg md:text-xl lg:text-2xl font-semibold mb-2 md:mb-3">
            Order not found
          </p>
          <button
            onClick={() => router.push("/orders")}
            className="text-light_mode_blue_color dark:text-dark_mode_blue_color text-sm md:text-base hover:opacity-80 active:opacity-60 transition-opacity mt-2"
          >
            Back to Orders
          </button>
        </div>
      </TopSpacingWrapper>
    );
  }

  return (
    <TopSpacingWrapper>
      <SubHeader
        title={`Order ID (${order.orderId})`}
        subtitle={`${totalItems} Items`}
      />
      <div className="min-h-[calc(100vh-230px)] bg-light_mode_color dark:bg-dark_mode_color w-full pb-0 md:pb-0 lg:pb-0 relative">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-4 md:py-6 lg:py-8">
          {/* Two Column Layout for Desktop */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 pb-[200px] md:pb-0 lg:pb-0">
            {/* Left Column - Customer Info & Order Items (Scrollable on Desktop) */}
            <div className="w-full lg:w-2/3 space-y-6 md:space-y-8">
              {/* Order Date and Time */}
              <div className=" rounded-xl md:rounded-2xl p-0 md:p-6 lg:p-4">
                <p className="text-light_mode_gray_color dark:text-dark_mode_gray_color text-xs md:text-sm lg:text-base">
                  {order.date} {order.time}
                </p>
              </div>

              {/* Order Items Section */}
              <div className=" space-y-4 md:space-y-5">
                <h2 className="text-light_mode_text dark:text-dark_mode_text text-lg md:text-xl lg:text-2xl font-semibold mb-4 md:mb-6">
                  Order Items
                </h2>

                {order.items.length === 0 ? (
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
                      No items found
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2 md:space-y-3 lg:space-y-4">
                    {order.items.map((item) => (
                      <OrderItem
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        unitPrice={item.unitPrice}
                        quantity={item.quantity}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Order Summary (Fixed Bottom on Mobile, Fixed on Desktop) */}
            <div className="w-full lg:w-1/3 lg:hidden">
              <div className="fixed bottom-0 left-0 right-0 md:relative md:bottom-auto md:left-auto md:right-auto z-50 md:z-auto">
                <OrderSummary
                  total={order.total}
                  discount={order.discount}
                  deliveryCharges={order.deliveryCharges}
                  totalPayable={order.totalPayable}
                  paid={order.paid}
                  methodOfPayment={order.methodOfPayment}
                  status={order.status}
                  newBalance={order.newBalance}
                  onViewScreenshot={handleViewScreenshot}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Fixed Summary - Outside Container */}
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
                  {formatAmount(order.total)}
                </span>
              </div>

              {order.discount !== 0 && (
                <div className="flex justify-between items-center text-sm md:text-base lg:text-lg">
                  <span className="text-light_mode_text dark:text-dark_mode_text font-medium">
                    Discount
                  </span>
                  <span className="text-green-500 dark:text-green-400 font-semibold">
                    -{formatAmount(order.discount)}
                  </span>
                </div>
              )}

              {order.deliveryCharges !== 0 && (
                <div className="flex justify-between items-center text-sm md:text-base lg:text-lg">
                  <span className="text-light_mode_text dark:text-dark_mode_text font-medium">
                    Delivery
                  </span>
                  <span className="text-light_mode_text dark:text-dark_mode_text font-semibold">
                    {formatAmount(order.deliveryCharges)}
                  </span>
                </div>
              )}

              <div className="border-t border-light_mode_color3 dark:border-dark_mode_color3 my-2 md:my-3 pt-3 md:pt-4"></div>

              <div className="flex justify-between items-center">
                <span className="text-light_mode_text dark:text-dark_mode_text font-bold text-base md:text-lg lg:text-xl">
                  Total Payable
                </span>
                <span className="text-light_mode_text dark:text-dark_mode_text font-bold text-base md:text-lg lg:text-xl">
                  {formatAmount(order.totalPayable)}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm md:text-base lg:text-lg">
                <span className="text-light_mode_text dark:text-dark_mode_text font-medium">
                  Paid
                </span>
                <span className="text-light_mode_text dark:text-dark_mode_text font-semibold">
                  {formatAmount(order.paid)}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm md:text-base lg:text-lg">
                <span className="text-light_mode_text dark:text-dark_mode_text font-medium">
                  MOP
                </span>
                <span className="text-light_mode_text dark:text-dark_mode_text font-semibold">
                  {order.methodOfPayment}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm md:text-base lg:text-lg">
                <span className="text-light_mode_text dark:text-dark_mode_text font-medium">
                  Status
                </span>
                <span
                  className={`font-semibold ${
                    order.status === "completed"
                      ? "text-green-500 dark:text-green-400"
                      : order.status === "canceled"
                      ? "text-red-500 dark:text-red-400"
                      : "text-light_mode_yellow_color dark:text-dark_mode_yellow_color"
                  }`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>

              {order.newBalance !== 0 && (
                <div className="flex justify-between items-center text-sm md:text-base lg:text-lg">
                  <span className="text-light_mode_text dark:text-dark_mode_text font-medium">
                    New Balance
                  </span>
                  <span className="text-light_mode_blue_color dark:text-dark_mode_blue_color font-semibold">
                    {formatAmount(order.newBalance)}
                  </span>
                </div>
              )}

              {handleViewScreenshot && (
                <button
                  onClick={handleViewScreenshot}
                  className="w-full bg-light_mode_yellow_color dark:bg-dark_mode_yellow_color hover:opacity-90 active:opacity-80 text-dark_mode_color dark:text-light_mode_text font-bold py-3 md:py-4 lg:py-5 rounded-2xl text-sm md:text-base lg:text-lg transition-all active:scale-[0.98] shadow-lg hover:shadow-xl mt-4 md:mt-6"
                >
                  View Screenshot
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </TopSpacingWrapper>
  );
};

export default OrderDetailPage;
