import type {IShoppingList} from "../model/entity/IShoppingList";
import ShoppingListTabDetails from "./ShoppingListTabDetails";
import ShoppingListTabItems from "./ShoppingListTabItems.tsx";

export interface ShoppingListTabProps {
  shoppingList: IShoppingList;
}

export default function ShoppingListTab({shoppingList}: ShoppingListTabProps) {

  return (
    <div className="grid">
      <div className="col-4 bg-primary-100">
        <ShoppingListTabDetails shoppingList={shoppingList}/>
      </div>

      <div className="col-8 bg-green-100">
        <ShoppingListTabItems items={shoppingList.items}/>
      </div>
    </div>
  );
}
