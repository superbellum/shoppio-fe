import type {IShoppingListItem} from "../../../model/entity/IShoppingListItem.ts";
import {ReactNode, useCallback, useState} from "react";
import {useAppDispatch} from "../../../store";
import {setCreateShoppingListItemModality} from "../../../store/slices/appSlice.ts";
import {DataView, DataViewLayoutOptions} from "primereact/dataview";
import ShoppingListGridItem from "./grid/ShoppingListGridItem.tsx";
import ShoppingListListItem from "./list/ShoppingListListItem.tsx";
import {Button} from "primereact/button";

export interface ShoppingListTabItemsProps {
  items: IShoppingListItem[];
  shoppingListId: string;
}

export default function ShoppingListItems({items, shoppingListId}: ShoppingListTabItemsProps) {
  const dispatch = useAppDispatch();
  const [layout, setLayout] = useState("grid");

  const onCreateShoppingListItem = useCallback(() => {
    dispatch(setCreateShoppingListItemModality({isVisible: true, itemId: shoppingListId}));
  }, [dispatch, shoppingListId]);

  const header = (
    <div className="flex justify-content-between align-items-center">
      <div className="flex align-items-center">
        <i className="pi pi-list mr-2 text-xl"></i>
        <p className="text-xl">Items:</p>
      </div>
      {/*todo: filter for completed/all; edit & delete*/}
      <Button
        icon="pi pi-plus"
        rounded
        className="ml-auto mr-4"
        onClick={onCreateShoppingListItem}
      />
      <DataViewLayoutOptions
        layout={layout}
        onChange={(e) => setLayout(e.value)}
      />
    </div>
  );

  const itemTemplate = (item: IShoppingListItem, layout: string) => {
    switch (layout) {
      case "grid":
        return (
          <ShoppingListGridItem
            key={item.id}
            item={item}
          />
        ) as ReactNode;
      case "list":
      default:
        return (
          <ShoppingListListItem
            key={item.id}
            item={item}
          />
        ) as ReactNode;
    }
  };

  return (
    <div className="mt-3">
      <DataView
        value={items}
        itemTemplate={itemTemplate}
        layout={layout}
        header={header as ReactNode}
      />
    </div>
  );
}
