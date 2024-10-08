import { apiSlice } from '../../apis/apiSlice';

export const purchaseVendorDetailsApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		vendorDetailpurchase: builder.query({
			query: ({ page, filters }) => ({
				url: `purchase/purchasedata-adv-filter?pageNumber=${page}&pageSize=10`,
				method: 'POST',
				body: JSON.stringify(filters),
				headers: {
					'Content-Type': 'application/json',
				},
			}),
		}),
	}),
});

export const { useVendorDetailpurchaseQuery } = purchaseVendorDetailsApi;
