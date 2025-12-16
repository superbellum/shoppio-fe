import {Priority} from "../entity/Priority.ts";

export enum OrderByOptions {
  NONE = "No ordering",
  CREATED_NEWEST_OLDEST = "Created ↓",
  CREATED_OLDEST_NEWEST = "Created ↑",
  PRIORITY_LOW_HIGH = "Priority ↑",
  PRIORITY_HIGH_LOW = "Priority ↓",
}

export const PRIORITY_ORDER: Record<Priority, number> = {
  [Priority.HIGH]: 3,
  [Priority.MEDIUM]: 2,
  [Priority.LOW]: 1,
};
