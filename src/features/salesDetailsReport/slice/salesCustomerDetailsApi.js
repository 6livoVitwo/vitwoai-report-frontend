import { apiSlice } from '../../apis/apiSlice';

export const salesCustomerDetailsApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		customerDetailSales: builder.query({
			query: ({ page, filters }) => ({
				url: `sales/salesdata-adv-filter?pageNumber=${page}&pageSize=10`,
				method: 'POST',
				body: JSON.stringify(filters),
				headers: {
					'Content-Type': 'application/json',
				},
			}),
		}),
	}),
});

export const { useCustomerDetailSalesQuery } = salesCustomerDetailsApi;
