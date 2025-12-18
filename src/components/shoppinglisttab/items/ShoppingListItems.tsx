import type {IShoppingListItem} from "../../../model/entity/IShoppingListItem.ts";
import ShoppingListGridItem from "./grid/ShoppingListGridItem.tsx";
import {useCallback, useMemo, useState} from "react";
import {LayoutType} from "../../../model/common/LayoutType.ts";
import {DataViewLayoutOptions} from "primereact/dataview";
import {Priority} from "../../../model/entity/Priority.ts";
import {Checkbox, type CheckboxChangeEvent} from "primereact/checkbox";
import getPriorityColor from "../../../utils/getPriorityColor.ts";
import {Status} from "../../../model/entity/Status.ts";
import {Dropdown} from "primereact/dropdown";
import {OrderByOptions, PRIORITY_ORDER} from "../../../model/common/OrderByOptions.ts";
import {Button} from "primereact/button";
import {useAppDispatch} from "../../../store";
import moment from "moment/moment";
import {setCreateShoppingListItemModalityProps} from "../../../store/slices/appSlice.ts";

export interface ShoppingListItemsProps {
  shoppingListItems: IShoppingListItem[];
  shoppingListId: string;
}

export default function ShoppingListItems({shoppingListId, shoppingListItems}: ShoppingListItemsProps) {
  const dispatch = useAppDispatch();
  const [layout, setLayout] = useState(LayoutType.GRID);
  const [selectedPriorities, setSelectedPriorities] = useState(Object.values(Priority));
  const [selectedStatuses, setSelectedStatuses] = useState(Object.values(Status));
  const [selectedOrder, setSelectedOrder] = useState(OrderByOptions.NONE);

  const items = useMemo(() => {
    const filteredItems = shoppingListItems.filter(i => {
      return selectedPriorities.some(p => i.priority === p) && selectedStatuses.some(s => i.status === s);
    });

    switch (selectedOrder) {
      case OrderByOptions.NONE:
        return filteredItems;
      case OrderByOptions.CREATED_NEWEST_OLDEST:
        return filteredItems.sort((a, b) => moment(b.createdDate).diff(moment(a.createdDate)));
      case OrderByOptions.CREATED_OLDEST_NEWEST:
        return filteredItems.sort((a, b) => moment(a.createdDate).diff(moment(b.createdDate)));
      case OrderByOptions.PRIORITY_HIGH_LOW:
        return filteredItems.sort((a, b) => PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority]);
      case OrderByOptions.PRIORITY_LOW_HIGH:
        return filteredItems.sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]);
    }
  }, [shoppingListItems, selectedPriorities, selectedStatuses, selectedOrder]);

  const onCreateShoppingListItem = useCallback(() => {
    dispatch(setCreateShoppingListItemModalityProps({isVisible: true, shoppingListId: shoppingListId}));
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

  return (
    <div>
      <div
        className="flex flex-column lg:flex-row justify-content-between align-items-center bg-primary-100 px-3 py-1 border-round mb-4">
        <div>
          <div className="flex align-items-center lg:h-2rem">
            <h3 className="mr-4">
              Priorities:
            </h3>
            <div className="flex sm:gap-4 flex-column sm:flex-row">
              {Object.values(Priority).map(priority => (
                <div key={priority} className="flex align-items-center">
                  <Checkbox
                    style={{scale: 0.8}}
                    className="mr-1 text-red-500"
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
                <div key={status} className="flex align-items-center">
                  <Checkbox
                    style={{scale: 0.8}}
                    className="mr-1 text-red-500"
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

        <div className="flex gap-0 ml-6 gap-3 align-items-center lg:mr-auto">
          <h3>Order by:</h3>
          <Dropdown
            value={selectedOrder}
            onChange={(e) => setSelectedOrder(e.value)}
            options={Object.values(OrderByOptions)}
          />
        </div>

        <div className="flex justify-content-between">
          <Button
            icon="pi pi-plus"
            className="ml-auto mr-4"
            onClick={onCreateShoppingListItem}
          />

          <DataViewLayoutOptions
            layout={layout}
            onChange={(e) => setLayout(e.value as LayoutType)}
          />
        </div>
      </div>

      {layout === LayoutType.LIST && (
        // todo
        <div className="flex flex-wrap gap-4 md:gap-6 justify-content-center">
          {/*{items.map(item => (*/}
          {/*  <ShoppingListGridItem key={item.id} item={item}/>*/}
          {/*))}*/}
        </div>
      )}

      {layout === LayoutType.GRID && (
        <div className="flex flex-wrap gap-4 md:gap-6 justify-content-center">
          {items.map(item => (
            <ShoppingListGridItem key={item.id} item={item}/>
          ))}
        </div>
      )}
    </div>
  );
}
