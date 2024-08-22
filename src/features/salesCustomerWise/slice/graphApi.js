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
        },
      }),
    }),
  }),
});

export const { useDynamicNewQuery } = graphApi;
