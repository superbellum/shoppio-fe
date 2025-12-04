import type {IShoppingList} from "../../../model/entity/IShoppingList.ts";
import {ProgressBar} from "primereact/progressbar";
import {Status} from "../../../model/entity/Status.ts";
import {Tag} from "primereact/tag";

export interface ShoppingListProgressProps {
  shoppingList: IShoppingList;
}

export default function ShoppingListProgress({shoppingList}: ShoppingListProgressProps) {
  const items = shoppingList.items;
  const numAll = items.length;
  const numCompleted = items.filter(item => item.status === Status.COMPLETED).length;

  return (
    <div className="flex flex-column h-full justify-content-start">
      <div className="mb-4">
        <h3 className="mb-2">
          <i className="pi pi-chart-line text-xl mr-2"></i>
          Progress:
          <Tag severity="info" value={`${numCompleted}/${numAll}`} className="ml-2" rounded/>
        </h3>
        <ProgressBar
          className="mt-3"
          value={numCompleted * 100 / numAll}
        ></ProgressBar>
      </div>

      {/*todo: timeline progress*/}
    </div>
  );
}
