import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./coreBaseQuery";

// Define a service using a base URL and expected endpoints
export const communitiesApi = createApi({
  reducerPath: "communitiesApi",
  tagTypes: ["Comments", "allNestedCommunities", "getSingleCommunity"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // Used to get All Communities for listing
    getAllCommunities: builder.query({
      query: (queryParams: string) =>
        `mobile-accessories/web/community-system/community?${queryParams}`,
    }),
    // Used to get All Communities and Nested for listing
    getAllCommunitiesWithNested: builder.query({
      query: (queryParams: string) =>
        `mobile-accessories/web/community-system/community/nested?${queryParams}`,
      providesTags: ["allNestedCommunities"],
    }),
    // used to follow the community
    followCommunity: builder.mutation({
      query: (slug: string) => ({
        url: `/mobile-accessories/web/community-system/community-member/follow/${slug}`,
        method: "POST",
      }),
      invalidatesTags: ["allNestedCommunities", "getSingleCommunity"],
    }),
    // used to get thhe post of specific comunity
    getPostOfSpecificCommuntiy: builder.query({
      query: (queryParams: string) =>
        `/mobile-accessories/web/community-system/community-post?${queryParams}`,
    }),
    // used to get Single Community Detail
    getSingleCommunity: builder.query({
      query: (slug: string) =>
        `/mobile-accessories/web/community-system/community/single/${slug}`,
      providesTags: ["getSingleCommunity"],
    }),

    getCommentsOfSpecificCommunity: builder.query({
      query: ({ slug, query }: { slug: string; query: string }) =>
        `/mobile-accessories/web/community-system/community-post/get-comments/${slug}?${query}`,
      providesTags: ["Comments"],
    }),

    getAllCommunitiesHavingActiveStatus: builder.query({
      query: ({ queryParams }: { queryParams: string }) =>
        `/mobile-accessories/web/community-system/community-status/communities?${queryParams}`,
    }),

    commentOnSpecificPost: builder.mutation({
      query: ({ slug, data }: { slug: string; data: any }) => ({
        url: `/mobile-accessories/web/community-system/community-post/create-comment/${slug}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Comments"],
    }),

    engagementOnSpecificPost: builder.mutation({
      query: ({ slug, data }: { slug: string; data: any }) => ({
        url: `/mobile-accessories/web/community-system/community-post/engagement/${slug}`,
        method: "PUT",
        body: data,
      }),
      // invalidatesTags: ["Comments"],
    }),
    getStatusOfSpecificCommunity: builder.query({
      query: ({ slug }: { slug: string }) => {
        return `/mobile-accessories/web/community-system/community-status/all-status/${slug}`;
      },
    }),

    getCommentsOfSpecificStatus: builder.query({
      query: ({ slug, query }: { slug: string; query: string }) =>
        `/mobile-accessories/web/community-system/community-status/comment-all/${slug}?${query}`,
    }),
    commentOnSpecificStatus: builder.mutation({
      query: ({ slug, data }: { slug: string; data: any }) => ({
        url: `/mobile-accessories/web/community-system/community-status/comment/${slug}`,
        method: "POST",
        body: data,
      }),
    }),
    engagementOnSpecificStatus: builder.mutation({
      query: ({ slug, data }: { slug: string; data: any }) => ({
        url: `/mobile-accessories/web/community-system/community-status/engagement/${slug}`,
        method: "POST",
        body: data,
      }),
      // invalidatesTags: ["Comments"],
    }),

    // Used to get count of unviewed status of specific user
    getCountOfUnViewedStatus: builder.query({
      query: () =>
        `/mobile-accessories/web/community-system/community-status/communities/view-count`,
    }),
    getTheUserPermissionToSeeTheCommunity: builder.mutation({
      query: (data: any) => ({
        url: `/mobile-accessories/web/community-system/community/user`,
        method: "POST",
        body: data,
      }),
      // invalidatesTags: ["Comments"],
    }),
  }),
});

export const {
  useGetAllCommunitiesQuery,
  useGetAllCommunitiesWithNestedQuery,
  useFollowCommunityMutation,
  useGetPostOfSpecificCommuntiyQuery,
  useGetSingleCommunityQuery,
  useGetCommentsOfSpecificCommunityQuery,
  useLazyGetCommentsOfSpecificCommunityQuery,
  useCommentOnSpecificPostMutation,
  useGetAllCommunitiesHavingActiveStatusQuery,
  useEngagementOnSpecificPostMutation,
  useGetStatusOfSpecificCommunityQuery,
  useLazyGetCommentsOfSpecificStatusQuery,
  useCommentOnSpecificStatusMutation,
  useEngagementOnSpecificStatusMutation,
  useGetCountOfUnViewedStatusQuery,
  useGetTheUserPermissionToSeeTheCommunityMutation,
} = communitiesApi;
