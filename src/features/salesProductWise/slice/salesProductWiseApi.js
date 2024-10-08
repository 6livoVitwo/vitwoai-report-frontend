import { apiSlice } from "../../apis/apiSlice";

export const salesProductWiseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    productWiseSales: builder.query({
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
    getSelectedColumns: builder.query({
      query: () => "/sales/drop-down-data/product",
    }),

    // Query to get global search
    getGlobalsearchProduct: builder.query({
      query: (body) => {
        // console.log("imran body", body);
        // console.log("json body");
        // console.log(JSON.stringify(body));
        return {
          url: "/sales/global-search/product",
          method: "POST",
          body: JSON.stringify(body),
        };
      },
    }),
  }),
});

export const {
  useProductWiseSalesQuery,
  useGetSelectedColumnsQuery,
  useGetGlobalsearchProductQuery,
} = salesProductWiseApi;
