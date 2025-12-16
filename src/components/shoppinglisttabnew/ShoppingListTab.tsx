import type {IShoppingList} from "../../model/entity/IShoppingList.ts";
import ShoppingListDetails from "./details/ShoppingListDetails.tsx";
import ShoppingListItems from "./items/ShoppingListItems.tsx";

export interface ShoppingListTabProps {
  shoppingList: IShoppingList;
}

export default function ShoppingListTab({shoppingList}: ShoppingListTabProps) {
  return (
    <div>
      {/*<ShoppingListDetails shoppingList={shoppingList}/>*/}
      <ShoppingListItems shoppingListItems={shoppingList.items} shoppingListId={shoppingList.id}/>
    </div>
  );
}
