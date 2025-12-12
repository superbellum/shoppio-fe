import type {ReactNode} from "react";
import {useRef} from "react";
import {type MessageSeverity, NotificationContext} from "./NotificationContext";
import {Toast} from "primereact/toast";

export interface NotificationProviderProps {
  children: ReactNode;
}

export default function NotificationProvider({children}: NotificationProviderProps) {
  const toastRef = useRef<Toast | null>(null);

  const notify = (summary: string, detail: string, severity: MessageSeverity, sticky?: boolean) => {
    toastRef.current?.show({summary, detail, severity, sticky});
  }

  return (
    <NotificationContext value={{notify}}>
      <Toast ref={toastRef} style={{zIndex: 9999}}/>
      {children}
    </NotificationContext>
  );
};
