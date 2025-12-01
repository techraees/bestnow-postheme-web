"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import TopSpacingWrapper from "@/components/top-spacing/TopSpacing";
import {
  LedgerTransactionCard,
  ClosingBalanceCard,
  DebitCreditCard,
} from "@/components/ledger";
import { MoreVertical, ChevronLeft, Calendar, List } from "lucide-react";
import { useGetLedgerQuery } from "@/redux/api/core/orderApi";

interface LedgerTransaction {
  id: string;
  date: string;
  voucher: string;
  details: string;
  debit_amount: number;
  credit_amount: number;
  balance: number;
  formattedDate: string;
  formattedTime?: string;
}

type ViewType = "list" | "calendar";

const LedgerPage = () => {
  const router = useRouter();
  const [viewType, setViewType] = useState<ViewType>("list");

  // Date state - default to current month
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const [startDate, setStartDate] = useState(
    formatDateForInput(firstDayOfMonth)
  );
  const [endDate, setEndDate] = useState(formatDateForInput(lastDayOfMonth));

  // Format date for input (YYYY-MM-DD)
  function formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Format date for display (DD MMM YYYY) - e.g., "29 Oct 2025"
  function formatDateForDisplay(dateString: string): string {
    if (!dateString) return "";
    const date = new Date(dateString);
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
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  }

  // Format date for grouping (e.g., "Mon, 08 Sep 2025")
  function formatDateForGroup(dateString: string): string {
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

  // Call API
  const { data: ledgerData, isLoading } = useGetLedgerQuery({
    start_date: startDate,
    end_date: endDate,
  });

  // Extract closing balance from first object (empty date_time)
  const closingBalanceData = useMemo(() => {
    const results = ledgerData?.payload?.results || [];
    if (results.length > 0 && results[0]?.date_time === "") {
      const firstData = results[0]?.data?.[0];
      if (firstData && firstData.details === "OPENING BALANCE") {
        return firstData.balance || 0;
      }
    }
    // If no opening balance, get from last transaction
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

  // Calculate total debit and credit
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

  // Transform API response to transactions
  const transactions: LedgerTransaction[] = useMemo(() => {
    const allTransactions: LedgerTransaction[] = [];
    const results = ledgerData?.payload?.results || [];

    results.forEach((group: any) => {
      const dateTime = group.date_time || "";
      const data = group.data || [];

      data.forEach((item: any) => {
        // Skip opening balance item
        if (item.details === "OPENING BALANCE") return;

        const transactionDate = item.date || dateTime;
        allTransactions.push({
          id: item.id?.toString() || "",
          date: transactionDate,
          voucher: item.voucher || "",
          details: item.details || "",
          debit_amount: item.debit_amount || 0,
          credit_amount: item.credit_amount || 0,
          balance: item.balance || 0,
          formattedDate: formatDateForGroup(transactionDate),
        });
      });
    });

    return allTransactions;
  }, [ledgerData]);

  // Group transactions by date
  const groupedTransactions = useMemo(() => {
    return transactions.reduce((groups, transaction) => {
      const date = transaction.formattedDate;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
      return groups;
    }, {} as Record<string, LedgerTransaction[]>);
  }, [transactions]);

  // Calendar view data - map dates to transactions
  const calendarData = useMemo(() => {
    const dateMap: Record<string, { credit: boolean; debit: boolean }> = {};
    transactions.forEach((transaction) => {
      const dateKey = transaction.date;
      if (!dateMap[dateKey]) {
        dateMap[dateKey] = { credit: false, debit: false };
      }
      if (transaction.credit_amount > 0) {
        dateMap[dateKey].credit = true;
      }
      if (transaction.debit_amount > 0) {
        dateMap[dateKey].debit = true;
      }
    });
    return dateMap;
  }, [transactions]);

  // Format amounts
  const formatAmount = (amount: number) => {
    return `Rs. ${Math.abs(amount).toLocaleString("en-PK")}`;
  };

  const closingBalance = formatAmount(closingBalanceData);
  const debitAmount = formatAmount(totalDebit);
  const creditAmount = formatAmount(totalCredit);

  const handleMenuClick = () => {
    console.log("Menu clicked");
  };

  const handleTransactionClick = (transactionId: string) => {
    console.log("Transaction clicked:", transactionId);
  };

  // Calendar component
  const CalendarView = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const weekDays = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

    const goToPreviousMonth = () => {
      setCurrentMonth(new Date(year, month - 1, 1));
    };

    const goToNextMonth = () => {
      setCurrentMonth(new Date(year, month + 1, 1));
    };

    const getDateKey = (day: number) => {
      const date = new Date(year, month, day);
      return formatDateForInput(date);
    };

    return (
      <div className="bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <button
            onClick={goToPreviousMonth}
            className="text-light_mode_text dark:text-dark_mode_text hover:opacity-80 active:opacity-60 transition-opacity p-2 rounded-full hover:bg-light_mode_color3 dark:hover:bg-dark_mode_color3"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <h3 className="text-light_mode_text dark:text-dark_mode_text text-base md:text-lg lg:text-xl font-semibold">
            {monthNames[month]} {year}
          </h3>
          <button
            onClick={goToNextMonth}
            className="text-light_mode_text dark:text-dark_mode_text hover:opacity-80 active:opacity-60 transition-opacity rotate-180 p-2 rounded-full hover:bg-light_mode_color3 dark:hover:bg-dark_mode_color3"
            aria-label="Next month"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Week Days Header */}
        <div className="grid grid-cols-7 gap-1.5 md:gap-2 mb-3 md:mb-4">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-center text-light_mode_gray_color dark:text-dark_mode_gray_color text-xs md:text-sm font-medium py-1"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1.5 md:gap-2">
          {/* Empty cells for days before month starts */}
          {Array.from({ length: startingDayOfWeek }).map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square"></div>
          ))}

          {/* Days of the month */}
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const dateKey = getDateKey(day);
            const hasTransactions = calendarData[dateKey];
            const isSelected = false; // Can add selection logic

            const handleDayClick = () => {
              if (hasTransactions) {
                router.push(`/ledger/${dateKey}`);
              }
            };

            return (
              <button
                key={day}
                onClick={handleDayClick}
                disabled={!hasTransactions}
                className={`aspect-square flex flex-col items-center justify-center relative rounded-lg md:rounded-xl transition-all ${isSelected
                  ? "bg-light_mode_blue_color dark:bg-dark_mode_blue_color border-2 border-light_mode_blue_color dark:border-dark_mode_blue_color"
                  : hasTransactions
                    ? "hover:bg-light_mode_color3 dark:hover:bg-dark_mode_color3 cursor-pointer active:scale-95 bg-light_mode_color dark:bg-dark_mode_color"
                    : "opacity-40 cursor-not-allowed bg-light_mode_color dark:bg-dark_mode_color"
                  }`}
              >
                <span
                  className={`text-xs md:text-sm lg:text-base font-medium ${isSelected
                    ? "text-white"
                    : "text-light_mode_text dark:text-dark_mode_text"
                    }`}
                >
                  {day}
                </span>
                {hasTransactions && (
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                    {hasTransactions.credit && (
                      <span className="text-[7px] md:text-[9px] bg-green-500 text-white px-1 py-0.5 rounded">
                        Cr
                      </span>
                    )}
                    {hasTransactions.debit && (
                      <span className="text-[7px] md:text-[9px] bg-red-500 text-white px-1 py-0.5 rounded">
                        Dr
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-light_mode_color3 dark:border-dark_mode_color3 flex flex-col gap-2 md:gap-3">
          <div className="flex items-center gap-2 md:gap-3">
            <span className="text-[10px] md:text-xs bg-green-500 text-white px-2 py-1 rounded">
              Cr
            </span>
            <span className="text-light_mode_text dark:text-dark_mode_text text-xs md:text-sm">
              Indicates a credit transaction
            </span>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <span className="text-[10px] md:text-xs bg-red-500 text-white px-2 py-1 rounded">
              Dr
            </span>
            <span className="text-light_mode_text dark:text-dark_mode_text text-xs md:text-sm">
              Indicates a debit transaction
            </span>
          </div>
        </div>
      </div>
    );
  };

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

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-4 md:py-6 lg:py-8 pb-8 md:pb-12 lg:pb-16">
        {/* Date Filters */}
        <div className="bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-xl md:rounded-2xl p-4 md:p-6 mb-4 md:mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {/* From Date Picker */}
            <div className="relative">
              {/* <input
                type="date"
                id="start-date-input"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="absolute opacity-0 w-0 h-0 pointer-events-none"
              /> */}
              <input
                type="date"
                id="start-date-input"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <button
                type="button"
                onClick={() => {
                  const input = document.getElementById(
                    "start-date-input"
                  ) as HTMLInputElement;
                  if (input) {
                    if (typeof input.showPicker === "function") {
                      input.showPicker();
                    } else {
                      input.click();
                    }
                  }
                }}
                className="w-full flex items-center gap-3 px-4 py-3 bg-light_mode_color1 dark:bg-dark_mode_color1 rounded-full hover:bg-light_mode_color2 dark:hover:bg-dark_mode_color2 transition-colors"
              >
                <Calendar className="w-5 h-5 text-light_mode_text dark:text-dark_mode_text shrink-0" />
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-light_mode_gray_color dark:text-dark_mode_gray_color text-sm md:text-base font-medium">
                    From
                  </span>
                  <span className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color text-sm md:text-base font-medium">
                    {formatDateForDisplay(startDate)}
                  </span>
                </div>
              </button>
            </div>

            {/* To Date Picker */}
            <div className="relative">
              {/* <input
                type="date"
                id="end-date-input"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="absolute opacity-0 w-0 h-0 pointer-events-none"
              /> */}

              <input
                type="date"
                id="end-date-input"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <button
                type="button"
                onClick={() => {
                  const input = document.getElementById(
                    "end-date-input"
                  ) as HTMLInputElement;
                  if (input) {
                    if (typeof input.showPicker === "function") {
                      input.showPicker();
                    } else {
                      input.click();
                    }
                  }
                }}
                className="w-full flex items-center gap-3 px-4 py-3 bg-light_mode_color1 dark:bg-dark_mode_color1 rounded-full hover:bg-light_mode_color2 dark:hover:bg-dark_mode_color2 transition-colors"
              >
                <Calendar className="w-5 h-5 text-light_mode_text dark:text-dark_mode_text shrink-0" />
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-light_mode_gray_color dark:text-dark_mode_gray_color text-sm md:text-base font-medium">
                    To
                  </span>
                  <span className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color text-sm md:text-base font-medium">
                    {formatDateForDisplay(endDate)}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-xl md:rounded-2xl p-1 md:p-1.5 mb-4 md:mb-6 flex gap-2">
          <button
            onClick={() => setViewType("list")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 md:py-3 rounded-lg md:rounded-xl transition-all ${viewType === "list"
              ? "bg-light_mode_color dark:bg-dark_mode_color text-light_mode_text dark:text-dark_mode_text shadow-sm"
              : "text-light_mode_gray_color dark:text-dark_mode_gray_color hover:text-light_mode_text dark:hover:text-dark_mode_text"
              }`}
          >
            <List className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-xs md:text-sm lg:text-base font-medium">
              List View
            </span>
          </button>
          <button
            onClick={() => setViewType("calendar")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 md:py-3 rounded-lg md:rounded-xl transition-all ${viewType === "calendar"
              ? "bg-light_mode_color dark:bg-dark_mode_color text-light_mode_text dark:text-dark_mode_text shadow-sm"
              : "text-light_mode_gray_color dark:text-dark_mode_gray_color hover:text-light_mode_text dark:hover:text-dark_mode_text"
              }`}
          >
            <Calendar className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-xs md:text-sm lg:text-base font-medium">
              Calendar View
            </span>
          </button>
        </div>

        {/* Summary Cards - Only show in list view */}
        {viewType === "list" && (
          <div className="space-y-3 md:space-y-4 mb-4 md:mb-6 lg:mb-8">
            {/* Closing Balance Card */}
            <ClosingBalanceCard balance={closingBalance} />

            {/* Debit and Credit Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <DebitCreditCard amount={debitAmount} label="Debit" />
              <DebitCreditCard amount={creditAmount} label="Credit" />
            </div>
          </div>
        )}

        {/* Content Area */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 md:py-20 lg:py-24">
            <div className="animate-spin rounded-full h-12 w-12 md:h-16 md:w-16 border-4 border-light_mode_color3 dark:border-dark_mode_color3 border-t-light_mode_yellow_color dark:border-t-dark_mode_yellow_color mb-4"></div>
            {/* <p className="text-light_mode_text dark:text-dark_mode_text text-base md:text-lg lg:text-xl font-medium mb-2">
            </p> */}
          </div>
        ) : viewType === "calendar" ? (
          <CalendarView />
        ) : (
          <div className="space-y-4 md:space-y-6 lg:space-y-8">
            {Object.keys(groupedTransactions).length === 0 ? (
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
                  No transactions found
                </p>
                <p className="text-light_mode_gray_color dark:text-dark_mode_gray_color text-sm md:text-base">
                  Try adjusting the date range
                </p>
              </div>
            ) : (
              Object.entries(groupedTransactions).map(
                ([date, dateTransactions]) => (
                  <div
                    key={date}
                    className="space-y-3 md:space-y-4 lg:space-y-5"
                  >
                    {/* Date Separator */}
                    <div className="relative flex items-center justify-center py-2 md:py-3">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-light_mode_color3 dark:border-dark_mode_color3"></div>
                      </div>
                      <span className="relative bg-light_mode_color dark:bg-dark_mode_color px-3 md:px-4 lg:px-6 text-light_mode_text dark:text-dark_mode_text text-xs md:text-sm lg:text-base font-semibold">
                        {date}
                      </span>
                    </div>

                    {/* Closing Balance for this date */}
                    {dateTransactions.length > 0 && (
                      <div className="bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-xl md:rounded-2xl p-3 md:p-4 mb-3 md:mb-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                          <span className="text-light_mode_text dark:text-dark_mode_text text-xs md:text-sm lg:text-base font-medium">
                            Closing Balance
                          </span>
                          <span className="text-light_mode_yellow_color dark:text-dark_mode_yellow_color text-sm md:text-base lg:text-lg font-semibold">
                            {formatAmount(
                              dateTransactions[dateTransactions.length - 1]
                                .balance
                            )}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Transactions for this date */}
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
                          className="bg-light_mode_color2 dark:bg-dark_mode_color2 rounded-xl md:rounded-2xl p-3 md:p-4 lg:p-5 hover:bg-light_mode_color3 dark:hover:bg-dark_mode_color3 transition-colors"
                        >
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 md:gap-3">
                            <div className="flex-1 min-w-0">
                              <p className="text-light_mode_text dark:text-dark_mode_text text-sm md:text-base lg:text-lg font-semibold mb-1 break-words">
                                {transaction.details}
                              </p>
                              {transaction.voucher && (
                                <p className="text-light_mode_gray_color dark:text-dark_mode_gray_color text-xs md:text-sm">
                                  {transaction.voucher}
                                </p>
                              )}
                            </div>
                            <div className="text-left sm:text-right shrink-0">
                              <p
                                className={`text-sm md:text-base lg:text-lg font-semibold ${amountColor}`}
                              >
                                {amount}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )
              )
            )}
          </div>
        )}
      </div>
    </TopSpacingWrapper>
  );
};

export default LedgerPage;
