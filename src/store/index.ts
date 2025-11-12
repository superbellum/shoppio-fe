import { type Action, combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const reducerMapping = {
  // [assetsSlice.name]: assetsSlice.reducer,
};

export type RootState = {
  [K in keyof typeof reducerMapping]: ReturnType<typeof reducerMapping[K]>
};

const combinedReducer = combineReducers(reducerMapping);

const rootReducer = (state: RootState | undefined, action: Action) => combinedReducer(state, action);

export const store = configureStore({ reducer: rootReducer });

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
