import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {IShoppingList} from "../../model/entity/IShoppingList";
import type {IShoppingListItem} from "../../model/entity/IShoppingListItem.ts";

export type ShoppingListState = IShoppingList[];

const shoppingListSlice = createSlice({
  name: "shoppingLists",
  initialState: [] as IShoppingList[],
  reducers: {
    saveShoppingLists(state: ShoppingListState, action: PayloadAction<IShoppingList[]>) {
      return action.payload;
    },
    appendShoppingList(state: ShoppingListState, action: PayloadAction<IShoppingList>) {
      state.push(action.payload);
    },
    removeShoppingListById(state: ShoppingListState, action: PayloadAction<string>) {
      return state.filter(list => list.id !== action.payload);
    },
    addItemToShoppingList(state: ShoppingListState, action: PayloadAction<IShoppingListItem>) {
      const list = state.find(list => list.id === action.payload.shoppingListId);
      if (!list) {
        return;
      }

      list.items.push(action.payload);
    },
    deleteItemFromList(state: ShoppingListState, action: PayloadAction<IShoppingListItem>) {
      const list = state.find(list => list.id === action.payload.shoppingListId);
      if (!list) {
        return;
      }

      list.items = list.items.filter(item => item.id !== action.payload.id);
    },
    updateItem(state: ShoppingListState, action: PayloadAction<IShoppingListItem>) {
      const list = state.find(list => list.id === action.payload.shoppingListId);
      if (!list) {
        return;
      }

      const itemIdx = list.items.findIndex(item => item.id === action.payload.id);
      if (itemIdx !== -1) {
        list.items[itemIdx] = action.payload;
      }
    },
  },
});

export const {
  saveShoppingLists,
  appendShoppingList,
  removeShoppingListById,
  addItemToShoppingList,
  deleteItemFromList,
  updateItem,
} = shoppingListSlice.actions;

export default shoppingListSlice;
