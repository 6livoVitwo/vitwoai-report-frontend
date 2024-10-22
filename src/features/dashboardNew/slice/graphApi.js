import { apiSlice } from "../../apis/apiSlice";

export const graphApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        dynamicNew: builder.query({
            query: ({ endpoint, body }) => ({
                url: endpoint,
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                }
            }),
        }),
        getAllProducts: builder.query({
            query: ({ endpoint, method, body }) => ({
                url: endpoint,
                method: method,
                body: JSON.stringify(body),
            }),
        })
    }),
})

export const { useDynamicNewQuery, useGetAllProductsQuery } = graphApi;