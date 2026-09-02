import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_API || "http://localhost:5000/api",
  }), // Use `baseQuery` here
  tagTypes: ["post", "user", "like", "disLike", "comment", "payment"],
  endpoints: () => ({}),
});
