import { apiSlice } from "../../apis/apiSlice";

export const salesProductWiseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    productWiseSales: builder.query({
      query: ({ page, filters }) => ({
        url: `sales/sales-groupby-data?pageNumber=${page}&pageSize=10`,
        method: "POST",
        body: JSON.stringify(filters),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useProductWiseSalesQuery } = salesProductWiseApi;