import type {IShoppingListItem} from "../model/entity/IShoppingListItem";
import {DataTable} from "primereact/datatable";
import {Column, type ColumnEditorOptions, type ColumnEvent} from "primereact/column";
import type {ReactNode} from "react";
import {useState} from "react";
import formatDate from "../utils/formatDate";
import {Status} from "../model/entity/Status";
import {Image} from "primereact/image";
import {Tooltip} from "primereact/tooltip";
import {Button} from "primereact/button";
import CreateShoppingListItemModality from "./CreateShoppingListItemModality";
import {InputText} from "primereact/inputtext";

export interface ShoppingListTabItemsProps {
  items: IShoppingListItem[];
  shoppingListId: string;
}

export default function ShoppingListTabItems({items, shoppingListId}: ShoppingListTabItemsProps) {
  const [isCreateShoppingListItemModalityVisible, setIsCreateShoppingListItemModalityVisible] = useState(false);

  const nameTemplate = (item: IShoppingListItem) => {
    return (
      <p className="item-edit-row">
        <span className="select-none">{item.name}</span>
        <i className="pi pi-pencil cursor-pointer ml-3 showOnHover"></i>
      </p>
    );
  };

  const imageTemplate = (item: IShoppingListItem) => {
    return (
      <div className="flex item-edit-row align-items-center">
        {item.imageUrl
          ? <Image src={item.imageUrl} alt="Item image" width="150" preview onClick={(e) => e.stopPropagation()}/>
          : <p>---</p>
        }
        <i className="pi pi-pencil cursor-pointer ml-3 showOnHover"></i>
      </div>
    );
  };

  const linkTemplate = (item: IShoppingListItem) => {
    return item.link
      ? <div className="item-edit-row">
        <a href={item.link} target="_blank" onClick={(e) => e.stopPropagation()}>
          <i className="pi pi-external-link text-blue-700 text-xl"></i>
        </a>
        <i className="pi pi-pencil cursor-pointer ml-3 showOnHover"></i>
      </div>
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

  const onCellEditComplete = (e: ColumnEvent) => {
    let {rowData, value, newValue, field, originalEvent: event} = e;

    console.log(e);

    // switch (field) {
    //   case 'quantity':
    //   case 'price':
    //     if (isPositiveInteger(newValue)) rowData[field] = newValue;
    //     else event.preventDefault();
    //     break;
    //
    //   default:
    //     if (newValue.trim().length > 0) rowData[field] = newValue;
    //     else event.preventDefault();
    //     break;
    // }
  };

  const cellEditor = (options: ColumnEditorOptions) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback!(e.target.value)}
        onKeyDown={(e) => e.stopPropagation()}
      />
    ) as ReactNode;
  };

  return (
    <>
      <CreateShoppingListItemModality
        visible={isCreateShoppingListItemModalityVisible}
        onHide={() => setIsCreateShoppingListItemModalityVisible(false)}
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
          <DataTable
            value={items}
            removableSort
            scrollable
            scrollHeight="70vh"
            tableStyle={{minWidth: "60rem", backgroundColor: "red"}}
            className="text-lg"
            editMode="cell"
          >
            <Column
              field="name"
              sortable
              header="Name"
              body={nameTemplate as ReactNode}
              editor={(options) => cellEditor(options)}
              onCellEditComplete={onCellEditComplete}
            ></Column>
            <Column
              field="imageUrl"
              header="Image"
              body={imageTemplate as ReactNode}
              editor={(options) => cellEditor(options)}
              onCellEditComplete={onCellEditComplete}
            ></Column>
            <Column field="status" header="Status" body={statusTemplate as ReactNode}></Column>
            <Column
              field="link"
              header="Link"
              body={linkTemplate as ReactNode}
              editor={(options) => cellEditor(options)}
              onCellEditComplete={onCellEditComplete}
            ></Column>
            <Column field="createdDate" header="Created" body={createdDateTemplate}></Column>
            <Column field="lastModifiedDate" header="Last Modified" body={lastModifiedDateTemplate}></Column>
          </DataTable>
        )
        : <span className="font-italic"> -- no items --</span>}
    </>
  );
}
