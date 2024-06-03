import { configureStore } from '@reduxjs/toolkit';
import { salesApi } from '../modules/salesProductWise/slice/salesBySlice';
import themeReducer from '../modules/global/slice/index';
import authReducer from '../router/slice/index';

const store = configureStore({
	reducer: {
		theme: themeReducer,
		auth: authReducer,
		[salesApi.reducerPath]: salesApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(salesApi.middleware),
});

export default store;
