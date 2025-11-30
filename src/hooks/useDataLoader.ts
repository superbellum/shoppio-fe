import {useCallback} from "react";
import type {IShoppingList} from "../model/entity/IShoppingList";
import {useAppDispatch} from "../store";
import {saveShoppingLists} from "../store/slices/shoppingListSlice";
import axios from "axios";

export default function useDataLoader() {
  const dispatch = useAppDispatch()

  const loadShoppingLists = useCallback(async () => {
    const response = await axios.get<IShoppingList[]>("http://localhost:8080/api/shopping-list?withItems=true");

    if (response.status === 200) {
      dispatch(saveShoppingLists(response.data));
    }
  }, [dispatch]);

  return {loadShoppingLists};
}