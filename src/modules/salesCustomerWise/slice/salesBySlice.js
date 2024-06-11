import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const salesApi = createApi({
	reducerPath: 'salesApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:8080/',
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
			query: ({ page, dateRange }) => {
				const { startDate = '2024-01-01', endDate = '2024-12-31' } =
					dateRange || {};
				const formattedDateRange = `${startDate}-${endDate}`;
				return {
					url: `sales/salesdata-adv-filter?pageSize=${page}`,
					method: 'POST',
					body: JSON.stringify([
						{
							column: 'invoice_date',
							operator: 'between',
							type: 'date',
							value: formattedDateRange,
						},
					]),
					headers: {
						'Content-Type': 'application/json',
					},
				};
			},
		}),
	}),
});

export const { useFetchSalesQuery } = salesApi;
