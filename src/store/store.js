import { configureStore } from "@reduxjs/toolkit";
import { salesApi } from "../modules/salesProductWise/slice/salesBySlice";
import { purchasesApi } from "../modules/purchaseProductWise/slice/purchaseBySlice";
import themeReducer from "../modules/global/slice/index";
import authReducer from "../router/slice/index";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    [salesApi.reducerPath]: salesApi.reducer,
    [purchasesApi.reducerPath]: purchasesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(salesApi.middleware)
      .concat(purchasesApi.middleware),
});

export default store;
