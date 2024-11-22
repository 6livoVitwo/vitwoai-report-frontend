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
    getSelectedColumnsPo: builder.query({
      query: () => {
        return {
          url: "/purchase/drop-down-data/po",
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
  usePoWisePurchaseQuery,
  useGetGlobalsearchPoQuery,
  useGetSelectedColumnsPoQuery,
  useGetexportdataPoQuery,
} = purchasePoWiseApi;
