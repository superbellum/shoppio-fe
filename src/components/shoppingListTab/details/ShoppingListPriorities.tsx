import type {IShoppingList} from "../../../model/entity/IShoppingList.ts";
import {Priority} from "../../../model/entity/Priority.ts";
import CircularChart from "../../molecules/CircularChart.tsx";
import getPriorityColor from "../../../utils/getPriorityColor.ts";

export interface ShoppingListPrioritiesProps {
  shoppingList: IShoppingList;
}

export default function ShoppingListPriorities({shoppingList}: ShoppingListPrioritiesProps) {
  const items = shoppingList.items;

  const chartData = Object.values(Priority).map(priority => ({
    label: priority,
    value: items.filter(i => i.priority === priority).length,
    color: getPriorityColor(priority),
  }));

  return (
    <div className="flex flex-column h-full w-full justify-content-start">
      <h3 className="mb-3 text-center">
        <i className="pi pi-chart-pie text-xl mr-2"></i>
        All priorities:
      </h3>
      <div className="flex justify-content-center h-8rem">
        <CircularChart chartData={chartData}/>
      </div>
    </div>
  );
}
