import { apiSlice } from "../../apis/apiSlice";

export const graphApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    dynamicNewForSo: builder.query({
      query: ({ endpoint, body, method }) => {
        console.log('🟢in the query 20');
        console.log({endpoint, body, method });
        return ({
          url: endpoint,
          method: method
        })
      },
    }),
  }),
});

export const { useDynamicNewForSoQuery } = graphApi;
