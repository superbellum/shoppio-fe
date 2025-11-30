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
      return [...state, action.payload];
    },
    addItemToShoppingList(state: ShoppingListState, action: PayloadAction<IShoppingListItem>) {
      const shoppingList = state.find(list => list.id === action.payload.shoppingListId);
      const otherLists = state.filter(list => list.id != action.payload.shoppingListId);
      const newItems = [...shoppingList.items, action.payload];

      if (shoppingList) {
        return [...otherLists, {...shoppingList, items: newItems}];
      }
    },
  },
});

export const {
  saveShoppingLists,
  appendShoppingList,
  addItemToShoppingList,
} = shoppingListSlice.actions;

export default shoppingListSlice;
