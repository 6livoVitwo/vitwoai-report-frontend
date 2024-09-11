import { apiSlice } from "../../apis/apiSlice";

export const purchaseVendorWiseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    vendorWisePurchase: builder.query({
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

    // Query to fetch data with sorting /purchase/purchase-groupby-data
    fetchData: builder.query({
      query: (columns) => ({
        url: 'purchase/purchase-groupby-data',  //  actual endpoint
        method: "POST",
        body: columns,
      }),
    }),
  }),
});

export const { useVendorWisePurchaseQuery, useFetchDataQuery } = purchaseVendorWiseApi;
