import { apiSlice } from "../../apis/apiSlice";

export const salesProductWiseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    productWiseSales: builder.query({
      query: ({ filters, page }) => {
        const body = JSON.stringify({ ...filters, page });
        return {
          url: `sales/sales-groupby-data`,
          method: "POST",
          body,
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
  }),
});

export const { useProductWiseSalesQuery } = salesProductWiseApi;

