// import { apiSlice } from "../../apis/apiSlice";

// export const customerWiseSalesApi = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     customerWiseSales: builder.query({
//       query: ({ filters, page }) => ({
//         url: `sales/sales-groupby-data`,
//         method: "POST",
//         body: JSON.stringify(filters),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }),
//     }),
//   }),
// });

// export const { useCustomerWiseSalesQuery } = customerWiseSalesApi;

import { apiSlice } from "../../apis/apiSlice";

export const customerWiseSalesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    customerWiseSales: builder.query({
      query: ({ filters, page }) => {
        const body = JSON.stringify({ ...filters, page });
        // const body = JSON.stringify(filters);
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
  }),
});

export const { useCustomerWiseSalesQuery } = customerWiseSalesApi;
