import type {IShoppingList} from "../model/entity/IShoppingList";
import {InputTextarea} from "primereact/inputtextarea";
import formatDate from "../utils/formatDate";

export interface ShoppingListTabDetailsProps {
  shoppingList: IShoppingList;
}

export default function ShoppingListTabDetails({shoppingList}: ShoppingListTabDetailsProps) {
  return (
    <>
      <h2 className="mb-5">
        <i className="pi pi-info-circle text-2xl mr-2"></i>
        Details
      </h2>

      <h3 className="mb-2">
        <i className="pi pi-book mr-2"></i>
        Description
      </h3>
      <InputTextarea
        autoResize
        value={shoppingList.description}
        readOnly
        // onChange={(e) => setValue(e.target.value)}
        rows={5}
        cols={30}
      />

      <h3 className="mb-2 mt-4">
        <i className="pi pi-calendar-clock mr-2"></i>
        Created
      </h3>
      <p>{formatDate(shoppingList.createdDate)}</p>

      <h3 className="mb-2 mt-4">
        <i className="pi pi-calendar-clock mr-2"></i>
        Last Modified
      </h3>
      <p>{formatDate(shoppingList.lastModifiedDate)}</p>


      <h3 className="mb-2 mt-4">
        <i className="pi pi-calendar-clock mr-2"></i>
        Due
      </h3>
      <p>
        {shoppingList.dueDate
          ? formatDate(shoppingList.dueDate)
          : <span className="font-italic"> -- not set --</span>}
      </p>
    </>
  );
}
