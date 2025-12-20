import type {Priority} from "../entity/Priority";

export interface CreateShoppingListItemRequest {
  name: string;
  description?: string;
  link?: string;
  imageUrl: string;
  priority: Priority;
}
