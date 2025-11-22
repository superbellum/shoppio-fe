import type {Status} from "./Status.ts";

export interface IShoppingListItem {
  id: string,
  shoppingListId: string,
  name: string,
  link?: string,
  imageData?: string,
  status: Status,
  createdDate: string,
  lastModifiedDate: string,
}
