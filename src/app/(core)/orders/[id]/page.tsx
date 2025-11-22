"use client";

import React, { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
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

  if (isLoading) {
    return (
      <TopSpacingWrapper>
        <div className="min-h-[calc(100vh-180px)] bg-light_mode_color dark:bg-dark_mode_color w-full flex flex-col items-center justify-center">
          <p className="text-light_mode_text dark:text-dark_mode_text text-lg md:text-xl font-medium">
            Loading order details...
          </p>
        </div>
      </TopSpacingWrapper>
    );
  }

  if (error || !order) {
    return (
      <TopSpacingWrapper>
        <div className="min-h-[calc(100vh-180px)] bg-light_mode_color dark:bg-dark_mode_color w-full flex flex-col items-center justify-center">
          <p className="text-light_mode_text dark:text-dark_mode_text text-lg md:text-xl font-medium mb-2">
            Order not found
          </p>
          <button
            onClick={() => router.push("/orders")}
            className="text-light_mode_blue_color dark:text-dark_mode_blue_color text-sm md:text-base hover:opacity-80"
          >
            Back to Orders
          </button>
        </div>
      </TopSpacingWrapper>
    );
  }

  return (
    <TopSpacingWrapper>
      <div className="min-h-[calc(100vh-180px)] bg-light_mode_color dark:bg-dark_mode_color w-full flex flex-col">
        {/* Header */}
        <SubHeader
          title={`Order ID (${order.orderId})`}
          subtitle={`${totalItems} Items`}
        />

        {/* Order Date and Time */}
        <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-12 pt-2 pb-4">
          <p className="text-light_mode_gray_color dark:text-dark_mode_gray_color text-sm md:text-base">
            {order.date} {order.time}
          </p>
        </div>

        {/* Order Items List - Scrollable */}
        <div className="max-w-[1600px] overflow-y-auto mx-auto h-[calc(100vh-500px)] w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-4 md:py-6">
          {order.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 md:py-20">
              <p className="text-light_mode_text dark:text-dark_mode_text text-lg md:text-xl font-medium mb-2">
                No items found
              </p>
            </div>
          ) : (
            <div className="space-y-1 md:space-y-4 lg:space-y-5 max-w-4xl mx-auto">
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

      {/* Fixed Bottom Summary */}
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
    </TopSpacingWrapper>
  );
};

export default OrderDetailPage;
