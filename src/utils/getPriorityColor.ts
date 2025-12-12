import {Priority} from "../model/entity/Priority.ts";

export default function getPriorityColor(priority: string) {
  switch (priority) {
    case Priority.LOW:
      return "#22c55e";
    case Priority.MEDIUM:
      return "#eab308";
    case Priority.HIGH:
      return "#ff3d32";
  }
};
