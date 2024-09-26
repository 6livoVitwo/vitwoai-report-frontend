import { apiSlice } from "../../apis/apiSlice";

export const graphApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    dynamicNew: builder.query({
      query: ({ endpoint, body, method }) => {
        console.log('🟢in the query 10');
        console.log({endpoint, body, method });
        return ({
          url: endpoint,
          method: "GET",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        })
      },
    }),
  }),
});

export const { useDynamicNewQuery } = graphApi;
