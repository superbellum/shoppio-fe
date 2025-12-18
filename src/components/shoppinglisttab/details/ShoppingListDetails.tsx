import type {IShoppingList} from "../../../model/entity/IShoppingList.ts";
import ShoppingListDetailsTimeline from "./timeline/ShoppingListDetailsTimeline.tsx";
import ShoppingListDetailsStats from "./stats/ShoppingListDetailsStats.tsx";

export interface ShoppingListDetailsProps {
  shoppingList: IShoppingList;
}

export default function ShoppingListDetails({shoppingList}: ShoppingListDetailsProps) {
  return (
    <div>
      {/*todo: description*/}
      desc

      {/*todo: timeline*/}
      <ShoppingListDetailsTimeline shoppingList={shoppingList}/>

      {/*todo: stats*/}
      <ShoppingListDetailsStats shoppingList={shoppingList}/>
    </div>
  );
}
