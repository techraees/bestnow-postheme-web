// store/store.ts

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer"; // Import the combined rootReducer
import { middlewares } from "./middlewares"; // Import the custom middlewares

const store = configureStore({
  reducer: rootReducer, // Apply the rootReducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares), // Apply custom middlewares
  // devTools: process.env.NODE_ENV !== 'production',
  devTools:
    process.env.NODE_ENV === "production" ||
    process.env.NODE_ENV === "development",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
