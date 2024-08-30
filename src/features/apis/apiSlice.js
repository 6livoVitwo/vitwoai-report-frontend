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

    // Query to fetch data with sorting /purchase/purchase-groupby-data
    fetchData: builder.query({
      query: (columns) => ({
        url: '/purchase/purchase-groupby-data',  //  actual endpoint
        // params: { page, size, sortDir, sortBy },
        method: "POST",
        body: columns,
      }),
    }),
    // Query to fetch data with sorting /sales/sales-groupby-data
    // fetchData: builder.query({
    //   query: (columns) => ({
    //     url: '/sales/sales-groupby-data',  //  actual endpoint
    //     // params: { page, size, sortDir, sortBy },
    //     method: "POST",
    //     body: columns,
    //   }),
    // }),
    
    // Query to get selected columns
    getSelectedColumns: builder.query({
      query: () =>'/purchase/drop-down-data/product',
      providesTags: ['Columns'],

    }),  

  }),
});

export const {useGetSelectedColumnsQuery, useFetchDataQuery} = apiSlice;


