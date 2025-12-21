import {ReactNode, useCallback, useEffect, useState} from "react";
import type {PatchShoppingListRequest} from "../../model/request/PatchShoppingListRequest.ts";
import {useAppDispatch, useAppSelector} from "../../store";
import {useNotification} from "../../hooks/useNotification.ts";
import {Button} from "primereact/button";
import {setEditShoppingListModalityProps} from "../../store/slices/appSlice.ts";
import {Dialog} from "primereact/dialog";
import {FloatLabel} from "primereact/floatlabel";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {Calendar} from "primereact/calendar";
import axios from "axios";
import type {IShoppingList} from "../../model/entity/IShoppingList.ts";
import {SHOPPING_LIST_API_URL} from "../../constants/constants.ts";
import {upsertShoppingList} from "../../store/slices/shoppingListSlice.ts";

export default function EditShoppingListModality() {
  const [patchShoppingListRequest, setPatchShoppingListRequest] = useState<PatchShoppingListRequest | null>(null);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const {notify} = useNotification();
  const {isVisible, id: shoppingListId} = useAppSelector(state => state.appState.editShoppingListModalityProps);
  const shoppingListToEdit = useAppSelector(state => state.shoppingLists.find(l => l.id === shoppingListId));

  useEffect(() => {
    setPatchShoppingListRequest({
      title: shoppingListToEdit?.title,
      description: shoppingListToEdit?.description,
      status: shoppingListToEdit?.status,
      dueDate: shoppingListToEdit?.dueDate,
    });
  }, [shoppingListToEdit]);

  const onClose = useCallback(() => {
    setLoading(false);
    setPatchShoppingListRequest(null);
    dispatch(setEditShoppingListModalityProps({isVisible: false, id: undefined}));
  }, [dispatch, setPatchShoppingListRequest, setLoading]);

  const onEditShoppingList = useCallback(async () => {
    setLoading(true);
    const response = await axios.patch<IShoppingList>(`${SHOPPING_LIST_API_URL}/${shoppingListId}`, patchShoppingListRequest);

    if (response.status !== 200) {
      notify("Error", `Error when editing shopping list: ${response.status}: ${response.statusText}`, "error");
      onClose();
      return;
    }

    dispatch(upsertShoppingList(response.data));
    notify("Success", "Shopping list updated", "success");
    onClose();
  }, [shoppingListId, patchShoppingListRequest, dispatch, notify, onClose, setLoading]);

  const isEditButtonDisabled = () => {
    return shoppingListToEdit?.title === patchShoppingListRequest?.title
      && shoppingListToEdit?.description === patchShoppingListRequest?.description
      && shoppingListToEdit?.status === patchShoppingListRequest?.status
      && shoppingListToEdit?.dueDate === patchShoppingListRequest?.dueDate; // todo: check for equality
  };

  const footer = (
    <div>
      <Button
        label="Save"
        icon={loading ? "pi pi-spin pi-spinner" : "pi pi-check"}
        iconPos="right"
        onClick={onEditShoppingList}
        disabled={isEditButtonDisabled()}
      />
    </div>
  );

  return (
    <>
      <Dialog
        maximized={window.innerWidth < 576}
        draggable={false}
        resizable={false}
        header={`Edit Shopping List: ${shoppingListToEdit?.title}`}
        visible={isVisible}
        className="w-11 sm:w-9 md:w-7 lg:w-5 xl:w-4"
        onHide={onClose}
        footer={footer as ReactNode}
      >
        <div className="flex flex-column justify-content-center pt-4 gap-6">
          <FloatLabel>
            <InputText
              className="w-full"
              id="title"
              value={patchShoppingListRequest?.title}
              onChange={(e) => setPatchShoppingListRequest({
                ...patchShoppingListRequest,
                title: e.target.value.trimStart(),
              })}
            />
            <label htmlFor="title">Title</label>
          </FloatLabel>

          <FloatLabel>
            <InputTextarea
              className="w-full"
              id="description"
              value={patchShoppingListRequest?.description}
              onChange={(e) => setPatchShoppingListRequest({
                ...patchShoppingListRequest,
                description: e.target.value,
              } as PatchShoppingListRequest)}
              rows={5}
            />
            <label htmlFor="description">Description</label>
          </FloatLabel>

          <FloatLabel>
            <Calendar
              className="w-full"
              id="dueDate"
              value={patchShoppingListRequest?.dueDate ? new Date(patchShoppingListRequest.dueDate) : undefined}
              onChange={(e) => {
                const dueDate = e.value instanceof Date ? e.value.toISOString() : undefined;
                setPatchShoppingListRequest({
                  ...patchShoppingListRequest,
                  dueDate: dueDate,
                })
              }}
              minDate={new Date()}
              readOnlyInput
              hourFormat="24"
              showIcon
              locale="en"
              dateFormat="dd M yy"
              showButtonBar
              showTime
            />
            <label htmlFor="dueDate">Due Date</label>
          </FloatLabel>

          <p>todo: status</p>
        </div>
      </Dialog>
    </>
  );
}
