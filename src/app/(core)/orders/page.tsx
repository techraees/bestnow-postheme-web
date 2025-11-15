"use client";

import React, { useState } from "react";
import TopSpacingWrapper from "@/components/top-spacing/TopSpacing";
import SubHeader from "@/components/navigation/SubHeader";
import {
  SummaryCard,
  TransactionCard,
  OrderSearchInput,
  TransactionStatus,
} from "@/components/orders";
import { FileText, DollarSign } from "lucide-react";
import { CalendarIcon, DollarIcon, RecordIcon } from "@/assets";
import SearchInput from "@/components/search/SearchInput";

interface Transaction {
  id: string;
  transactionId: string;
  time: string;
  status: TransactionStatus;
  amount: string;
  date: string; // Format: "Today" or "12 Feb, 2025"
}

const transactions: Transaction[] = [
  {
    id: "1",
    transactionId: "#TR34543",
    time: "03:42 PM",
    status: "in-progress",
    amount: "Rs. 3,451,560",
    date: "Today",
  },
  {
    id: "2",
    transactionId: "#TR34543",
    time: "03:42 PM",
    status: "complete",
    amount: "Rs. 3,451,560",
    date: "Today",
  },
  {
    id: "3",
    transactionId: "#TR34543",
    time: "03:42 PM",
    status: "complete",
    amount: "Rs. 3,451,560",
    date: "12 Feb, 2025",
  },
  {
    id: "4",
    transactionId: "#TR34543",
    time: "03:42 PM",
    status: "canceled",
    amount: "Rs. 3,451,560",
    date: "12 Feb, 2025",
  },
];

const OrdersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter transactions based on search
  const filteredTransactions = transactions.filter((transaction) =>
    transaction.transactionId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group transactions by date
  const groupedTransactions = filteredTransactions.reduce(
    (groups, transaction) => {
      const date = transaction.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
      return groups;
    },
    {} as Record<string, Transaction[]>
  );

  const totalInvoices = transactions.length.toString();
  const totalAmount = "Rs. 34,000";

  const handleCalendarClick = () => {
    console.log("Calendar clicked");
    // Implement date filter functionality
  };

  const handleTransactionClick = (transactionId: string) => {
    console.log("Transaction clicked:", transactionId);
    // Navigate to transaction details
  };

  return (
    <TopSpacingWrapper>
      <SubHeader title="Orders" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-4 md:py-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
          <SummaryCard
            icon={
              <RecordIcon className="w-6 h-6 md:w-7 md:h-7 text-light_mode_yellow_color dark:text-dark_mode_yellow_color" />
            }
            value={totalInvoices}
          />
          <SummaryCard
            icon={
              <DollarIcon className="w-6 h-6 md:w-7 md:h-7 text-light_mode_yellow_color dark:text-dark_mode_yellow_color" />
            }
            value={totalAmount}
          />
        </div>

        {/* Search Bar */}
        <div className="mb-4 md:mb-6 w-full flex gap-2 items-center justify-between">
          <div className=" flex-1">
            <SearchInput
              initialValue={searchQuery}
              onSearchChange={setSearchQuery}
              placeholder="Search invoice"
            />
          </div>
          <div className="bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-full h-[50px] w-[50px] flex items-center justify-center">
            <CalendarIcon className="w-6 h-6 md:w-7 md:h-7 text-light_mode_blue_color dark:text-dark_mode_blue_color" />
          </div>
        </div>

        {/* Transactions List */}
        <div className="space-y-6 md:space-y-8">
          {Object.keys(groupedTransactions).length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 md:py-20">
              <p className="text-light_mode_text dark:text-dark_mode_text text-lg md:text-xl font-medium mb-2">
                No transactions found
              </p>
              <p className="text-light_mode_gray_color dark:text-dark_mode_gray_color text-sm md:text-base">
                Try searching with different keywords
              </p>
            </div>
          ) : (
            Object.entries(groupedTransactions).map(
              ([date, dateTransactions]) => (
                <div key={date} className="space-y-3 md:space-y-4">
                  {/* Date Separator */}
                  <div className="relative flex items-center justify-center py-2">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-light_mode_color3 dark:border-dark_mode_color3"></div>
                    </div>
                    <span className="relative bg-light_mode_color dark:bg-dark_mode_color px-4 text-light_mode_text dark:text-dark_mode_text text-sm md:text-base font-medium">
                      {date}
                    </span>
                  </div>

                  {/* Transactions for this date */}
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
              )
            )
          )}
        </div>
      </div>
    </TopSpacingWrapper>
  );
};

export default OrdersPage;
