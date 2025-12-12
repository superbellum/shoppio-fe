import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export interface AppState {
  createShoppingListModality: {
    isVisible: boolean;
  };
  createShoppingListItemModality: {
    isVisible: boolean;
    itemId?: string;
  };
  activeShoppingListTabIndex: number;
}

const initialState: AppState = {
  createShoppingListModality: {
    isVisible: false,
  },
  createShoppingListItemModality: {
    isVisible: false,
    itemId: undefined,
  },
  activeShoppingListTabIndex: 0,
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
    setCreateShoppingListItemModality(state: AppState, action: PayloadAction<{ isVisible: boolean, itemId?: string }>) {
      return {
        ...state,
        createShoppingListItemModality: action.payload,
      };
    },
    setActiveShoppingListTabIndex(state: AppState, action: PayloadAction<number>) {
      state.activeShoppingListTabIndex = action.payload;
    }
  }
});

export const {
  setCreateShoppingListModality,
  setCreateShoppingListItemModality,
  setActiveShoppingListTabIndex,
} = appSlice.actions;

export default appSlice;