"use client";

import React, { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import TopSpacingWrapper from "@/components/top-spacing/TopSpacing";
import { ClosingBalanceCard, DebitCreditCard } from "@/components/ledger";
import { ChevronLeft } from "lucide-react";
import { useGetLedgerQuery } from "@/redux/api/core/orderApi";

const LedgerDateDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const dateParam = params?.date as string;

  // Parse date and set range to single day
  const selectedDate = dateParam || "";
  const startDate = selectedDate;
  const endDate = selectedDate;

  // Call API for the selected date
  const { data: ledgerData, isLoading } = useGetLedgerQuery({
    start_date: startDate,
    end_date: endDate,
  });

  // Format date for display (e.g., "Mon, 08 Sep 2025")
  function formatDateForDisplay(dateString: string): string {
    if (!dateString) return "";
    const date = new Date(dateString);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${days[date.getDay()]}, ${String(date.getDate()).padStart(
      2,
      "0"
    )} ${months[date.getMonth()]} ${date.getFullYear()}`;
  }

  // Extract closing balance
  const closingBalanceData = useMemo(() => {
    const results = ledgerData?.payload?.results || [];
    if (results.length > 0 && results[0]?.date_time === "") {
      const firstData = results[0]?.data?.[0];
      if (firstData && firstData.details === "OPENING BALANCE") {
        return firstData.balance || 0;
      }
    }
    // Get from last transaction
    let lastBalance = 0;
    results.forEach((group: any) => {
      if (group.data && group.data.length > 0) {
        const lastItem = group.data[group.data.length - 1];
        if (lastItem.balance !== undefined) {
          lastBalance = lastItem.balance;
        }
      }
    });
    return lastBalance;
  }, [ledgerData]);

  // Calculate total debit and credit for this date
  const { totalDebit, totalCredit } = useMemo(() => {
    let debit = 0;
    let credit = 0;
    const results = ledgerData?.payload?.results || [];

    results.forEach((group: any) => {
      if (group.data && group.data.length > 0) {
        group.data.forEach((item: any) => {
          if (item.details !== "OPENING BALANCE") {
            debit += item.debit_amount || 0;
            credit += item.credit_amount || 0;
          }
        });
      }
    });

    return { totalDebit: debit, totalCredit: credit };
  }, [ledgerData]);

  // Get transactions for this date
  const dateTransactions = useMemo(() => {
    const allTransactions: any[] = [];
    const results = ledgerData?.payload?.results || [];

    results.forEach((group: any) => {
      const dateTime = group.date_time || "";
      const data = group.data || [];

      data.forEach((item: any) => {
        // Skip opening balance item
        if (item.details === "OPENING BALANCE") return;

        const transactionDate = item.date || dateTime;
        // Only include transactions for the selected date
        if (transactionDate === selectedDate) {
          allTransactions.push({
            id: item.id?.toString() || "",
            date: transactionDate,
            voucher: item.voucher || "",
            details: item.details || "",
            debit_amount: item.debit_amount || 0,
            credit_amount: item.credit_amount || 0,
            balance: item.balance || 0,
          });
        }
      });
    });

    return allTransactions;
  }, [ledgerData, selectedDate]);

  // Format amounts
  const formatAmount = (amount: number) => {
    return `Rs. ${Math.abs(amount).toLocaleString("en-PK")}`;
  };

  const closingBalance = formatAmount(closingBalanceData);
  const debitAmount = formatAmount(totalDebit);
  const creditAmount = formatAmount(totalCredit);

  const displayDate = formatDateForDisplay(selectedDate);

  return (
    <TopSpacingWrapper>
      {/* Header */}
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
              <h1 className="text-light_mode_text dark:text-dark_mode_text text-xl md:text-2xl lg:text-3xl font-medium">
                {displayDate}
              </h1>
            </div>
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
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 md:py-20">
            <p className="text-light_mode_text dark:text-dark_mode_text text-lg md:text-xl font-medium mb-2">
              Loading transactions...
            </p>
          </div>
        ) : dateTransactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 md:py-20">
            <p className="text-light_mode_text dark:text-dark_mode_text text-lg md:text-xl font-medium mb-2">
              No transactions found for this date
            </p>
          </div>
        ) : (
          <div className="space-y-3 md:space-y-4">
            {/* Closing Balance for this date */}
            {dateTransactions.length > 0 && (
              <div className="bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-2xl p-4 mb-2">
                <div className="flex justify-between items-center">
                  <span className="text-light_mode_text dark:text-dark_mode_text text-sm md:text-base font-medium">
                    Closing Balance
                  </span>
                  <span className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color text-base md:text-lg font-semibold">
                    {formatAmount(
                      dateTransactions[dateTransactions.length - 1].balance
                    )}
                  </span>
                </div>
              </div>
            )}

            {/* Transactions */}
            {dateTransactions.map((transaction, index) => {
              const amount =
                transaction.credit_amount > 0
                  ? `+${formatAmount(transaction.credit_amount)}`
                  : `-${formatAmount(transaction.debit_amount)}`;
              const amountColor =
                transaction.credit_amount > 0
                  ? "text-green-500 dark:text-green-400"
                  : "text-red-500 dark:text-red-400";

              return (
                <div
                  key={transaction.id}
                  className="bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-2xl p-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <p className="text-light_mode_text dark:text-dark_mode_text text-base md:text-lg font-semibold mb-1">
                        {transaction.details}
                      </p>
                      {transaction.voucher && (
                        <p className="text-light_mode_gray_color dark:text-dark_mode_gray_color text-xs md:text-sm">
                          {transaction.voucher}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-base md:text-lg font-semibold ${amountColor}`}
                      >
                        {amount}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </TopSpacingWrapper>
  );
};

export default LedgerDateDetailPage;
