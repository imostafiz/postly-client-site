import { baseApi } from "../api/baseApi";

const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (data) => {
        return {
          url: `/post`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["post"],
    }),

    getAllPost: builder.query({
      query: (arg: Record<string, any>) => ({
        url: "/post",
        method: "GET",
        params: arg,
      }),
      providesTags: ["post"],
    }),

    updatePost: builder.mutation({
      query: ({ updateData, postId }) => {
        return {
          url: `/post/${postId}`,
          method: "PATCH",
          body: updateData,
        };
      },
      invalidatesTags: ["post"],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/post/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["post"],
    }),
    getMyPosts: builder.query({
      query: (id) => ({
        url: `/post/${id}`,
        method: "GET",
      }),
      providesTags: ["post"],
    }),
    createLike: builder.mutation({
      query: (likeObject) => {
        return {
          url: `/likes`,
          method: "POST",
          body: likeObject,
        };
      },
      invalidatesTags: ["post", "user", "like", "disLike"],
    }),
    createDislike: builder.mutation({
      query: (disLikes) => {
        return {
          url: `/dislikes`,
          method: "POST",
          body: disLikes,
        };
      },
      invalidatesTags: ["post", "user"],
    }),
    makeFavorite: builder.mutation({
      query: ( saveData ) => {
        return {
          url: `/post/favorite/create-favorite`,
          method: "POST",
          body: saveData,
        };
      },
      invalidatesTags: ["post", "user"],
    }),
    getMyFavoritePost: builder.query({
      query: (userId) => {
        return {
          url: `/post/favorite/${userId}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetAllPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetMyPostsQuery,
  useCreateLikeMutation,
  useCreateDislikeMutation,
  useMakeFavoriteMutation,
  useGetMyFavoritePostQuery,
} = postApi;
