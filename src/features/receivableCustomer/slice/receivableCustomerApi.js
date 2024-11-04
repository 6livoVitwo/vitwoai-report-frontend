import { apiSlice } from "../../apis/apiSlice";

export const receivableCustomerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    receivableCustomer: builder.query({
      query: ({ endpoint, method, body }) => {
        return {
          url: endpoint,
          method: method,
          body
        };
      },
    }),
  }),
});

export const {
  useReceivableCustomerQuery,
} = receivableCustomerApi;
