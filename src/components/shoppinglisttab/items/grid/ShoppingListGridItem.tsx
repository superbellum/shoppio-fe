import type {IShoppingListItem} from "../../../../model/entity/IShoppingListItem.ts";
import {Image} from "primereact/image";
import {Card} from "primereact/card";
import type {ReactNode} from "react";
import Icon from "../../../molecules/Icon.tsx";
import formatDate from "../../../../utils/formatDate.ts";
import {Status} from "../../../../model/entity/Status.ts";
import {Tag} from "primereact/tag";
import ShoppingListGridItemFooter from "./ShoppingListGridItemFooter.tsx";
import {Priority} from "../../../../model/entity/Priority.ts";

export interface ShoppingListGridItemProps {
  item: IShoppingListItem;
}

export default function ShoppingListGridItem({item}: ShoppingListGridItemProps) {

  const title = (
    <p className="text-xl">{item.name}</p>
  );

  const header = (
    <div className="flex justify-content-center p-2 border-round-top-lg">
      <Image
        src={item.imageUrl}
        alt={item.name}
        height="150"
        preview
      />
    </div>
  );

  const getPriorityIconClass = () => {
    switch (item.priority) {
      case Priority.HIGH:
        return "pi pi-angle-double-up text-red-400 text-2xl bg-red-50 p-1 border-round";
      case Priority.MEDIUM:
        return "pi pi-equals text-yellow-400 text-2xl bg-yellow-50 p-1 border-round";
      case Priority.LOW:
        return "pi pi-angle-double-down text-green-400 text-2xl bg-green-50 p-1 border-round";
    }
  };

  const getStatusTagSeverity = () => {
    switch (item.status) {
      case Status.OPEN:
        return "info";
      case Status.COMPLETED:
        return "success";
    }
  };

  return (
    <Card
      title={title as ReactNode}
      footer={<ShoppingListGridItemFooter item={item}/> as ReactNode}
      header={header as ReactNode}
      className={"w-full sm:w-14rem border-round-bottom-lg}"}
      style={{background: `linear-gradient(225deg, ${item.status === Status.COMPLETED ? "var(--green-300)" : "var(--primary-200)"} -200%, transparent 80%)`}}
    >
      <div className="flex flex-column gap-3">
        {/*todo: description*/}

        <p className="align-items-center flex text-sm">
          <Icon
            iconClassName="pi pi-calendar-plus text-lg mr-2 text-primary"
            tooltip={{text: "Created", showDelay: 500}}
          />
          {formatDate(item.createdDate)}
        </p>
        <p className="align-items-center flex text-sm">
          <Icon
            iconClassName="pi pi-file-edit text-lg mr-2 text-primary"
            tooltip={{text: "Edited", showDelay: 500}}
          />
          {formatDate(item.lastModifiedDate)}
        </p>

        <div className="flex justify-content-between align-items-center mt-1">
          <Icon iconClassName={getPriorityIconClass()} tooltip={{text: item.priority}}/>

          <Tag severity={getStatusTagSeverity()} value={item.status}/>

          {item.link && (
            <a href={item.link} target="_blank">
              <Icon iconClassName="pi pi-external-link text-lg" tooltip={{text: "Open in new tab"}}/>
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}
