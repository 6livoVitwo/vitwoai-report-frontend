import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const customFetchBaseQuery = ({ baseUrl }) => {
	const baseQuery = fetchBaseQuery({ baseUrl });

	return async (args, api, extraOptions) => {
		if (args.body && args.method === 'GET') {
			// Custom handling for GET requests with body
			const { url, ...rest } = args;
			return fetch(`${baseUrl}${url}`, {
				...rest,
				method: 'POST', // Temporarily change to POST to send body
				headers: {
					...rest.headers,
					'X-HTTP-Method-Override': 'GET', // Use method override header
				},
			}).then(async (response) => {
				// Ensure response is in the same format as fetchBaseQuery
				return baseQuery(
					{ url, response, ...rest, method: 'GET' },
					api,
					extraOptions
				);
			});
		}

		return baseQuery(args, api, extraOptions);
	};
};

const BASE_URL =
	process.env.REACT_APP_API_BASE_URL || 'http://192.168.0.133:8080';

export const salesApi = createApi({
	reducerPath: 'salesApi',
	baseQuery: customFetchBaseQuery({ baseUrl: BASE_URL }),
	endpoints: (builder) => ({
		fetchSales: builder.query({
			query: ({ page = 1, arrayParam = [] }) => ({
				url: `/sales/salesdata-adv-filter?pageNumber=${page}&pageSize=50&sortBy=so_invoice_id&sortDir=asc`,
				method: 'GET',
				body: arrayParam, // Attach the array as the body
			}),
		}),
	}),
});

export const { useFetchSalesQuery } = salesApi;
