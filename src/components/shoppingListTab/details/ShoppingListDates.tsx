import Icon from "../../molecules/Icon.tsx";
import formatDate from "../../../utils/formatDate.ts";
import type {IShoppingList} from "../../../model/entity/IShoppingList.ts";

export interface ShoppingListDatesProps {
  shoppingList: IShoppingList;
}

export default function ShoppingListDates({shoppingList}: ShoppingListDatesProps) {
  return (
    <div className="flex flex-column text-lg h-full justify-content-around">
      <p className="align-items-center flex">
        <Icon
          iconClassName="pi pi-calendar-plus text-xl mr-2"
          tooltip={{text: "Created", showDelay: 500}}
        />
        {formatDate(shoppingList.createdDate)}
      </p>

      <p className="align-items-center flex">
        <Icon
          iconClassName="pi pi-file-edit text-xl mr-2"
          tooltip={{text: "Last Modified", showDelay: 500}}
        />
        {formatDate(shoppingList.lastModifiedDate)}
      </p>

      <p className="align-items-center flex">
        <Icon
          iconClassName="pi pi-bullseye text-xl mr-2"
          tooltip={{text: "Due", showDelay: 500}}
        />
        {shoppingList.dueDate
          ? formatDate(shoppingList.dueDate)
          : <span className="font-italic"> -- not set --</span>}
      </p>
    </div>
  );
}
