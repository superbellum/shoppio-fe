import {useContext} from "react";
import {NotificationContext} from "../context/notification/NotificationContext.ts";

export const useNotification = () => useContext(NotificationContext);
