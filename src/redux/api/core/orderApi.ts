import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./coreBaseQuery";

// For order API, we rename CartItem/CartResponse -> OrderItem/OrderResponse for clarity
interface OrderItem {
  id: string;
  name: string;
  image: string;
  unitPrice: number;
  quantity: number;
}

interface OrderResponse {
  status: string;
  payload: {
    items?: OrderItem[];
    results?: any[];
    totalPrice?: number;
    totalItems?: number;
    [key: string]: any;
  };
}

interface PlaceOrderParams {
  new_active_phone_number: string;
  new_type_city: string;
  whole_address_of_customer: string;
}

// For getOrderDetails and openBalanceOrOrderCount params
interface GetOrderDetailsParams {
  order_id: string;
}
interface OpenBalanceOrOrderCountParams {
  entity_type: string;
}

interface GetLedgerParams {
  start_date: string;
  end_date: string;
}

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    getOrders: builder.query<OrderResponse, void>({
      query: () => ({
        url: "/mobile-accessories/web/sales/pre-orders/my-all",
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
    openBalanceOrOrderCount: builder.query<
      OrderResponse,
      OpenBalanceOrOrderCountParams
    >({
      query: ({ entity_type }) => ({
        url: `/mobile-accessories/web/sales/pre-orders/order-count-opening-balance?entity_type=${entity_type}`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
    getOrderDetails: builder.query<OrderResponse, GetOrderDetailsParams>({
      query: ({ order_id }) => ({
        url: `/mobile-accessories/web/sales/pre-orders/details/${order_id}`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),

    placeOrder: builder.mutation<any, PlaceOrderParams>({
      query: (data) => ({
        url: "/mobile-accessories/web/sales/pre-orders",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),
    getLedger: builder.query<OrderResponse, GetLedgerParams>({
      query: ({ start_date, end_date }) => ({
        url: `/mobile-accessories/web/finance/ledger-journels/my-account-statement?action_type=get&start_date=${start_date}&end_date=${end_date}`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useOpenBalanceOrOrderCountQuery,
  useGetOrderDetailsQuery,
  usePlaceOrderMutation,
  useGetLedgerQuery,
} = orderApi;
