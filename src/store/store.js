import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/global/slice/index";
import authReducer from "../router/slice/index";
import { apiSlice } from "../features/apis/apiSlice";
import dashboardReducer from "../features/dashboardNew/slice/graphSlice";
import salescustomerReducer from "../features/salesCustomerWise/slice/graphSlice";
import colorReducer from "../features/graphCharts/slice/colorTheme";
import graphSlice from "../features/nivoGraphs/chartConfigurations/graphSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    colors: colorReducer,
    auth: authReducer,
    dashboard: dashboardReducer,
    salescustomer: salescustomerReducer,
    graphSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
