import {createContext} from "react";

export type MessageSeverity = "success" | "info" | "warn" | "error" | "secondary" | "contrast";

export interface INotificationContext {
  notify: (summary: string, detail: string, severity: MessageSeverity, sticky?: boolean) => void;
}

const defaultContext: INotificationContext = {
  notify: () => {
  }
}

export const NotificationContext = createContext<INotificationContext>(defaultContext);
