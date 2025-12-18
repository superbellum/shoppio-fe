import {Button} from "primereact/button";
import {useCallback, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store";
import DialOptions, {type IDialOption} from "./DialOptions.tsx";
import {
  setActiveShoppingListTabIndex,
  setCreateShoppingListModalityProps,
  setEditShoppingListModalityProps
} from "../../store/slices/appSlice.ts";
import {confirmPopup, ConfirmPopup} from "primereact/confirmpopup";
import axios from "axios";
import {SHOPPING_LIST_API_URL} from "../../constants/constants.ts";
import {useNotification} from "../../hooks/useNotification.ts";
import {removeShoppingListById} from "../../store/slices/shoppingListSlice.ts";
import {useClickOutside} from "primereact/hooks";

export interface DialProps {
  optionsDirection?: "top" | "bottom";
}

export default function Dial({optionsDirection = "top"}: DialProps) {
  const shoppingLists = useAppSelector(state => state.shoppingLists);
  const activeShoppingListTabIndex = useAppSelector(state => state.appState.activeShoppingListTabIndex);
  const dispatch = useAppDispatch();
  const {notify} = useNotification();
  const overlayRef = useRef<HTMLDivElement | undefined>(undefined);
  const [dialOptionsVisible, setDialOptionsVisible] = useState(false);
  const activeShoppingList = shoppingLists[activeShoppingListTabIndex]

  useClickOutside(overlayRef, () => {
    setDialOptionsVisible(false);
  });

  const deleteShoppingListById = useCallback(async () => {
    const response = await axios.delete<string>(`${SHOPPING_LIST_API_URL}/${activeShoppingList.id}`);

    if (response.status === 200) {
      dispatch(removeShoppingListById(activeShoppingList.id));
      dispatch(setActiveShoppingListTabIndex(0));
      notify("Success", `Successfully deleted "${activeShoppingList.title}"`, "success");
    } else {
      notify("Error", `Error when deleting shopping list: ${response.status}: ${response.statusText}`, "error");
    }
  }, [shoppingLists, activeShoppingListTabIndex, dispatch, notify]);

  const dialOptions: IDialOption[] = [
    {
      label: "Create Shopping List",
      icon: "pi pi-plus",
      severity: "success",
      command: () => {
        dispatch(setCreateShoppingListModalityProps({isVisible: true}));
        setDialOptionsVisible(false);
      }
    },
    {
      label: `Edit "${activeShoppingList?.title}"`,
      icon: "pi pi-pencil",
      severity: "secondary",
      command: () => {
        dispatch(setEditShoppingListModalityProps({isVisible: true, id: activeShoppingList.id}));
        setDialOptionsVisible(false);
      }
    },
    {
      label: `Delete "${activeShoppingList?.title}"`,
      icon: "pi pi-trash",
      severity: "danger",
      command: (event) => {
        confirmPopup({
          target: event.currentTarget,
          message: `Are you sure you want to delete "${activeShoppingList.title}" ?`,
          icon: "pi pi-exclamation-triangle",
          defaultFocus: "accept",
          accept: () => {
            deleteShoppingListById();
            setDialOptionsVisible(false);
          },
          reject: () => setDialOptionsVisible(false),
          onHide: () => setDialOptionsVisible(false),
        });
      }
    },
  ];

  const dialStyle = optionsDirection === "top" ? {bottom: 10} : {top: 10};

  return (
    <div
      ref={overlayRef}
      className={`fixed flex ${optionsDirection === "top" ? "flex-column-reverse" : "flex-column"} align-items-center`}
      style={{right: 10, zIndex: 999, ...dialStyle}}
    >
      <Button
        icon="pi pi-ellipsis-v"
        rounded
        onClick={() => setDialOptionsVisible(true)}
      />

      {dialOptionsVisible && (
        <DialOptions options={dialOptions} optionsDirection={optionsDirection}/>
      )}

      <ConfirmPopup/>
    </div>
  );
}
