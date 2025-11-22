import type {Status} from "./Status.ts";
import type {IShoppingListItem} from "./IShoppingListItem.ts";

export interface IShoppingList {
  id: string;
  title: string;
  description?: string;
  status: Status;
  createdDate: string;
  lastModifiedDate: string;
  dueDate?: string;
  items: IShoppingListItem[];
}
