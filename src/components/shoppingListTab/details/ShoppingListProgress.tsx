import type {IShoppingList} from "../../../model/entity/IShoppingList.ts";
import {ProgressBar} from "primereact/progressbar";
import {Status} from "../../../model/entity/Status.ts";
import {Tag} from "primereact/tag";
import {type CustomRenderProps, MeterGroup} from "primereact/metergroup";
import {Priority} from "../../../model/entity/Priority.ts";
import getPriorityColor from "../../../utils/getPriorityColor.ts";
import type {ReactNode} from "react";

export interface ShoppingListProgressProps {
  shoppingList: IShoppingList;
}

export default function ShoppingListProgress({shoppingList}: ShoppingListProgressProps) {
  const items = shoppingList.items;
  const completedItems = items.filter(item => item.status === Status.COMPLETED);
  const numAll = items.length;
  const numCompleted = completedItems.length;

  const meterGroupValues = Object.values(Priority).map(priority => {
    return {
      label: priority,
      color: getPriorityColor(priority),
      value: completedItems.filter(i => i.priority === priority).length * 100 / numCompleted,
    };
  });

  const meterGroupStart = () => (
    <div className="flex justify-content-between">
      <span className="font-semibold text-sm">0</span>
      <span className="font-semibold text-sm">Completed: {numCompleted}</span>
    </div>
  ) as ReactNode;

  const meterGroupLabelList = ({values}: CustomRenderProps) => (
    <div className="flex flex-wrap justify-content-between mt-2">
      {values.map((item, index) => (
        <div key={index} className="flex align-items-center gap-1">
          <i className="pi pi-circle-fill text-xs" style={{color: item.color}}></i>
          <div className="text-xs">
            <p>{item.label}: {item.value}%</p>
          </div>
        </div>
      ))}
    </div>
  ) as ReactNode;

  return (
    <div className="flex flex-column h-full w-full justify-content-start">
      <div>
        <h3 className="mb-2">
          <i className="pi pi-chart-line text-xl mr-2"></i>
          Progress:
          <Tag severity="info" value={`${numCompleted}/${numAll}`} className="ml-2" rounded/>
        </h3>
        <ProgressBar
          className="mt-3"
          value={(numCompleted * 100 / numAll).toFixed(1)}
        ></ProgressBar>
      </div>

      <div>
        <h3 className="mb-2">
          <i className="pi pi-gauge text-xl mr-2"></i>
          Completed:
        </h3>
        <MeterGroup
          values={meterGroupValues}
          max="100"
          className="w-full"
          start={meterGroupStart}
          labelList={meterGroupLabelList}
        />
      </div>
    </div>
  );
}
