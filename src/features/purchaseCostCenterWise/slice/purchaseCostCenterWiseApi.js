import { apiSlice } from "../../apis/apiSlice";

export const purchaseCostCenterWiseApi = apiSlice.injectEndpoints({
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
    getGlobalsearchCostCenter: builder.query({
      query: (body) => {
        return {
          url: "/purchase/global-search/cost-center",
          method: "POST",
          body: JSON.stringify(body),
        };
      },
    }),
    // Query to get selected columns
    getSelectedColumnsCostCenter: builder.query({
      query: () => {
        return {
          url: "/purchase/drop-down-data/cost-center",
          method: "GET",
        };
      },
    }),
    //export to excel date wise
    getexportdataCostCenter: builder.query({
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
  useGetGlobalsearchCostCenterQuery,
  useGetSelectedColumnsCostCenterQuery,
  useGetexportdataCostCenterQuery,
} = purchaseCostCenterWiseApi;
