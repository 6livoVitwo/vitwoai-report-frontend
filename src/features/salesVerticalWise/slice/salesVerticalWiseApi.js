import { apiSlice } from "../../apis/apiSlice";

export const salesVerticalWiseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    verticalWiseSales: builder.query({
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
    getSelectedColumnsVertical:builder.query({
      query:() =>'/sales/drop-down-data/vertical',
    }),
     // Query to get global search
     getGlobalsearchVertical: builder.query({
      query: (body) => {
        // console.log("imran body", body);
        // console.log("json body");
        // console.log(JSON.stringify(body));
        return {
          url: "/sales/global-search/vertical",
          method: "POST",
          body: JSON.stringify(body),
        };
      },
    }),


  }),
});

export const { useVerticalWiseSalesQuery,useGetSelectedColumnsVerticalQuery,useGetGlobalsearchVerticalQuery} = salesVerticalWiseApi;

