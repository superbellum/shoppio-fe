import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {IShoppingList} from "../../model/entity/IShoppingList";

export type ShoppingListState = IShoppingList[];

const shoppingListSlice = createSlice({
  name: "shoppingLists",
  initialState: [] as IShoppingList[],
  reducers: {
    saveShoppingLists(state: ShoppingListState, action: PayloadAction<IShoppingList[]>) {
      return action.payload;
    }
  },
});

export const {saveShoppingLists} = shoppingListSlice.actions;
export default shoppingListSlice;
