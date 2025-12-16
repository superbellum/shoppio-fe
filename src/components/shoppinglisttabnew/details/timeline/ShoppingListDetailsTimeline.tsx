import type {IShoppingList} from "../../../../model/entity/IShoppingList.ts";

export interface ShoppingListDetailsTimelineProps {
  shoppingList: IShoppingList;
}

export default function ShoppingListDetailsTimeline({shoppingList}: ShoppingListDetailsTimelineProps) {
  return (
    <div>
      shop list timeline
    </div>
  );
}
