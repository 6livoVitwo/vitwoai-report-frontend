import { apiSlice } from "../../apis/apiSlice";

export const customerWiseSalesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    customerWiseSales: builder.query({
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

    // Query to get global search
     getGlobalsearchCustomer: builder.query({
      query: (body) => {
        // console.log("body_piyas",body)
        return {
          url: "/sales/global-search/customer",
          method: "POST",
          body: JSON.stringify(body),
        };
      },
    }), 
  }),
});

export const { useCustomerWiseSalesQuery, useGetGlobalsearchCustomerQuery } = customerWiseSalesApi;
