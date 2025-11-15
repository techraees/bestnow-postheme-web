"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TopSpacingWrapper from "@/components/top-spacing/TopSpacing";
import {
  LedgerTransactionCard,
  ClosingBalanceCard,
  DebitCreditCard,
} from "@/components/ledger";
import SearchInput from "@/components/search/SearchInput";
import { MoreVertical, ChevronLeft } from "lucide-react";

interface LedgerTransaction {
  id: string;
  transactionId: string;
  time: string;
  paymentType: string; // "Transfer" or "Cash"
  amount: string;
  date: string; // Format: "Today" or "12 Feb, 2025"
}

const transactions: LedgerTransaction[] = [
  {
    id: "1",
    transactionId: "#TR34543",
    time: "03:42 PM",
    paymentType: "Transfer",
    amount: "Rs. 3,451,560",
    date: "Today",
  },
  {
    id: "2",
    transactionId: "#TR34543",
    time: "03:42 PM",
    paymentType: "Cash",
    amount: "Rs. 3,451,560",
    date: "Today",
  },
  {
    id: "3",
    transactionId: "#TR34543",
    time: "03:42 PM",
    paymentType: "Transfer",
    amount: "Rs. 3,451,560",
    date: "12 Feb, 2025",
  },
  {
    id: "4",
    transactionId: "#TR34543",
    time: "03:42 PM",
    paymentType: "Transfer",
    amount: "Rs. 3,451,560",
    date: "12 Feb, 2025",
  },
];

const LedgerPage = () => {
  const router = useRouter();
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
    {} as Record<string, LedgerTransaction[]>
  );

  const closingBalance = "Rs 720,250";
  const debitAmount = "Rs 2,600";
  const creditAmount = "Rs 125,000";

  const handleMenuClick = () => {
    console.log("Menu clicked");
    // Open menu or filter options
  };

  const handleTransactionClick = (transactionId: string) => {
    console.log("Transaction clicked:", transactionId);
    // Navigate to transaction details
  };

  return (
    <TopSpacingWrapper>
      {/* Header with Menu Icon */}
      <div className="bg-light_mode_color dark:bg-dark_mode_color">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-4 md:py-5 lg:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-0 md:gap-4">
              <button
                onClick={() => router.back()}
                className="text-light_mode_text dark:text-dark_mode_text hover:opacity-80 active:opacity-60 transition-opacity rounded-full hover:bg-light_mode_color2 dark:hover:bg-dark_mode_color2 p-1"
                aria-label="Go back"
              >
                <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
              </button>
              <h1 className="text-light_mode_text dark:text-dark_mode_text text-xl md:text-2xl lg:text-3xl font-[500]">
                Ledger
              </h1>
            </div>
            <button
              onClick={handleMenuClick}
              className="text-light_mode_text dark:text-dark_mode_text hover:opacity-80 active:opacity-60 transition-opacity p-2 rounded-full hover:bg-light_mode_color2 dark:hover:bg-dark_mode_color2"
              aria-label="Menu"
            >
              <MoreVertical className="h-5 w-5 md:h-6 md:w-6 rotate-90" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pb-4 md:py-6">
        {/* Summary Cards */}
        <div className="space-y-2 md:space-y-4 mb-4 md:mb-6">
          {/* Closing Balance Card */}
          <ClosingBalanceCard balance={closingBalance} />

          {/* Debit and Credit Cards */}
          <div className="grid grid-cols-2 gap-2 md:gap-4">
            <DebitCreditCard amount={debitAmount} label="Debit" />
            <DebitCreditCard amount={creditAmount} label="Credit" />
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
                    <LedgerTransactionCard
                      key={transaction.id}
                      id={transaction.id}
                      transactionId={transaction.transactionId}
                      time={transaction.time}
                      paymentType={transaction.paymentType}
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

export default LedgerPage;
