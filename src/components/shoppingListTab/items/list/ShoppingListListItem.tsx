import type {IShoppingListItem} from "../../../../model/entity/IShoppingListItem.ts";
import {classNames} from "primereact/utils";
import {Tag} from "primereact/tag";
import {Button} from "primereact/button";

export interface ShoppingListListItemProps {
  item: IShoppingListItem;
  index: number;
}

export default function ShoppingListListItem({item, index}: ShoppingListListItemProps) {
// todo
  return (
    <div className="col-12">
      <div
        className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', {'border-top-1 surface-border': index !== 0})}>
        <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
             src={item.imageUrl} alt={item.name}/>
        <div
          className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
          <div className="flex flex-column align-items-center sm:align-items-start gap-3">
            <div className="text-2xl font-bold text-900">{item.name}</div>
            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{item.priority}</span>
                                </span>
              <Tag value={item.status}></Tag>
            </div>
          </div>
          <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
            <span className="text-2xl font-semibold">${item.link}</span>
            <Button icon="pi pi-shopping-cart" className="p-button-rounded"
                    ></Button>
          </div>
        </div>
      </div>
    </div>
  );
}