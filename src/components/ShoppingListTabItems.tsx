import type {IShoppingListItem} from "../model/entity/IShoppingListItem.ts";

export interface ShoppingListTabItemsProps {
  items: IShoppingListItem[];
}

export default function ShoppingListTabItems({items}: ShoppingListTabItemsProps) {
  return (
    <>
      <h2 className="mb-5">
        <i className="pi pi-list text-2xl mr-2"></i>
        Items
      </h2>

      {items.length > 0
        ? items.map(item => <p>{item.name}</p>)
        : <span className="font-italic"> -- no items --</span>}
    </>
  );
}
