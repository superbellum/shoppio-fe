import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {IShoppingList} from "../../model/entity/IShoppingList";
import type {IShoppingListItem} from "../../model/entity/IShoppingListItem.ts";
import {Status} from "../../model/entity/Status.ts";

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
    completeItem(state: ShoppingListState, action: PayloadAction<IShoppingListItem>) {
      const list = state.find(list => list.id === action.payload.shoppingListId);
      if (!list) {
        return;
      }

      const item = list.items.find(item => item.id === action.payload.id);
      if (item) {
        item.status = Status.COMPLETED;
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
  completeItem,
} = shoppingListSlice.actions;

export default shoppingListSlice;
