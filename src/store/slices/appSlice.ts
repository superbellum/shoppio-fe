import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export interface AppState {
  createShoppingListModalityProps: {
    isVisible: boolean;
  };
  createShoppingListItemModalityProps: {
    isVisible: boolean;
    shoppingListId?: string;
  };
  editShoppingListModalityProps: {
    isVisible: boolean;
    id?: string;
  },
  editShoppingListItemModalityProps: {
    isVisible: boolean;
    itemId?: string;
  },
  activeShoppingListTabIndex: number;
}

const initialState: AppState = {
  createShoppingListModalityProps: {
    isVisible: false,
  },
  createShoppingListItemModalityProps: {
    isVisible: false,
    shoppingListId: undefined,
  },
  editShoppingListModalityProps: {
    isVisible: false,
    id: undefined,
  },
  editShoppingListItemModalityProps: {
    isVisible: false,
    itemId: undefined,
  },
  activeShoppingListTabIndex: 0,
};

const appSlice = createSlice({
  name: "appState",
  initialState: initialState,
  reducers: {
    setCreateShoppingListModalityProps(state: AppState, action: PayloadAction<{ isVisible: boolean }>) {
      return {
        ...state,
        createShoppingListModalityProps: action.payload,
      };
    },
    setCreateShoppingListItemModalityProps(state: AppState, action: PayloadAction<{
      isVisible: boolean,
      shoppingListId?: string
    }>) {
      return {
        ...state,
        createShoppingListItemModalityProps: action.payload,
      };
    },
    setEditShoppingListModalityProps(state: AppState, action: PayloadAction<{ isVisible: boolean, id?: string }>) {
      return {
        ...state,
        editShoppingListModalityProps: action.payload,
      };
    },
    setEditShoppingListItemModalityProps(state: AppState, action: PayloadAction<{
      isVisible: boolean,
      itemId?: string
    }>) {
      return {
        ...state,
        editShoppingListItemModalityProps: action.payload,
      };
    },
    setActiveShoppingListTabIndex(state: AppState, action: PayloadAction<number>) {
      state.activeShoppingListTabIndex = action.payload;
    }
  }
});

export const {
  setCreateShoppingListModalityProps,
  setCreateShoppingListItemModalityProps,
  setEditShoppingListModalityProps,
  setEditShoppingListItemModalityProps,
  setActiveShoppingListTabIndex,
} = appSlice.actions;

export default appSlice;