import { apiSlice } from "../../apis/apiSlice";

export const salesSoWiseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    soWiseSales: builder.query({
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

export const { useSoWiseSalesQuery } = salesSoWiseApi;
