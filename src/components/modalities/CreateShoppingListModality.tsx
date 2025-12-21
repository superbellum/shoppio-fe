import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {type ReactNode, useCallback, useState} from "react";
import type {CreateShoppingListRequest} from "../../model/request/CreateShoppingListRequest.ts";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {FloatLabel} from "primereact/floatlabel";
import {Calendar} from "primereact/calendar";
import {useAppDispatch, useAppSelector} from "../../store";
import {appendShoppingList} from "../../store/slices/shoppingListSlice.ts";
import axios from "axios";
import type {IShoppingList} from "../../model/entity/IShoppingList.ts";
import {setCreateShoppingListModalityProps} from "../../store/slices/appSlice.ts";
import {useNotification} from "../../hooks/useNotification.ts";
import {SHOPPING_LIST_API_URL} from "../../constants/constants.ts";

export default function CreateShoppingListModality() {
  const [createShoppingListRequest, setCreateShoppingListRequest] = useState<CreateShoppingListRequest | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const {notify} = useNotification();
  const {isVisible} = useAppSelector(state => state.appState.createShoppingListModalityProps);

  const onClose = useCallback(() => {
    setLoading(false);
    setCreateShoppingListRequest(null);
    dispatch(setCreateShoppingListModalityProps({isVisible: false}));
  }, [dispatch, setCreateShoppingListRequest, setLoading]);

  const onCreateShoppingList = useCallback(async () => {
    setLoading(true);

    const response = await axios.post<IShoppingList>(SHOPPING_LIST_API_URL, createShoppingListRequest!);

    if (response.status !== 200) {
      notify("Error", `Error when creating shopping list: ${response.status}: ${response.statusText}`, "error");
      onClose();
      return;
    }

    dispatch(appendShoppingList(response.data));
    notify("Success", "Shopping list created", "success");
    onClose();
  }, [createShoppingListRequest, dispatch, notify, onClose]);

  const footer = (
    <div>
      <Button
        label="Create"
        icon={loading ? "pi pi-spin pi-spinner" : "pi pi-plus"}
        iconPos="right"
        onClick={onCreateShoppingList}
        disabled={!createShoppingListRequest?.title?.trim()}
      />
    </div>
  );

  return (
    <>
      <Dialog
        maximized={window.innerWidth < 576}
        draggable={false}
        resizable={false}
        header="Create Shopping List"
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
              value={createShoppingListRequest?.title}
              onChange={(e) => setCreateShoppingListRequest({
                ...createShoppingListRequest,
                title: e.target.value.trimStart(),
              })}
            />
            <label htmlFor="title">Title</label>
          </FloatLabel>

          <FloatLabel>
            <InputTextarea
              className="w-full"
              id="description"
              value={createShoppingListRequest?.description}
              onChange={(e) => setCreateShoppingListRequest({
                ...createShoppingListRequest,
                description: e.target.value,
              } as CreateShoppingListRequest)}
              rows={5}
            />
            <label htmlFor="description">Description</label>
          </FloatLabel>

          <FloatLabel>
            <Calendar
              className="w-full"
              id="dueDate"
              value={createShoppingListRequest?.dueDate ? new Date(createShoppingListRequest.dueDate) : undefined}
              onChange={(e) => {
                const dueDate = e.value instanceof Date ? e.value.toISOString() : undefined;
                setCreateShoppingListRequest({
                  ...createShoppingListRequest,
                  dueDate: dueDate,
                } as CreateShoppingListRequest)
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
        </div>
      </Dialog>
    </>
  );
};
