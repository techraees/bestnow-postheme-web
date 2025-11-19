import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./coreBaseQuery";

interface CartItem {
  id: string;
  name: string;
  image: string;
  unitPrice: number;
  quantity: number;
}

interface CartResponse {
  status: string;
  payload: {
    items?: CartItem[];
    results?: any[];
    totalPrice?: number;
    totalItems?: number;
    [key: string]: any;
  };
}

interface AddToCartParams {
  productId: string;
  quantity: number;
}

interface UpdateCartItemParams {
  cartItemId: string;
  quantity: number;
}

interface RemoveCartItemParams {
  productId: string;
}

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getCart: builder.query<CartResponse, void>({
      query: () => ({
        url: "/mobile-accessories/web/sales/cart/",
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),
    getCartItemsIds: builder.query<CartResponse, void>({
      query: () => ({
        url: "/mobile-accessories/web/sales/cart/items-ids",
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),
    addToCart: builder.mutation<CartResponse, AddToCartParams>({
      query: ({ productId, quantity }) => ({
        url: `/mobile-accessories/web/sales/cart/add-item/${productId}`,
        method: "POST",
        body: { item_quantity: quantity },
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCartItem: builder.mutation<CartResponse, UpdateCartItemParams>({
      query: ({ cartItemId, quantity }) => ({
        url: `/mobile-accessories/web/sales/cart/update/${cartItemId}`,
        method: "PUT",
        body: { item_quantity: quantity },
      }),
      invalidatesTags: ["Cart"],
    }),
    removeCartItem: builder.mutation<CartResponse, RemoveCartItemParams>({
      query: ({ cartItemId }) => ({
        url: `/mobile-accessories/web/sales/cart/delete/${cartItemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    clearCart: builder.mutation<CartResponse, void>({
      query: () => ({
        url: "/mobile-accessories/web/sales/cart/delete/items/all",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useClearCartMutation,
  useGetCartItemsIdsQuery,
} = cartApi;
