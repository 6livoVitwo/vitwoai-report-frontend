import { get } from "lodash";
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
    getSelectedColumnsPurchase: builder.query({
      query: () => "/purchase/drop-down-data/product",
    }),

    // Query to get global search
    getGlobalsearchPurchase: builder.query({
      query: (body) => {
        return {
          url: "/purchase/global-search/product",
          method: "POST",
          body: JSON.stringify(body),
        };
      },
    }),
    //query to get drop-down data product group
    getProductGroup: builder.query({
      query: () => {
        return {
          url: "/purchase/drop-down-data/product-group",
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useProductWisePurchaseQuery,
  useGetSelectedColumnsPurchaseQuery,
  useGetGlobalsearchPurchaseQuery,
  useGetProductGroupQuery,
} = purchaseProductWiseApi;
