import {Button} from "primereact/button";
import {useCallback, useRef} from "react";
import {useAppDispatch, useAppSelector} from "../../store";
import DialOptions, {type IDialOption} from "./DialOptions.tsx";
import {OverlayPanel} from "primereact/overlaypanel";
import {setActiveShoppingListTabIndex, setCreateShoppingListModality} from "../../store/slices/appSlice.ts";
import {confirmPopup, ConfirmPopup} from "primereact/confirmpopup";
import axios from "axios";
import {SHOPPING_LIST_API_URL} from "../../constants/constants.ts";
import {useNotification} from "../../hooks/useNotification.ts";
import {removeShoppingListById} from "../../store/slices/shoppingListSlice.ts";

export default function Dial() {
  const shoppingLists = useAppSelector(state => state.shoppingLists);
  const activeShoppingListTabIndex = useAppSelector(state => state.appState.activeShoppingListTabIndex);
  const dispatch = useAppDispatch();
  const {notify} = useNotification();
  const op = useRef<OverlayPanel | null>(null);

  const deleteShoppingListById = useCallback(async () => {
    const shoppingListToDelete = shoppingLists[activeShoppingListTabIndex];

    const response = await axios.delete<string>(`${SHOPPING_LIST_API_URL}/${shoppingListToDelete.id}`);

    if (response.status === 200) {
      dispatch(removeShoppingListById(shoppingListToDelete.id));
      dispatch(setActiveShoppingListTabIndex(0));
      notify("Success", `Successfully deleted "${shoppingListToDelete.title}"`, "success");
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
        dispatch(setCreateShoppingListModality({isVisible: true}));
        op.current?.hide();
      }
    },
    {
      label: "Delete Shopping List",
      icon: "pi pi-trash",
      severity: "danger",
      command: (event) => {
        confirmPopup({
          target: event.currentTarget,
          message: `Are you sure you want to delete "${shoppingLists[activeShoppingListTabIndex].title}" ?`,
          icon: "pi pi-exclamation-triangle",
          defaultFocus: "accept",
          accept: () => {
            deleteShoppingListById();
            op.current?.hide();
          },
          reject: () => op.current?.hide(),
          onHide: () => op.current?.hide(),
        });
      }
    },
    // todo: edit shopping list with new modal
  ];

  return (
    <div
      className="absolute flex flex-column align-items-center"
      style={{right: 20, top: 10, zIndex: 999}}
    >
      <Button
        icon="pi pi-ellipsis-v"
        rounded
        onClick={(e) => op.current?.toggle(e)}
      />

      <OverlayPanel ref={op} dismissable unstyled>
        <DialOptions options={dialOptions}/>
      </OverlayPanel>

      <ConfirmPopup/>
    </div>
  );
}
