import { configureStore } from "@reduxjs/toolkit";
import cartItemReducer from "../slice/cartItem";
import itemReducer from "../slice/items";
import modalReducer from "../slice/modal";
import restItemQuentityReducer from "../slice/restItemQuentity";

export const store = configureStore({
  reducer: {
    items: itemReducer,
    modalState: modalReducer,
    cartItem: cartItemReducer,
    restItemNum: restItemQuentityReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
