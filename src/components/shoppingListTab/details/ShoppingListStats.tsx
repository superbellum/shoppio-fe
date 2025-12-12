import type {IShoppingList} from "../../../model/entity/IShoppingList.ts";
import ShoppingListProgress from "./ShoppingListProgress.tsx";
import ShoppingListPriorities from "./ShoppingListPriorities.tsx";

export interface ShoppingListStatsProps {
  shoppingList: IShoppingList;
}

export default function ShoppingListStats({shoppingList}: ShoppingListStatsProps) {
  return (
    <div className="grid">
      <div className="col-7">
        <ShoppingListProgress shoppingList={shoppingList}/>
      </div>

      <div className="col-5">
        <ShoppingListPriorities shoppingList={shoppingList}/>
      </div>
    </div>
  );
}
