import { apiSlice } from "../../apis/apiSlice";

export const graphApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    dynamicNew: builder.query({
      query: ({ endpoint, body, method }) => {
        console.log('🟢💚 imss', { endpoint, body, method })
        if (method === "GET") {
          return ({
            url: endpoint,
            method: method,
            headers: {
              "Content-Type": "application/json",
            },
          })
        }
        return ({
          url: endpoint,
          method: method,
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
