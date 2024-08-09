import { apiSlice } from "../../apis/apiSlice";

export const salesVerticalWiseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    verticalWiseSales: builder.query({
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

export const { useVerticalWiseSalesQuery } = salesVerticalWiseApi;

