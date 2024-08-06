import { apiSlice } from "../../apis/apiSlice";

export const purchasePoWiseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    poWisePurchase: builder.query({
      query: ({ page, filters }) => {
        return {
          url: `purchase/purchase-groupby-data`,
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

export const { usePoWisePurchaseQuery } = purchasePoWiseApi;
