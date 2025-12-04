import {configureStore} from "@reduxjs/toolkit";
import {type TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import shoppingListSlice from "./slices/shoppingListSlice";
import appSlice from "./slices/appSlice.ts";

const reducerMapping = {
  [shoppingListSlice.name]: shoppingListSlice.reducer,
  [appSlice.name]: appSlice.reducer,
};

export type RootState = {
  [K in keyof typeof reducerMapping]: ReturnType<typeof reducerMapping[K]>
};

export const store = configureStore({
  reducer: reducerMapping,
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
