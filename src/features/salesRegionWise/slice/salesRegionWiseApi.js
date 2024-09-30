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

    // Query to get selected columns dist wise
    getselectedDistWise: builder.query({
      query: () => {
        return {
          url: "/sales/drop-down-data/dist-wise",
          method: "GET",
        };
      },
    }),
    // Query to get selected columns city wise
    getselectedCityWise: builder.query({
      query: () => {
        return {
          url: "/sales/drop-down-data/city-wise",
          method: "GET",
        };
      },
    }),
    // Query to get selected columns country wise
    getselectedCountryWise: builder.query({
      query: () => {
        return {
          url: "/sales/drop-down-data/country-wise",
          method: "GET",
        };
      },
    }),
    // Query to get selected columns Pincode wise
    getselectedPincodeWise: builder.query({
      query: () => {
        return {
          url: "/sales/drop-down-data/pincode-wise",
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useRegionWiseSalesQuery,
  useGetselectedDistWiseQuery,
  useGetselectedCityWiseQuery,
  useGetselectedCountryWiseQuery,
  useGetselectedPincodeWiseQuery,
} = salesRegionWiseApi;
