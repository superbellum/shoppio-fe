import Icon from "../../molecules/Icon.tsx";
import formatDate from "../../../utils/formatDate.ts";
import type {IShoppingList} from "../../../model/entity/IShoppingList.ts";
import {ProgressBar} from "primereact/progressbar";
import calculateTimelineProgressValue from "../../../utils/calculateTimelineProgressValue.ts";

export interface ShoppingListDatesProps {
  shoppingList: IShoppingList;
}

export default function ShoppingListTimeline({shoppingList}: ShoppingListDatesProps) {
  const timelineProgressValue = shoppingList.dueDate
    ? calculateTimelineProgressValue(shoppingList.createdDate, shoppingList.dueDate)
    : undefined;

  return (
    <div className="flex flex-column text-lg h-full justify-content-start gap-3">
      <p className="align-items-center flex">
        <Icon
          iconClassName="pi pi-calendar-plus text-xl mr-2 text-primary"
          tooltip={{text: "Created", showDelay: 500}}
        />
        {formatDate(shoppingList.createdDate)}
      </p>

      <p className="align-items-center flex">
        <Icon
          iconClassName="pi pi-file-edit text-xl mr-2 text-primary"
          tooltip={{text: "Edited", showDelay: 500}}
        />
        {formatDate(shoppingList.lastModifiedDate)}
      </p>

      <p className="align-items-center flex">
        <Icon
          iconClassName="pi pi-flag text-xl mr-2 text-primary"
          tooltip={{text: "Due", showDelay: 500}}
        />
        {shoppingList.dueDate
          ? formatDate(shoppingList.dueDate)
          : <span className="font-italic"> -- not set --</span>}
      </p>

      {shoppingList.dueDate && (
        <div>
          <h4 className="my-2">
            <i className="pi pi-hourglass text-xl mr-2 text-primary"></i>
            Timeline:
          </h4>
          <div className="flex align-items-center gap-2">
            <Icon
              iconClassName="pi pi-cart-plus text-2xl text-orange-300"
              tooltip={{text: formatDate(shoppingList.createdDate, false), position: "right"}}
            />
            <ProgressBar
              value={timelineProgressValue}
              displayValueTemplate={(_) => null}
              className="w-full h-1rem"
            ></ProgressBar>
            <Icon
              iconClassName={`pi ${timelineProgressValue === 100 ? "pi-flag-fill" : "pi-flag"} text-2xl text-green-500`}
              tooltip={{text: formatDate(shoppingList.dueDate, false), position: "right"}}
            />
          </div>
        </div>
      )}
    </div>
  );
}
