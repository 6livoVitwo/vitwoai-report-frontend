import { apiSlice } from "../../apis/apiSlice";

export const purchaseProductWiseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    productWisePurchase: builder.query({
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

    // Query to get selected columns
    getSelectedColumns: builder.query({
      query: () => '/purchase/drop-down-data/product',
    }),
    
    // Query to fetch data with sorting /purchase/purchase-groupby-data
    fetchData: builder.query({
      query: (columns) => ({
        url: '/purchase/purchase-groupby-data',  //  actual endpoint
        method: "POST",
        body: columns,
      }),
    }),
  }),

});

export const { useProductWisePurchaseQuery, useGetSelectedColumnsQuery,useFetchDataQuery} = purchaseProductWiseApi;
