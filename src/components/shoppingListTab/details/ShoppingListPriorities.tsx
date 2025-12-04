import type {IShoppingList} from "../../../model/entity/IShoppingList.ts";
import {Priority} from "../../../model/entity/Priority.ts";
import CircularChart from "../../molecules/CircularChart.tsx";

export interface ShoppingListPrioritiesProps {
  shoppingList: IShoppingList;
}

export default function ShoppingListPriorities({shoppingList}: ShoppingListPrioritiesProps) {
  const items = shoppingList.items;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case Priority.LOW:
        return "#22c55e";
      case Priority.MEDIUM:
        return "#eab308";
      case Priority.HIGH:
        return "#ff3d32";
    }
  };

  const chartData = Object.values(Priority).map(priority => ({
    label: priority,
    value: items.filter(i => i.priority === priority).length,
    color: getPriorityColor(priority),
  }));

  return (
    <div className="flex flex-column h-full justify-content-start">
      <h3 className="mb-3 text-center">
        <i className="pi pi-chart-pie text-xl mr-2"></i>
        Priority Distribution:
      </h3>
      <div className="flex justify-content-center h-10rem">
        <CircularChart chartData={chartData}/>
      </div>
    </div>
  );
}
