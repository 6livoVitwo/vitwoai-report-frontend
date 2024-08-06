import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const salesApi = createApi({
  reducerPath: "salesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.0.133:8081/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchSales: builder.query({
      query: ({ page, filters }) => {
        return {
          url: `sales/salesdata-adv-filter?pageNumber=${page}&pageSize=10`,
          method: "POST",
          body: JSON.stringify(filters),
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
  }),
});

export const { useFetchSalesQuery } = salesApi;
