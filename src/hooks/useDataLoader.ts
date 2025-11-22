import {useCallback} from "react";
import type {IShoppingList} from "../model/entity/IShoppingList";
import axios from "axios";
import {useAppDispatch} from "../store";
import {saveShoppingLists} from "../store/slices/shoppingListSlice";

export default function useDataLoader() {
  const dispatch = useAppDispatch()

  const loadShoppingLists = useCallback(async () => {
    const response = await axios.get<IShoppingList[]>("http://localhost:8080/api/shopping-list");

    if (response.status === 200) {
      dispatch(saveShoppingLists(response.data));
    }
  }, [dispatch]);

  return {loadShoppingLists};
}