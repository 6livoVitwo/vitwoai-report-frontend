import { apiSlice } from "../../apis/apiSlice";

export const allReportsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //Api call for product description
        getAllReportsProduct: builder.query({
            query: () => ({
                url: "/purchase/product-desc",
                method: "GET",
            }),
        }),
        //Api call for vendor description
        getAllReportsVendor: builder.query({
            query: () => ({
                url: "purchase/vendor-desc",
                method: "GET",
            }),
        }),
        // //Api call for Po description
        getAllReportsPo: builder.query({
            query: () => ({
                url: "purchase/po-desc",
                method: "GET",
            }),
        }),
        //Api call for functional area description
        getAllReportsFunctional: builder.query({
            query: () => ({
                url: "/purchase/functional-area-desc",
                method: "GET",
            }),
        }),
        
        //Api call for Sales product description
        getAllReportsSalesProduct: builder.query({
            query: () => ({
                url: "/sales/product-desc",
                method: "GET",
            }),
        }),
        //Api call for Sales customer description
        getAllReportsSalesCustomer: builder.query({
            query: () => ({
                url: "/sales/customer-desc",
                method: "GET",
            }),
        }),
        //Api call for Sales Kam description
        getAllReportsSalesKam: builder.query({
            query: () => ({
                url: "/sales/kam-desc",
                method: "GET",
            }),
        }),
        // //Api call for Sales vertical description
        getAllReportsSalesVertical: builder.query({
            query: () => ({
                url: "/sales/vertical-desc",
                method: "GET",
            }),
        }),
        // //Api call for Sales So description
        getAllReportsSalesSo: builder.query({
            query: () => ({
                url: "/sales/so-desc",
                method: "GET",
            }),
        }),
        //Api call for Sales region  description
        getAllReportsSalesRegion: builder.query({
            query: () => ({
                url: "/sales/region-desc",
                method: "GET",
            }),
        }),
    }),
});

export const {
    useGetAllReportsProductQuery,
    useGetAllReportsVendorQuery,
    useGetAllReportsPoQuery,
    useGetAllReportsFunctionalQuery,
    useGetAllReportsSalesProductQuery,
    useGetAllReportsSalesCustomerQuery,
    useGetAllReportsSalesKamQuery,
    useGetAllReportsSalesVerticalQuery,
    useGetAllReportsSalesSoQuery,
    useGetAllReportsSalesRegionQuery,
} = allReportsApi;
