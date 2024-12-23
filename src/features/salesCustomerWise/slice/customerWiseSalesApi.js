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
        return {
          url: "/sales/global-search/customer",
          method: "POST",
          body: JSON.stringify(body),
        };
      },
    }),

    // Query to get selected columns
    getSelectedColumnscustomer: builder.query({
      query: () => "/sales/drop-down-data/customer",
    }),
    //export to excel date wise
    getexportdataSalesCustomer: builder.query({
      query: (body) => {
        return {
          url: "/sales/download-data",
          method: "POST",
          body: JSON.stringify(body),
        };
      },
    }),
  }),
});

export const { useCustomerWiseSalesQuery, useGetGlobalsearchCustomerQuery, useGetSelectedColumnscustomerQuery, useGetexportdataSalesCustomerQuery } =
  customerWiseSalesApi;
