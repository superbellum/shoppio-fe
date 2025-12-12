import type {IShoppingListItem} from "../../../../model/entity/IShoppingListItem.ts";
import {Image} from "primereact/image";
import {Card} from "primereact/card";
import type {ReactNode} from "react";
import Icon from "../../../molecules/Icon.tsx";
import formatDate from "../../../../utils/formatDate.ts";
import {Priority} from "../../../../model/entity/Priority.ts";
import {Status} from "../../../../model/entity/Status.ts";
import {Tag} from "primereact/tag";
import ShoppingListGridItemFooter from "./ShoppingListGridItemFooter.tsx";

export interface ShoppingListGridItemProps {
  item: IShoppingListItem;
}

export default function ShoppingListGridItem({item}: ShoppingListGridItemProps) {

  const title = (
    <p className="text-xl">{item.name}</p>
  );

  const header = (
    <div className="flex justify-content-center m-2">
      <Image
        src={item.imageUrl} // todo: validate correct url format
        alt={item.name}
        height="150"
        preview
      />
    </div>
  );

  const getPriorityIconClass = () => {
    switch (item.priority) {
      case Priority.HIGH:
        return "pi pi-angle-double-up text-red-600 text-2xl bg-red-100 p-1 border-round";
      case Priority.MEDIUM:
        return "pi pi-equals text-yellow-600 text-2xl bg-yellow-100 p-1 border-round";
      case Priority.LOW:
        return "pi pi-angle-double-down text-green-600 text-2xl bg-green-100 p-1 border-round";
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
      className="m-3 w-14rem border-round-2xl bg-primary-100"
    >
      <div className="flex flex-column gap-3">
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
          <i className={getPriorityIconClass()}></i>

          <Tag severity={getStatusTagSeverity()} value={item.status}/>

          {item.link && (
            <a href={item.link} target="_blank">
              <i className="pi pi-external-link text-lg"></i>
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}
