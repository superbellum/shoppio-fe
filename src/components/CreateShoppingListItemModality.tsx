import { ReactNode, useCallback, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import type { CreateShoppingListItemRequest } from "../model/request/CreateShoppingListItemRequest";
import { useAppDispatch } from "../store";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import delay from "../utils/sleep";
import { addItemToShoppingList } from "../store/slices/shoppingListSlice";
import { Status } from "../model/entity/Status";
import moment from "moment";

export interface CreateShoppingListItemModalityProps {
  visible: boolean;
  onClose: () => void;
  shoppingListId: string;
}

export default function CreateShoppingListItemModality(props: CreateShoppingListItemModalityProps) {
  const { visible, onClose, shoppingListId } = props;
  const [isLoading, setIsLoading] = useState(false);
  const toast = useRef<Toast | null>(null);
  const dispatch = useAppDispatch();
  const [createShoppingListItemRequest, setCreateShoppingListItemRequest] = useState<CreateShoppingListItemRequest | null>(null);
  
  const onCancel = useCallback(() => {
    setCreateShoppingListItemRequest(null);
    onClose();
  }, [onClose, setCreateShoppingListItemRequest]);
  
  const onCreateShoppingListItem = useCallback(async () => {
    setIsLoading(true);
    await delay(1000);
    if (!createShoppingListItemRequest?.name.trim()) {
      console.log("Name must not be empty!");
      return;
    }
    setIsLoading(false);
    dispatch(addItemToShoppingList({
      shoppingListId: shoppingListId,
      id: moment().toDate().toString(),
      link: createShoppingListItemRequest?.link,
      imageData: createShoppingListItemRequest?.imageData,
      name: createShoppingListItemRequest!.name,
      status: Status.OPEN,
      lastModifiedDate: moment().toDate().toString(),
      createdDate: moment().toDate().toString(),
    }));
    toast.current?.show({ severity: "success", summary: "Success", detail: "Created shopping list item" });
    setCreateShoppingListItemRequest(null);
    onClose();
    
    // todo: remove dispatch from above & uncomment below & test later
    // const response = await axios.post<IShoppingListItem>(
    //   `http://localhost:8080/api/shopping-list/${shoppingListId}/items`,
    //   createShoppingListItemRequest!
    // );
    // if (response.status !== 200) {
    //   console.log("error from BE server:", response.status);
    //   setIsLoading(false);
    //   return;
    // }
    //
    // dispatch(appendShoppingList(response.data));
    // setIsLoading(false);
  }, [createShoppingListItemRequest, shoppingListId, dispatch, toast, onClose, setIsLoading, setCreateShoppingListItemRequest]);
  
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
        onHide={onCancel}
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
              id="imageData"
              value={createShoppingListItemRequest?.imageData}
              onChange={(e) => setCreateShoppingListItemRequest({
                ...createShoppingListItemRequest,
                imageData: e.target.value.trim(),
              } as CreateShoppingListItemRequest)}
            />
            <label htmlFor="imageData">Image Data</label>
          </FloatLabel>
        </div>
      </Dialog>
    </>
  );
}
