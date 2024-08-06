import { apiSlice } from "../../apis/apiSlice";

export const graphApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // graph: builder.query({
        //     query: (data) => ({
        //         url: `/sales/sales-graph-two`,
        //         method: "POST",
        //         body: JSON.stringify(data),
        //         headers: {
        //             "Content-Type": "application/json",
        //         }
        //     }),
        // }),
        dynamicNew: builder.query({
            query: ({endpoint, body}) => ({
                url: endpoint,
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                }
            }),
        }),
    }),
})

export const { useDynamicNewQuery } = graphApi;