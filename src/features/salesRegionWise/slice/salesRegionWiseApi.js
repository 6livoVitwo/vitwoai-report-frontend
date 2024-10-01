import { apiSlice } from "../../apis/apiSlice";

export const salesRegionWiseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    RegionWiseSales: builder.query({
      query: ({ filters, page }) => {
        const body = JSON.stringify({ ...filters, page });
        return {
          url: `sales/sales-groupby-data`,
          method: "POST",
          body,
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),

     // Query to get selected columns
     getSelectedStateWise: builder.query({
      query: () => {
        return {
          url: "/sales/drop-down-data/state-wise",
          method: "GET",
        }
      },
    }),
  }),

});

export const { useRegionWiseSalesQuery,useGetSelectedStateWiseQuery } = salesRegionWiseApi;
