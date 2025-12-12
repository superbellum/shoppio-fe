import type {IShoppingList} from "../../../model/entity/IShoppingList.ts";
import {InputTextarea} from "primereact/inputtextarea";
import ShoppingListTimeline from "./ShoppingListTimeline.tsx";
import ShoppingListStats from "./ShoppingListStats.tsx";

export interface ShoppingListTabDetailsProps {
  shoppingList: IShoppingList;
}

export default function ShoppingListDetails({shoppingList}: ShoppingListTabDetailsProps) {
  return (
    <div className="grid">
      <div className="col-3 bg-green-100 border-round">
        <ShoppingListTimeline shoppingList={shoppingList}/>
      </div>

      <div className="col-6 bg-orange-100 border-round">
        <ShoppingListStats shoppingList={shoppingList}/>
      </div>

      <div className="col-3 bg-blue-100 border-round">
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
