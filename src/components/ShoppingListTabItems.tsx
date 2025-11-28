import type { IShoppingListItem } from "../model/entity/IShoppingListItem";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import type { ReactNode } from "react";
import { useState } from "react";
import formatDate from "../utils/formatDate";
import { Status } from "../model/entity/Status";
import { Image } from "primereact/image";
import { Tooltip } from "primereact/tooltip";
import { Button } from "primereact/button";
import CreateShoppingListItemModality from "./CreateShoppingListItemModality";

export interface ShoppingListTabItemsProps {
  items: IShoppingListItem[];
  shoppingListId: string;
}

export default function ShoppingListTabItems({ items, shoppingListId }: ShoppingListTabItemsProps) {
  const [isCreateShoppingListItemModalityVisible, setIsCreateShoppingListItemModalityVisible] = useState(false);
  
  const imageTemplate = (item: IShoppingListItem) => {
    return item.imageData
      ? <Image src={item.imageData} alt="Item image" width="150" preview/>
      : <p></p>;
  };
  
  const linkTemplate = (item: IShoppingListItem) => {
    return item.link
      ? <a href={item.link} target="_blank">
        <i className="pi pi-external-link text-blue-700 text-xl"></i>
      </a>
      : <></>;
  };
  
  const createdDateTemplate = (item: IShoppingListItem) => {
    return dateTemplate(item, "createdDate");
  };
  
  const lastModifiedDateTemplate = (item: IShoppingListItem) => {
    return dateTemplate(item, "lastModifiedDate");
  };
  
  const dateTemplate = (item: IShoppingListItem, itemAttr: string) => {
    return formatDate(item[itemAttr]);
  };
  
  const statusTemplate = (item: IShoppingListItem) => {
    switch (item.status) {
      case Status.OPEN:
        return <>
          <Tooltip target=".iconOpen"/>
          <i
            className="iconOpen pi pi-circle text-blue-400 text-2xl ml-3"
            data-pr-tooltip="Open"
            data-pr-position="right"
            data-pr-showdelay="500"
            data-pr-at="right+5 top"
            data-pr-my="left center+10"
          ></i>
        </>;
      case Status.COMPLETED:
        return <>
          <Tooltip target=".iconCompleted"/>
          <i
            className="iconCompleted pi pi-check-circle text-green-500 text-2xl ml-3"
            data-pr-tooltip="Completed"
            data-pr-position="right"
            data-pr-showdelay="500"
            data-pr-at="right+5 top"
            data-pr-my="left center+10"
          ></i>
        </>;
    }
  };
  
  return (
    <>
      <CreateShoppingListItemModality
        visible={isCreateShoppingListItemModalityVisible}
        onClose={() => setIsCreateShoppingListItemModalityVisible(false)}
        shoppingListId={shoppingListId}
      />
      
      <div className="flex justify-content-end mb-2">
        <Button
          size="small"
          icon="pi pi-plus"
          rounded
          onClick={() => setIsCreateShoppingListItemModalityVisible(true)}/>
      </div>
      
      {items.length > 0
        ? (
          <DataTable value={items} tableStyle={{ minWidth: "60rem" }} className="text-lg">
            <Column field="name" header="Name"></Column>
            <Column header="Image" body={imageTemplate as ReactNode}></Column>
            <Column field="status" header="Status" body={statusTemplate as ReactNode}></Column>
            <Column field="link" header="Link" body={linkTemplate as ReactNode}></Column>
            <Column field="createdDate" header="Created" body={createdDateTemplate}></Column>
            <Column field="lastModifiedDate" header="Last Modified" body={lastModifiedDateTemplate}></Column>
          </DataTable>
        )
        : <span className="font-italic"> -- no items --</span>}
    </>
  );
}
