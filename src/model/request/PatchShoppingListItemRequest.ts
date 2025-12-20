import type {Priority} from "../entity/Priority.ts";
import type {Status} from "../entity/Status.ts";

export interface PatchShoppingListItemRequest {
  name?: string | null;
  description?: string | null;
  link?: string | null;
  imageUrl?: string | null;
  priority?: Priority;
  status?: Status;
}
