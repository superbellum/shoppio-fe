import type {IShoppingList} from "../model/entity/IShoppingList";
import ShoppingListTabDetails from "./ShoppingListTabDetails";
import ShoppingListTabItems from "./ShoppingListTabItems";

export interface ShoppingListTabProps {
  shoppingList: IShoppingList;
}

export default function ShoppingListTab({shoppingList}: ShoppingListTabProps) {

  return (
    <div className="grid">
      <div className="col-4">
        <ShoppingListTabDetails shoppingList={shoppingList}/>
      </div>

      <div className="col-8">
        <ShoppingListTabItems  items={shoppingList.items} shoppingListId={shoppingList.id}/>
      </div>
    </div>
  );
}
