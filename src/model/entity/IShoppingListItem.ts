import type {Status} from "./Status";
import type {Priority} from "./Priority";

export interface IShoppingListItem {
  id: string,
  shoppingListId: string,
  name: string,
  description?: string;
  link?: string,
  imageUrl: string,
  status: Status,
  priority: Priority,
  createdDate: string,
  lastModifiedDate: string,
}
