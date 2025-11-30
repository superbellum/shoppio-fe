import {ReactNode, useCallback, useRef, useState} from "react";
import {Toast} from "primereact/toast";
import type {CreateShoppingListItemRequest} from "../model/request/CreateShoppingListItemRequest";
import {useAppDispatch} from "../store";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {FloatLabel} from "primereact/floatlabel";
import {InputText} from "primereact/inputtext";
import axios from "axios";
import type {IShoppingListItem} from "../model/entity/IShoppingListItem";
import {addItemToShoppingList} from "../store/slices/shoppingListSlice.ts";

export interface CreateShoppingListItemModalityProps {
  visible: boolean;
  onHide: () => void;
  shoppingListId: string;
}

export default function CreateShoppingListItemModality(props: CreateShoppingListItemModalityProps) {
  const {visible, onHide, shoppingListId} = props;
  const [isLoading, setIsLoading] = useState(false);
  const toast = useRef<Toast | null>(null);
  const dispatch = useAppDispatch();
  const [createShoppingListItemRequest, setCreateShoppingListItemRequest] = useState<CreateShoppingListItemRequest | null>(null);

  const onClose = useCallback(() => {
    setCreateShoppingListItemRequest(null);
    onHide();
  }, [onHide, setCreateShoppingListItemRequest]);

  const onCreateShoppingListItem = useCallback(async () => {
    setIsLoading(true);

    const response = await axios.post<IShoppingListItem>(
      `http://localhost:8080/api/shopping-list/${shoppingListId}/items`,
      createShoppingListItemRequest!
    );

    if (response.status !== 200) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: `Error when creating shopping list item: ${response.status}: ${response.statusText}`
      });
      onClose();
      return;
    }

    dispatch(addItemToShoppingList(response.data));
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: "Shopping list item successfully created"
    });
    onClose();
  }, [shoppingListId, createShoppingListItemRequest, dispatch, onClose]);

  const footer = (
    <div>
      <Button
        label="Create"
        icon={isLoading ? "pi pi-spin pi-spinner" : "pi pi-plus"}
        iconPos="right"
        onClick={onCreateShoppingListItem}
        disabled={!createShoppingListItemRequest?.name?.trim()}
      />
    </div>
  );

  return (
    <>
      <Toast ref={toast}/>

      <Dialog
        maximizable
        draggable={false}
        resizable={false}
        header="Create Shopping List Item"
        visible={visible}
        className="w-11 sm:w-9 md:w-7 lg:w-5 xl:w-4"
        onHide={onClose}
        footer={footer as ReactNode}
      >
        <div className="flex flex-column justify-content-center pt-4 gap-6">
          <FloatLabel>
            <InputText
              className="w-full"
              id="name"
              value={createShoppingListItemRequest?.name}
              onChange={(e) => setCreateShoppingListItemRequest({
                ...createShoppingListItemRequest,
                name: e.target.value.trimStart(),
              })}
            />
            <label htmlFor="name">Name</label>
          </FloatLabel>

          <FloatLabel>
            <InputText
              className="w-full"
              id="link"
              value={createShoppingListItemRequest?.link}
              onChange={(e) => setCreateShoppingListItemRequest({
                ...createShoppingListItemRequest,
                link: e.target.value.trim(),
              } as CreateShoppingListItemRequest)}
            />
            <label htmlFor="link">Link</label>
          </FloatLabel>

          <FloatLabel>
            <InputText
              className="w-full"
              id="imageUrl"
              value={createShoppingListItemRequest?.imageUrl}
              onChange={(e) => setCreateShoppingListItemRequest({
                ...createShoppingListItemRequest,
                imageUrl: e.target.value.trim(),
              } as CreateShoppingListItemRequest)}
            />
            <label htmlFor="imageUrl">Image URL</label>
          </FloatLabel>
        </div>
      </Dialog>
    </>
  );
}
