import {ReactNode, useCallback, useRef, useState} from "react";
import {Toast} from "primereact/toast";
import type {CreateShoppingListItemRequest} from "../../model/request/CreateShoppingListItemRequest.ts";
import {useAppDispatch, useAppSelector} from "../../store";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {FloatLabel} from "primereact/floatlabel";
import {InputText} from "primereact/inputtext";
import axios from "axios";
import type {IShoppingListItem} from "../../model/entity/IShoppingListItem.ts";
import {addItemToShoppingList} from "../../store/slices/shoppingListSlice.ts";
import {Dropdown} from "primereact/dropdown";
import {Priority} from "../../model/entity/Priority.ts";
import {setCreateShoppingListItemModality} from "../../store/slices/appSlice.ts";

export default function CreateShoppingListItemModality() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useRef<Toast | null>(null);
  const {isVisible, itemId} = useAppSelector(state => state.appState.createShoppingListItemModality);
  const dispatch = useAppDispatch();
  const [createShoppingListItemRequest, setCreateShoppingListItemRequest] = useState<CreateShoppingListItemRequest | null>(null);

  const onClose = useCallback(() => {
    setIsLoading(false);
    setCreateShoppingListItemRequest(null);
    dispatch(setCreateShoppingListItemModality({isVisible: false, itemId: undefined}));
  }, [dispatch, setCreateShoppingListItemRequest, setIsLoading]);

  const onCreateShoppingListItem = useCallback(async () => {
    if (!itemId) {
      return;
    }

    setIsLoading(true);

    const response = await axios.post<IShoppingListItem>(
      `http://localhost:8080/api/shopping-list/${itemId}/items`,
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
  }, [itemId, createShoppingListItemRequest, dispatch, onClose]);

  const footer = (
    <div>
      <Button
        label="Create"
        icon={isLoading ? "pi pi-spin pi-spinner" : "pi pi-plus"}
        iconPos="right"
        onClick={onCreateShoppingListItem}
        disabled={!createShoppingListItemRequest?.name?.trim() || !createShoppingListItemRequest?.priority}
      />
    </div>
  );

  const selectedPriorityTemplate = (option: Priority, props) => {
    if (option) {
      let iconClass = "";
      switch (option) {
        case Priority.HIGH:
          iconClass = "pi-angle-double-up text-red-500";
          break;
        case Priority.MEDIUM:
          iconClass = "pi-equals text-yellow-500";
          break;
        case Priority.LOW:
          iconClass = "pi-angle-double-down text-green-500";
          break;
      }
      return (
        <div className="flex align-items-center">
          <i className={`pi mr-2 ${iconClass}`}></i>
          <span>{option}</span>
        </div>
      );
    }

    return <span>{"Q"}</span>;
  };

  const priorityOptionTemplate = (option: string) => {
    let iconClass = "";
    switch (option) {
      case Priority.HIGH:
        iconClass = "pi-angle-double-up text-red-500";
        break;
      case Priority.MEDIUM:
        iconClass = "pi-equals text-yellow-500";
        break;
      case Priority.LOW:
        iconClass = "pi-angle-double-down text-green-500";
        break;
    }
    return (
      <div className="flex align-items-center">
        <i className={`pi mr-2 ${iconClass}`}></i>
        <span>{option}</span>
      </div>
    );
  };

  return (
    <>
      <Toast ref={toast}/>

      <Dialog
        maximizable
        draggable={false}
        resizable={false}
        header="Create Shopping List Item"
        visible={isVisible && !!itemId}
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
              } as CreateShoppingListItemRequest)}
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

          <FloatLabel>
            <Dropdown
              className="w-full"
              inputId="priority"
              value={createShoppingListItemRequest?.priority}
              onChange={(e) => setCreateShoppingListItemRequest({
                ...createShoppingListItemRequest,
                priority: e.value,
              } as CreateShoppingListItemRequest)}
              options={Object.values(Priority)}
              valueTemplate={selectedPriorityTemplate as ReactNode}
              itemTemplate={priorityOptionTemplate as ReactNode}
              showClear
            />
            <label htmlFor="priority">Priority</label>
          </FloatLabel>
        </div>
      </Dialog>
    </>
  );
}
