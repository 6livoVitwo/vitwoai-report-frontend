import { apiSlice } from "../../apis/apiSlice";

export const purchaseVendorWiseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    vendorWisePurchase: builder.query({
      query: ({ page, filters }) => {
        return {
          url: `purchase/purchase-groupby-data?pageNumber=${page}&pageSize=10`,
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

export const { useVendorWisePurchaseQuery } = purchaseVendorWiseApi;
