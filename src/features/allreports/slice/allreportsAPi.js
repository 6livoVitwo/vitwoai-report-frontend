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
    }),
});

export const {
    useGetAllReportsProductQuery,
    useGetAllReportsVendorQuery,
    useGetAllReportsSalesProductQuery,
    useGetAllReportsSalesCustomerQuery,
    useGetAllReportsSalesKamQuery,

} = allReportsApi;
