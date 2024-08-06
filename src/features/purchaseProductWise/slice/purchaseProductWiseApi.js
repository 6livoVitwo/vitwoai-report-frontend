import { apiSlice } from "../../apis/apiSlice";

export const purchaseProductWiseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    productWisePurchase: builder.query({
      query: ({ page, filters }) => {
        return {
          url: `purchase/purchase-groupby-data?pageSize=${page}`,
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

export const { useProductWisePurchaseQuery } = purchaseProductWiseApi;
