import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("authToken");
      if (token) headers.set("Authorization", `Bearer ${token}`);  
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: [],
  endpoints: (builder) => ({}),
});
