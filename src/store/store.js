import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/global/slice/index";
import authReducer from "../router/slice/index";
import { apiSlice } from "../features/apis/apiSlice";
import dashboardReducer from "../features/dashboardNew/slice/graphSlice";
import salescustomerReducer from "../features/salesCustomerWise/slice/graphSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    dashboard: dashboardReducer,
    salescustomer: salescustomerReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
