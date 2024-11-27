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
        url: "purchase/purchase-groupby-data", //  actual endpoint
        method: "POST",
        body: columns,
      }),
    }),
    // Query to get global search
    getGlobalsearchVendor: builder.query({
      query: (body) => {
        return {
          url: "/purchase/global-search/vendor",
          method: "POST",
          body: JSON.stringify(body),
        };
      },
    }),
    getSelectedColumnsVendor: builder.query({
      query: () => {
        return {
          url: "/purchase/drop-down-data/vendor",
          method: "GET",
        };
      },
    }),
    //export to excel date wise
    getexportdataVendor: builder.query({
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
  useVendorWisePurchaseQuery,
  useFetchDataQuery,
  useGetGlobalsearchVendorQuery,
  useGetSelectedColumnsVendorQuery,
  useGetexportdataVendorQuery,
} = purchaseVendorWiseApi;
