"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import TopSpacingWrapper from "@/components/top-spacing/TopSpacing";
import SubHeader from "@/components/navigation/SubHeader";
import {
  SummaryCard,
  TransactionCard,
  TransactionStatus,
} from "@/components/orders";
import { CalendarIcon, DollarIcon, RecordIcon } from "@/assets";
import SearchInput from "@/components/search/SearchInput";
import {
  useGetOrdersQuery,
  useOpenBalanceOrOrderCountQuery,
} from "@/redux/api/core/orderApi";

interface Transaction {
  id: string;
  transactionId: string;
  time: string;
  status: TransactionStatus;
  amount: string;
  date: string;
}

const OrdersPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Call APIs
  const { data: openingBalanceData, isLoading: isOpeningBalanceLoading } =
    useOpenBalanceOrOrderCountQuery({ entity_type: "opening_balance" });

  const { data: ordersData, isLoading: isOrdersLoading } = useGetOrdersQuery();

  // Extract opening balance value
  console.log("openingBalanceData", openingBalanceData);
  const openingBalance = openingBalanceData?.payload || 0;

  // Extract orders count and results
  const ordersCount = ordersData?.payload?.count || 0;
  const ordersResults = ordersData?.payload?.results || [];

  // Transform API response to Transaction format
  const transactions: Transaction[] = useMemo(() => {
    const allTransactions: Transaction[] = [];

    ordersResults.forEach((dateGroup: any) => {
      const date = dateGroup.date_time || "";
      const orders = dateGroup.data || [];

      orders.forEach((order: any) => {
        allTransactions.push({
          id: order.id?.toString() || "",
          transactionId: `#${order.id || ""}`,
          time: order.createdAtTime || "",
          status: mapStatusToTransactionStatus(order.status),
          amount: `Rs. ${(order.total_amount || 0).toLocaleString("en-PK")}`,
          date: date,
        });
      });
    });

    return allTransactions;
  }, [ordersResults]);

  // Filter transactions based on search
  const filteredTransactions = useMemo(() => {
    if (!searchQuery) return transactions;
    return transactions.filter((transaction) =>
      transaction.transactionId
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [transactions, searchQuery]);

  // Group transactions by date
  const groupedTransactions = useMemo(() => {
    return filteredTransactions.reduce((groups, transaction) => {
      const date = transaction.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
      return groups;
    }, {} as Record<string, Transaction[]>);
  }, [filteredTransactions]);

  const totalInvoices = ordersCount.toString();
  // Yeh nan return kar raha hai
  // openingBalance string hai, is ko number banana zaruri hai warna NaN aayega
  let openingBalanceNum = 0;
  if (typeof openingBalance === "string") {
    // Remove commas, spaces etc.
    const cleaned = openingBalance.replace(/,/g, "").trim();
    openingBalanceNum = Number(cleaned);
  } else if (typeof openingBalance === "number") {
    openingBalanceNum = openingBalance;
  }

  const totalAmount = !isNaN(openingBalanceNum)
    ? `Rs. ${openingBalanceNum < 0 ? "-" : ""}${Math.abs(
        openingBalanceNum
      ).toLocaleString("en-PK")}`
    : "Rs. 0";
  console.log("totalAmount", totalAmount);

  // Map API status to TransactionStatus
  function mapStatusToTransactionStatus(status: string): TransactionStatus {
    const statusLower = status?.toLowerCase() || "";
    if (statusLower === "pending") return "in-progress";
    if (statusLower === "accepted" || statusLower === "completed")
      return "complete";
    if (statusLower === "canceled" || statusLower === "cancelled")
      return "canceled";
    return "in-progress";
  }

  const handleCalendarClick = () => {
    console.log("Calendar clicked");
    // Implement date filter functionality
  };

  const handleTransactionClick = (transactionId: string) => {
    // Extract order ID from transactionId (format: #12345)
    const orderId = transactionId.replace("#", "");
    router.push(`/orders/${orderId}`);
  };

  const isLoading = isOpeningBalanceLoading || isOrdersLoading;

  return (
    <TopSpacingWrapper>
      <SubHeader
        title="Orders"
        subtitle={
          filteredTransactions.length > 0
            ? `${filteredTransactions.length} ${
                filteredTransactions.length === 1 ? "order" : "orders"
              }`
            : ""
        }
      />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-4 md:py-6 lg:py-8 pb-8 md:pb-12 lg:pb-16">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-5 mb-4 md:mb-6 lg:mb-8">
          <SummaryCard
            icon={
              <RecordIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-light_mode_yellow_color dark:text-dark_mode_yellow_color" />
            }
            value={isLoading ? "..." : totalInvoices}
          />
          <SummaryCard
            icon={
              <DollarIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-light_mode_yellow_color dark:text-dark_mode_yellow_color" />
            }
            value={isLoading ? "..." : totalAmount}
          />
        </div>

        {/* Search Bar */}
        <div className="mb-4 md:mb-6 lg:mb-8 w-full flex flex-row gap-3 md:gap-4 items-stretch sm:items-center">
          <div className="flex-1">
            <SearchInput
              initialValue={searchQuery}
              onSearchChange={setSearchQuery}
              placeholder="Search by invoice number..."
            />
          </div>
          <button
            onClick={handleCalendarClick}
            className="bg-light_mode_color2 dark:bg-dark_mode_color2 hover:bg-light_mode_color3 dark:hover:bg-dark_mode_color3 rounded-full h-[50px] w-[50px] md:h-[56px] md:w-[56px] flex items-center justify-center transition-colors active:scale-95 shrink-0"
            aria-label="Filter by date"
          >
            <CalendarIcon className="w-5 h-5 md:w-6 md:h-6 text-light_mode_blue_color dark:text-dark_mode_blue_color" />
          </button>
        </div>

        {/* Transactions List */}
        <div className="space-y-4 md:space-y-6 lg:space-y-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16 md:py-20 lg:py-24">
              <div className="animate-spin rounded-full h-12 w-12 md:h-16 md:w-16 border-4 border-light_mode_color3 dark:border-dark_mode_color3 border-t-light_mode_yellow_color dark:border-t-dark_mode_yellow_color mb-4"></div>
              <p className="text-light_mode_text dark:text-dark_mode_text text-base md:text-lg lg:text-xl font-medium mb-2">
                Loading orders...
              </p>
            </div>
          ) : Object.keys(groupedTransactions).length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 md:py-20 lg:py-24">
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <p className="text-light_mode_text dark:text-dark_mode_text text-lg md:text-xl lg:text-2xl font-semibold mb-2 md:mb-3">
                {searchQuery ? "No orders found" : "No orders yet"}
              </p>
              <p className="text-light_mode_gray_color dark:text-dark_mode_gray_color text-sm md:text-base text-center max-w-md px-4">
                {searchQuery
                  ? `No orders match "${searchQuery}". Try searching with different keywords.`
                  : "Your orders will appear here once you place them."}
              </p>
            </div>
          ) : (
            Object.entries(groupedTransactions).map(
              ([date, dateTransactions]) => (
                <div key={date} className="space-y-3 md:space-y-4 lg:space-y-5">
                  {/* Date Separator */}
                  <div className="relative flex items-center justify-center py-2 md:py-3">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-light_mode_color3 dark:border-dark_mode_color3"></div>
                    </div>
                    <span className="relative bg-light_mode_color dark:bg-dark_mode_color px-3 md:px-4 lg:px-6 text-light_mode_text dark:text-dark_mode_text text-xs md:text-sm lg:text-base font-semibold">
                      {date}
                    </span>
                  </div>

                  {/* Transactions for this date */}
                  <div className="space-y-2 md:space-y-3">
                    {dateTransactions.map((transaction, index) => (
                      <TransactionCard
                        key={transaction.id}
                        id={transaction.id}
                        transactionId={transaction.transactionId}
                        time={transaction.time}
                        status={transaction.status}
                        amount={transaction.amount}
                        index={index + 1}
                        onClick={() => handleTransactionClick(transaction.id)}
                      />
                    ))}
                  </div>
                </div>
              )
            )
          )}
        </div>
      </div>
    </TopSpacingWrapper>
  );
};

export default OrdersPage;
