import { apiSlice } from "../../apis/apiSlice";

export const purchasePoWiseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    poWisePurchase: builder.query({
      query: ({ filters, page }) => {
        const body = JSON.stringify({ ...filters, page });
        return {
          url: `purchase/purchase-groupby-data`,
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

export const { usePoWisePurchaseQuery } = purchasePoWiseApi;

