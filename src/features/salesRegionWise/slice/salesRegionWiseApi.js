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
    getselectedPincodeWise: builder.query({
      query: () => {
        return {
          url: "/sales/drop-down-data/pincode-wise",
          method: "GET",
        };
      },
    }),
    getselectedStateWise: builder.query({
      query: () => {
        return {
          url: "/sales/drop-down-data/state-wise",
          method: "GET",
        };
      },
    }),
    // Query to get global search state
    getGlobalsearchState: builder.query({
      query: (body) => {
        ;
        return {
          url: "/sales/global-search/region/state",
          method: "POST",
          body: JSON.stringify(body),
        };
      },
    }),
    // Query to get global search pincode
    getGlobalsearchPincode: builder.query({
      query: (body) => {
        ;
        return {
          url: "/sales/global-search/region/pincode",
          method: "POST",
          body: JSON.stringify(body),
        };
      },
    }),
    // Query to get global search dist
    getGlobalsearchDist: builder.query({
      query: (body) => {
        ;
        return {
          url: "/sales/global-search/region/dist",
          method: "POST",
          body: JSON.stringify(body),
        };
      },
    }),
    // Query to get global search country
    getGlobalsearchCountry: builder.query({
      query: (body) => {
        ;
        return {
          url: "/sales/global-search/region/country",
          method: "POST",
          body: JSON.stringify(body),
        };
      },
    }),
    // Query to get global search city
    getGlobalsearchCity: builder.query({
      query: (body) => {
        ;
        return {
          url: "/sales/global-search/region/city",
          method: "POST",
          body: JSON.stringify(body),
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
  useGetselectedStateWiseQuery,
  useGetGlobalsearchStateQuery,
  useGetGlobalsearchPincodeQuery,
  useGetGlobalsearchDistQuery,
  useGetGlobalsearchCountryQuery,
  useGetGlobalsearchCityQuery,
} = salesRegionWiseApi;
