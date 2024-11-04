import { apiSlice } from "../../apis/apiSlice";

export const salesSoWiseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    soWiseSales: builder.query({
      query: ({ filters, page }) => {
        const body = JSON.stringify({ ...filters, page });
        return {
          url: `sales/sales-groupby-data`,
          method: "POST",
          body
        };
      },
    }),
    // Query to get selected columns
    getSelectedColumnsSo: builder.query({
      query: () => "/sales/drop-down-data/so",
    }),

    // Query to get global search
    getGlobalsearch: builder.query({
      query: (body) => {
        return {
          url: "/sales/global-search/so",
          method: "POST",
          body: JSON.stringify(body)
        };
      },
    }),
  }),
});

export const {
  useSoWiseSalesQuery,
  useGetSelectedColumnsSoQuery,
  useGetGlobalsearchQuery,
} = salesSoWiseApi;
