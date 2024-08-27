// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


// export const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: process.env.REACT_APP_API_URL,
//     prepareHeaders: (headers) => {
//       const token = localStorage.getItem("authToken");
//       if (token)
//          headers.set("Authorization", `Bearer ${token}`);
//       return headers;
//     },
    
//   }),
//   tagTypes: [],
//   endpoints: (builder) => ({}),
// });

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("authToken");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  
  tagTypes: ["Columns"],  // Adding tagTypes for cache invalidation
  endpoints: (builder) => ({
    getSelectedColumns: builder.query({
      query: () => "/columns",
      providesTags: ["Columns"],  // Use providesTags to mark data from this query
    }),
    saveSelectedColumns: builder.mutation({
      query: (columns) => ({
        url: "/columns",
        method: "POST",
        body: { columns },
      }),
      invalidatesTags: ["Columns"],  // Invalidate cache to refresh data
    }),
  }),
});

export const { useGetSelectedColumnsQuery, useSaveSelectedColumnsMutation } = apiSlice;
