import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const salesApi = createApi({
	reducerPath: 'salesApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:8080',
		prepareHeaders: (headers) => {
			const token = localStorage.getItem('authToken');
			if (token) {
				headers.set('Authorization', `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({
		fetchSales: builder.query({
			query: ({ first }) =>
				`/sales/salesdata?pageNumber=${first}&pageSize=5&sortBy=so_invoice_id&sortDir=asc`, // Adjust the endpoint URL
		}),
	}),
});

export const { useFetchSalesQuery } = salesApi;