import { apiSlice } from "../../apis/apiSlice";

export const purchaseStorageLocationWiseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    storageLocationWisePurchase: builder.query({
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
    getGlobalsearchStorageLocation: builder.query({
      query: (body) => {
        return {
          url: "/purchase/global-search/storage-location",
          method: "POST",
          body: JSON.stringify(body),
        };
      },
    }),
    // Query to get selected columns
    getSelectedColumnsStorageLocation: builder.query({
      query: () => {
        return {
          url: "/purchase/drop-down-data/storage-location",
          method: "GET",
        };
      },
    }),
    //export to excel date wise
    getexportdataStorageLocation: builder.query({
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
  useStorageLocationWisePurchaseQuery,
  useGetGlobalsearchStorageLocationQuery,
  useGetSelectedColumnsStorageLocationQuery,
  useGetexportdataStorageLocationQuery,
} = purchaseStorageLocationWiseApi;
