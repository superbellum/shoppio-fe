import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export interface AppState {
  createShoppingListModality: {
    isVisible: boolean;
  };
  createShoppingListItemModality: {
    isVisible: boolean;
    itemId?: string;
  };
}

const initialState: AppState = {
  createShoppingListModality: {
    isVisible: false,
  },
  createShoppingListItemModality: {
    isVisible: false,
    itemId: undefined,
  },
};

const appSlice = createSlice({
  name: "appState",
  initialState: initialState,
  reducers: {
    setCreateShoppingListModality(state: AppState, action: PayloadAction<{ isVisible: boolean }>) {
      return {
        ...state,
        createShoppingListModality: action.payload,
      };
    },
    setCreateShoppingListItemModality(state: AppState, action: PayloadAction<{
      isVisible: boolean,
      itemId?: string
    }>) {
      return {
        ...state,
        createShoppingListItemModality: action.payload,
      };
    },
  }
});

export const {
  setCreateShoppingListModality,
  setCreateShoppingListItemModality,
} = appSlice.actions;

export default appSlice;