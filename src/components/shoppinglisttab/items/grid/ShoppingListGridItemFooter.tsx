import type {IShoppingListItem} from "../../../../model/entity/IShoppingListItem.ts";
import {ButtonGroup} from "primereact/buttongroup";
import {Status} from "../../../../model/entity/Status.ts";
import {Button} from "primereact/button";
import type {ReactNode} from "react";
import {useCallback, useRef, useState} from "react";
import axios from "axios";
import {SHOPPING_LIST_API_URL} from "../../../../constants/constants.ts";
import {useAppDispatch} from "../../../../store";
import {deleteItemFromList, updateItem} from "../../../../store/slices/shoppingListSlice.ts";
import {useNotification} from "../../../../hooks/useNotification.ts";
import {ConfirmPopup} from "primereact/confirmpopup";
import sleep from "../../../../utils/sleep.ts";
import {setEditShoppingListItemModalityProps} from "../../../../store/slices/appSlice.ts";

interface Loading {
  onComplete: boolean;
  onDelete: boolean;
  onEdit: boolean;
}

export interface ShoppingListGridItemFooterProps {
  item: IShoppingListItem;
}

export default function ShoppingListGridItemFooter({item}: ShoppingListGridItemFooterProps) {
  const dispatch = useAppDispatch();
  const {notify} = useNotification();
  const [loading, setLoading] = useState<Loading>({onEdit: false, onComplete: false, onDelete: false});
  const buttonEl = useRef(null);
  const [confirmPopupVisible, setConfirmPopupVisible] = useState(false);

  const onDeleteItem = useCallback(async () => {
    setLoading(prev => ({...prev, onDelete: true}));

    const response = await axios.delete<string>(`${SHOPPING_LIST_API_URL}/${item.shoppingListId}/items/${item.id}`);

    if (response.status === 200) {
      dispatch(deleteItemFromList(item));
      notify("Success", "Item deleted from list", "success");
    } else {
      notify("Error", `Error when deleting shopping list item: ${response.status}: ${response.statusText}`, "error");
    }

    setLoading(prev => ({...prev, onDelete: false}));
  }, [item, dispatch, notify, setLoading]);

  const onEditItem = useCallback(async () => {
    dispatch(setEditShoppingListItemModalityProps({isVisible: true, itemId: item.id}));
  }, [dispatch]);

  const onCompleteItem = useCallback(async () => {
    setLoading(prev => ({...prev, onComplete: true}));
    await sleep(1000);

    const response = await axios.patch<IShoppingListItem>(
      `${SHOPPING_LIST_API_URL}/${item.shoppingListId}/items/${item.id}`,
      {status: Status.COMPLETED}
    );

    if (response.status === 200) {
      dispatch(updateItem(response.data));
      notify("Success", "Successfully completed item", "success");
    } else {
      notify("Error", `Error when completing item: ${response.status}: ${response.statusText}`, "error");
    }

    setLoading(prev => ({...prev, onComplete: false}));
  }, [item, dispatch, notify, setLoading]);

  return (
    <div className="flex justify-content-end align-items-center">
      <ButtonGroup>
        {item.status !== Status.COMPLETED && (
          <Button
            severity="success"
            className="p-2"
            size="small"
            tooltip="Complete"
            tooltipOptions={{position: "top", showDelay: 300}}
            onClick={onCompleteItem}
          >
            {loading.onComplete ? (
              <i className="pi pi-spin pi-spinner text-sm"></i>
            ) : (
              <i className="pi pi-check-circle text-sm"></i>
            ) as ReactNode}
          </Button>
        )}

        <Button
          className="p-2"
          severity="secondary"
          size="small"
          tooltip="Edit"
          tooltipOptions={{position: "top", showDelay: 300}}
          onClick={onEditItem}
        >
          {loading.onEdit ? (
            <i className="pi pi-spin pi-spinner text-sm"></i>
          ) : (
            <i className="pi pi-pencil text-sm"></i>
          ) as ReactNode}
        </Button>

        <Button
          ref={buttonEl}
          severity="danger"
          className="p-2"
          size="small"
          tooltip="Delete"
          tooltipOptions={{position: "top", showDelay: 300}}
          onClick={() => setConfirmPopupVisible(true)}
        >
          {loading.onDelete ? (
            <i className="pi pi-spin pi-spinner text-sm"></i>
          ) : (
            <i className="pi pi-trash text-sm"></i>
          ) as ReactNode}
        </Button>

        <ConfirmPopup
          target={buttonEl.current!}
          visible={confirmPopupVisible}
          onHide={() => setConfirmPopupVisible(false)}
          message="Are you sure you want to delete this item?"
          icon="pi pi-exclamation-triangle text-red-500"
          accept={onDeleteItem}
        />
      </ButtonGroup>
    </div>
  );
}
