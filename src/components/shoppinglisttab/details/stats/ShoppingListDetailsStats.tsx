import type {IShoppingList} from "../../../../model/entity/IShoppingList.ts";

export interface ShoppingListDetailsStatsProps {
  shoppingList: IShoppingList;
}

export default function ShoppingListDetailsStats({shoppingList}: ShoppingListDetailsStatsProps) {
  return (
    <div>
      shop list det stats
    </div>
  );
}
