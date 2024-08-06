import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/global/slice/index";
import authReducer from "../router/slice/index";
import { apiSlice } from "../features/apis/apiSlice";
import dashboardReducer from "../features/dashboardNew/slice/graphSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    dashboard: dashboardReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
