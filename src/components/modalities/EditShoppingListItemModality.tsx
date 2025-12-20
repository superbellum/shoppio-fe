import {ReactNode, useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store";
import {useNotification} from "../../hooks/useNotification.ts";
import {setEditShoppingListItemModalityProps} from "../../store/slices/appSlice.ts";
import axios from "axios";
import {SHOPPING_LIST_API_URL} from "../../constants/constants.ts";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {FloatLabel} from "primereact/floatlabel";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import type {PatchShoppingListItemRequest} from "../../model/request/PatchShoppingListItemRequest.ts";
import {Dropdown} from "primereact/dropdown";
import {Priority} from "../../model/entity/Priority.ts";
import type {IShoppingListItem} from "../../model/entity/IShoppingListItem.ts";
import {Status} from "../../model/entity/Status.ts";
import {updateItem} from "../../store/slices/shoppingListSlice.ts";

export default function EditShoppingListItemModality() {
  const [patchShoppingListItemRequest, setPatchShoppingListItemRequest] = useState<PatchShoppingListItemRequest | null>(null);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const {notify} = useNotification();
  const {isVisible, itemId} = useAppSelector(state => state.appState.editShoppingListItemModalityProps);
  const shoppingListItemToEdit = useAppSelector(state =>
    state.shoppingLists
      .flatMap(list => list.items)
      .find(item => item.id === itemId)
  );

  useEffect(() => {
    if (!shoppingListItemToEdit) {
      setPatchShoppingListItemRequest(null);
      return;
    }

    setPatchShoppingListItemRequest({
      name: shoppingListItemToEdit.name,
      description: shoppingListItemToEdit.description,
      status: shoppingListItemToEdit.status,
      imageUrl: shoppingListItemToEdit.imageUrl,
      link: shoppingListItemToEdit.link,
      priority: shoppingListItemToEdit.priority,
    });
  }, [shoppingListItemToEdit]);

  const onClose = useCallback(() => {
    setLoading(false);
    setPatchShoppingListItemRequest(null);
    dispatch(setEditShoppingListItemModalityProps({isVisible: false, itemId: undefined}));
  }, [dispatch, setPatchShoppingListItemRequest, setLoading]);

  const onEditShoppingListItem = useCallback(async () => {
    setLoading(true);
    const response = await axios.patch<IShoppingListItem>(`${SHOPPING_LIST_API_URL}/${shoppingListItemToEdit.shoppingListId}/items/${itemId}`, patchShoppingListItemRequest);

    if (response.status !== 200) {
      notify("Error", `Error when editing shopping list item: ${response.status}: ${response.statusText}`, "error");
      onClose();
      return;
    }

    dispatch(updateItem(response.data));
    notify("Success", "Shopping list item updated", "success");
    onClose();
  }, [shoppingListItemToEdit, itemId, patchShoppingListItemRequest, notify, onClose, setLoading, dispatch]);

  const isEditButtonDisabled = () => {
    return shoppingListItemToEdit?.name === patchShoppingListItemRequest?.name
      && shoppingListItemToEdit?.description === patchShoppingListItemRequest?.description
      && shoppingListItemToEdit?.status === patchShoppingListItemRequest?.status
      && shoppingListItemToEdit?.imageUrl === patchShoppingListItemRequest?.imageUrl
      && shoppingListItemToEdit?.link === patchShoppingListItemRequest?.link
      && shoppingListItemToEdit?.priority === patchShoppingListItemRequest?.priority
  };

  const footer = (
    <div>
      <Button
        label="Save"
        icon={loading ? "pi pi-spin pi-spinner" : "pi pi-check"}
        iconPos="right"
        onClick={onEditShoppingListItem}
        disabled={isEditButtonDisabled()}
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

  const selectedStatusTemplate = (option: Status, props) => {
    if (option) {
      let iconClass = "";
      switch (option) {
        case Status.OPEN:
          iconClass = "pi-circle text-blue-500";
          break;
        case Status.COMPLETED:
          iconClass = "pi-check text-green-500";
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

  const statusOptionTemplate = (option: string) => {
    let iconClass = "";
    switch (option) {
      case Status.OPEN:
        iconClass = "pi-circle text-blue-500";
        break;
      case Status.COMPLETED:
        iconClass = "pi-check text-green-500";
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
        header={`Edit Shopping List Item: ${shoppingListItemToEdit?.name}`}
        visible={isVisible}
        className="w-11 sm:w-9 md:w-7 lg:w-5 xl:w-4"
        onHide={onClose}
        footer={footer as ReactNode}
      >
        <div className="flex flex-column justify-content-center pt-4 gap-6">
          <FloatLabel>
            <InputText
              className="w-full"
              id="name"
              value={patchShoppingListItemRequest?.name}
              onChange={(e) => setPatchShoppingListItemRequest({
                ...patchShoppingListItemRequest,
                name: e.target.value.trimStart() || null,
              })}
            />
            <label htmlFor="name">Name</label>
          </FloatLabel>

          <FloatLabel>
            <InputTextarea
              className="w-full"
              id="description"
              value={patchShoppingListItemRequest?.description ?? undefined}
              onChange={(e) => setPatchShoppingListItemRequest({
                ...patchShoppingListItemRequest,
                description: e.target.value.trimStart() || null,
              })}
              rows={5}
            />
            <label htmlFor="description">Description</label>
          </FloatLabel>

          <FloatLabel>
            <InputText
              className="w-full"
              id="link"
              value={patchShoppingListItemRequest?.link}
              onChange={(e) => setPatchShoppingListItemRequest({
                ...patchShoppingListItemRequest,
                link: e.target.value.trim(),
              })}
            />
            <label htmlFor="link">Link</label>
          </FloatLabel>

          <FloatLabel>
            <InputText
              className="w-full"
              id="imageUrl"
              value={patchShoppingListItemRequest?.imageUrl}
              onChange={(e) => setPatchShoppingListItemRequest({
                ...patchShoppingListItemRequest,
                imageUrl: e.target.value.trim(),
              })}
            />
            <label htmlFor="imageUrl">Image URL</label>
          </FloatLabel>

          <FloatLabel>
            <Dropdown
              className="w-full"
              inputId="priority"
              value={patchShoppingListItemRequest?.priority}
              onChange={(e) => setPatchShoppingListItemRequest({
                ...patchShoppingListItemRequest,
                priority: e.value,
              })}
              options={Object.values(Priority)}
              valueTemplate={selectedPriorityTemplate as ReactNode}
              itemTemplate={priorityOptionTemplate as ReactNode}
            />
            <label htmlFor="priority">Priority</label>
          </FloatLabel>

          <FloatLabel>
            <Dropdown
              className="w-full"
              inputId="status"
              value={patchShoppingListItemRequest?.status}
              onChange={(e) => setPatchShoppingListItemRequest({
                ...patchShoppingListItemRequest,
                status: e.value,
              })}
              options={Object.values(Status)}
              valueTemplate={selectedStatusTemplate as ReactNode}
              itemTemplate={statusOptionTemplate as ReactNode}
            />
            <label htmlFor="status">Status</label>
          </FloatLabel>
        </div>
      </Dialog>
    </>
  );
}
