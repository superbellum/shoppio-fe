import type {IShoppingList} from "../../../model/entity/IShoppingList.ts";
import {InputTextarea} from "primereact/inputtextarea";
import ShoppingListDates from "./ShoppingListDates.tsx";
import ShoppingListProgress from "./ShoppingListProgress.tsx";
import ShoppingListPriorities from "./ShoppingListPriorities.tsx";

export interface ShoppingListTabDetailsProps {
  shoppingList: IShoppingList;
}

export default function ShoppingListDetails({shoppingList}: ShoppingListTabDetailsProps) {
  return (
    <div className="grid">
      <div className="col-3">
        <ShoppingListDates shoppingList={shoppingList}/>
      </div>

      <div className="col-3">
        <ShoppingListProgress shoppingList={shoppingList}/>
      </div>

      <div className="col-3">
        <ShoppingListPriorities shoppingList={shoppingList}/>
      </div>

      <div className="col-3">
        <h3 className="mb-2">
          <i className="pi pi-book mr-2"></i>
          Description
        </h3>
        <InputTextarea
          name="shopListDesc"
          autoResize
          value={shoppingList.description}
          readOnly
          // onChange={(e) => setValue(e.target.value)}
          rows={3}
          className="w-11"
        />
      </div>
    </div>
  );
}
