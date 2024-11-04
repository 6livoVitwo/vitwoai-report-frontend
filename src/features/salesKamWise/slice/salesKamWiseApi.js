import { apiSlice } from "../../apis/apiSlice";

export const salesKamWiseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    kamWiseSales: builder.query({
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
    // Query to get selected columns
    getSelectedColumnsKam: builder.query({
      query: () => "/sales/drop-down-data/kam",
    }),

    // Query to get global search
    getGlobalsearchKam: builder.query({
      query: (body) => {
        return {
          url: "/sales/global-search/kam",
          method: "POST",
          body: JSON.stringify(body),
        };
      },
    }),

  }),
});

export const { useKamWiseSalesQuery, useGetSelectedColumnsKamQuery, useGetGlobalsearchKamQuery } =
  salesKamWiseApi;
