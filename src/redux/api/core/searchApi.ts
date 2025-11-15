import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./coreBaseQuery";

interface SearchSuggestionsResponse {
  status: string;
  payload: string[];
}

interface SearchResultsParams {
  q: string;
  page?: number;
  limit?: number;
}

interface SearchResultsResponse {
  status: string;
  payload:
    | any[]
    | {
        results: any[];
        totalPages: number;
        currentPage: number;
        totalResults: number;
      };
}

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getSearchSuggestions: builder.query<SearchSuggestionsResponse, void>({
      query: () => "/mobile-accessories/web/sales/products/search-suggestion",
    }),
    getSearchResults: builder.query<SearchResultsResponse, SearchResultsParams>(
      {
        query: ({ q, page = 1, limit = 20 }) => {
          const params = new URLSearchParams({
            q,
            page: page.toString(),
            limit: limit.toString(),
          });
          return `/mobile-accessories/web/sales/products/dropdown?${params.toString()}`;
        },
      }
    ),
  }),
});

export const { useGetSearchSuggestionsQuery, useGetSearchResultsQuery } =
  searchApi;
