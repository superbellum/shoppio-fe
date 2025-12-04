import type {IShoppingListItem} from "../../../model/entity/IShoppingListItem.ts";
import {DataTable} from "primereact/datatable";
import {Column, type ColumnEditorOptions, type ColumnEvent} from "primereact/column";
import type {ReactNode} from "react";
import {useCallback} from "react";
import formatDate from "../../../utils/formatDate.ts";
import {Status} from "../../../model/entity/Status.ts";
import {Image} from "primereact/image";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {Priority} from "../../../model/entity/Priority.ts";
import {useAppDispatch} from "../../../store";
import {setCreateShoppingListItemModality} from "../../../store/slices/appSlice.ts";

export interface ShoppingListTabItemsProps {
  items: IShoppingListItem[];
  shoppingListId: string;
}

export default function ShoppingListItems({items, shoppingListId}: ShoppingListTabItemsProps) {
  const dispatch = useAppDispatch();

  const onCreateShoppingListItem = useCallback(() => {
    dispatch(setCreateShoppingListItemModality({isVisible: true, itemId: shoppingListId}));
  }, [dispatch, shoppingListId]);

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
          <i className="pi pi-circle text-blue-400 text-2xl ml-3"></i>
        </>;
      case Status.COMPLETED:
        return <>
          <i className="pi pi-check-circle text-green-500 text-2xl ml-3"></i>
        </>;
    }
  };

  const priorityTemplate = (item: IShoppingListItem) => {
    let iconClass = "";
    switch (item.priority) {
      case Priority.HIGH:
        iconClass = "pi-angle-double-up text-red-500";
        break;
      case Priority.MEDIUM:
        iconClass = "pi-equals text-yellow-500";
        break;
      case Priority.LOW:
        iconClass = "pi-angle-double-down text-green-500";
        break;
    }
    return <i className={`pi ${iconClass} text-3xl ml-3`}></i>;
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
      <div className="flex justify-content-end mb-2">
        <Button
          size="small"
          icon="pi pi-plus"
          rounded
          onClick={onCreateShoppingListItem}/>
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
            <Column field="priority" header="Priority" body={priorityTemplate as ReactNode}></Column>
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
