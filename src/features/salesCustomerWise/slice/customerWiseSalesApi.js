import { apiSlice } from "../../apis/apiSlice";

export const customerWiseSalesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    customerWiseSales: builder.query({
      query: ({ page, filters }) => ({
        url: `sales/sales-groupby-data`,
        method: "POST",
        body: JSON.stringify(filters),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useCustomerWiseSalesQuery } = customerWiseSalesApi;
