import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const salesApi = createApi({
	reducerPath: 'salesApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://192.168.0.133:8080/',
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
			query: ({ page }) => ({
				url: `sales/salesdata-adv-filter?pageSize=${page}`,
				method: 'POST', // or 'PUT', 'PATCH', etc. depending on your API
				body: JSON.stringify([
					{
						column: 'company_id',
						operator: 'equal',
						type: 'Integer',
						value: 1,
					},
					{
						column: 'location_id',
						operator: 'equal',
						type: 'Integer',
						value: 1,
					},
					{
						column: 'branch_id',
						operator: 'equal',
						type: 'Integer',
						value: 1,
					},
				]),
				headers: {
					'Content-Type': 'application/json', // Set content type to application/json
				},
			}),
		}),
	}),
});

export const { useFetchSalesQuery } = salesApi;
