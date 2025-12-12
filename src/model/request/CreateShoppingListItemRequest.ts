import type {Priority} from "../entity/Priority";

export interface CreateShoppingListItemRequest {
  name: string;
  link?: string;
  imageUrl: string;
  priority: Priority;
}
