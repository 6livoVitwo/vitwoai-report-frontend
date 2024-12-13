import { apiSlice } from "../../apis/apiSlice";

export const purchasePoWiseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    costCenterWisePurchase: builder.query({
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
    // Query to get global search
    getGlobalsearchPo: builder.query({
      query: (body) => {
        return {
          url: "/purchase/global-search/po",
          method: "POST",
          body: JSON.stringify(body),
        };
      },
    }),
    // Query to get selected columns
    getSelectedColumnsFunctional: builder.query({
      query: () => {
        return {
          url: "/purchase/drop-down-data/functional-area",
          method: "GET",
        };
      },
    }),
    //export to excel date wise
    getexportdataPo: builder.query({
      query: (body) => {
        return {
          url: "/purchase/download-data",
          method: "POST",
          body: JSON.stringify(body),
        };
      },
    })
  }),
});

export const {
  useCostCenterWisePurchaseQuery,
  useGetGlobalsearchPoQuery,
  useGetSelectedColumnsFunctionalQuery,
  useGetexportdataPoQuery,
} = purchasePoWiseApi;
