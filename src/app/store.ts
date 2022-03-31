import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "../slice/items";
import modalReducer from "../slice/modal";

export const store = configureStore({
  reducer: {
    items: itemReducer,
    modalState: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
