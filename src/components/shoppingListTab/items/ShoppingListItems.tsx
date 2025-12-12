import type {IShoppingListItem} from "../../../model/entity/IShoppingListItem.ts";
import {ReactNode, useCallback, useMemo, useState} from "react";
import {useAppDispatch} from "../../../store";
import {setCreateShoppingListItemModality} from "../../../store/slices/appSlice.ts";
import {DataView, DataViewLayoutOptions} from "primereact/dataview";
import ShoppingListGridItem from "./grid/ShoppingListGridItem.tsx";
import ShoppingListListItem from "./list/ShoppingListListItem.tsx";
import {Button} from "primereact/button";
import {Priority} from "../../../model/entity/Priority.ts";
import {Checkbox, type CheckboxChangeEvent} from "primereact/checkbox";
import getPriorityColor from "../../../utils/getPriorityColor.ts";
import {Status} from "../../../model/entity/Status.ts";

export interface ShoppingListTabItemsProps {
  items: IShoppingListItem[];
  shoppingListId: string;
}

export default function ShoppingListItems({items, shoppingListId}: ShoppingListTabItemsProps) {
  const dispatch = useAppDispatch();
  const [layout, setLayout] = useState("grid");
  const [selectedPriorities, setSelectedPriorities] = useState(Object.values(Priority));
  const [selectedStatuses, setSelectedStatuses] = useState(Object.values(Status));

  const shoppingListItems = useMemo(() => {
    return items.filter(i => {
      return selectedPriorities.some(p => i.priority === p) && selectedStatuses.some(s => i.status === s);
    })
  }, [items, selectedPriorities, selectedStatuses]);

  const onCreateShoppingListItem = useCallback(() => {
    dispatch(setCreateShoppingListItemModality({isVisible: true, itemId: shoppingListId}));
  }, [dispatch, shoppingListId]);

  const onPriorityChange = (e: CheckboxChangeEvent) => {
    let _selectedPriorities = [...selectedPriorities];

    if (e.checked) {
      _selectedPriorities.push(e.value);
    } else {
      _selectedPriorities = _selectedPriorities.filter(p => p !== e.value);
    }

    setSelectedPriorities(_selectedPriorities);
  };

  const onStatusChange = (e: CheckboxChangeEvent) => {
    let _selectedStatuses = [...selectedStatuses];

    if (e.checked) {
      _selectedStatuses.push(e.value);
    } else {
      _selectedStatuses = _selectedStatuses.filter(p => p !== e.value);
    }

    setSelectedStatuses(_selectedStatuses);
  };

  const header = (
    <div className="flex justify-content-between align-items-center p-0">
      <div>
        <div className="flex align-items-center h-2rem">
          <h3 className="mr-4">
            Priorities:
          </h3>
          <div className="flex gap-4">
            {Object.values(Priority).map(priority => (
              <div key={priority}>
                <Checkbox
                  className="mr-2 text-red-500"
                  inputId={`priority-checkbox-${priority}`}
                  name={`priority-checkbox-${priority}`}
                  value={priority}
                  onChange={onPriorityChange}
                  checked={selectedPriorities.some(p => p === priority)}
                />
                <label htmlFor={`priority-checkbox-${priority}`} style={{color: getPriorityColor(priority)}}>
                  {priority}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex align-items-center h-2rem">
          <h3 className="mr-4">
            Statuses:
          </h3>
          <div className="flex gap-4">
            {Object.values(Status).map(status => (
              <div key={status}>
                <Checkbox
                  className="mr-2 text-red-500"
                  inputId={`status-checkbox-${status}`}
                  name={`status-checkbox-${status}`}
                  value={status}
                  onChange={onStatusChange}
                  checked={selectedStatuses.some(s => s === status)}
                />
                <label htmlFor={`status-checkbox-${status}`}>
                  {status}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/*todo: order by Due Date, Priority*/}
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
        value={shoppingListItems}
        itemTemplate={itemTemplate}
        layout={layout}
        header={header as ReactNode}
      />
    </div>
  );
}
