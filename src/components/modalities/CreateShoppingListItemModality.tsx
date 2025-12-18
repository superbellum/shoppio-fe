import {ReactNode, useCallback, useState} from "react";
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
import {setCreateShoppingListItemModalityProps} from "../../store/slices/appSlice.ts";
import {useNotification} from "../../hooks/useNotification.ts";
import {SHOPPING_LIST_API_URL} from "../../constants/constants.ts";

export default function CreateShoppingListItemModality() {
  const [loading, setLoading] = useState(false);
  const {notify} = useNotification();
  const {isVisible, shoppingListId} = useAppSelector(state => state.appState.createShoppingListItemModalityProps);
  const dispatch = useAppDispatch();
  const [createShoppingListItemRequest, setCreateShoppingListItemRequest] = useState<CreateShoppingListItemRequest | null>(null);

  const onClose = useCallback(() => {
    setLoading(false);
    setCreateShoppingListItemRequest(null);
    dispatch(setCreateShoppingListItemModalityProps({isVisible: false, shoppingListId: undefined}));
  }, [dispatch, setCreateShoppingListItemRequest, setLoading]);

  const onCreateShoppingListItem = useCallback(async () => {
    if (!shoppingListId) {
      return;
    }

    setLoading(true);

    const response = await axios.post<IShoppingListItem>(
      `${SHOPPING_LIST_API_URL}/${shoppingListId}/items`,
      createShoppingListItemRequest!
    );

    if (response.status === 200) {
      dispatch(addItemToShoppingList(response.data));
      notify("Success", "Shopping list item created", "success");
    } else {
      notify("Error", `Error when creating item: ${response.status}: ${response.statusText}`, "error");
    }

    onClose();
  }, [shoppingListId, createShoppingListItemRequest, dispatch, notify, onClose]);

  const isCreateButtonDisabled = () => {
    return !createShoppingListItemRequest?.name?.trim()
      || !createShoppingListItemRequest?.priority
      || !createShoppingListItemRequest?.imageUrl;
  }


  const footer = (
    <div>
      <Button
        label="Create"
        icon={loading ? "pi pi-spin pi-spinner" : "pi pi-plus"}
        iconPos="right"
        onClick={onCreateShoppingListItem}
        disabled={isCreateButtonDisabled()}
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
      <Dialog
        maximizable
        draggable={false}
        resizable={false}
        header={<p className="select-none">Create Shopping List Item</p> as ReactNode}
        visible={isVisible && !!shoppingListId}
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
            <label htmlFor="name">
              Name
              <span className="text-red-600 ml-1">*</span>
            </label>
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
            <label htmlFor="imageUrl">
              Image URL
              <span className="text-red-600 ml-1">*</span>
            </label>
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
            <label htmlFor="priority">
              Priority
              <span className="text-red-600 ml-1">*</span>
            </label>
          </FloatLabel>
        </div>
        <p className="mt-3 text-xs select-none"><span className="text-red-600">*</span> required</p>
      </Dialog>
    </>
  );
}
