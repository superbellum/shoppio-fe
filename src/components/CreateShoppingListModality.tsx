import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { type ReactNode, useCallback, useRef, useState } from "react";
import type { CreateShoppingListRequest } from "../model/request/CreateShoppingListRequest";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { FloatLabel } from "primereact/floatlabel";
import { Calendar } from "primereact/calendar";
import { useAppDispatch } from "../store";
import delay from "../utils/sleep";
import { Toast } from "primereact/toast";
import { appendShoppingList } from "../store/slices/shoppingListSlice";
import { Status } from "../model/entity/Status";
import moment from "moment";

export interface CreateShoppingListModalityProps {
  visible: boolean;
  onClose: () => void;
}

export default function CreateShoppingListModality({ visible, onClose }: CreateShoppingListModalityProps) {
  const [createShoppingListRequest, setCreateShoppingListRequest] = useState<CreateShoppingListRequest | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const toast = useRef<Toast | null>(null);
  
  const onCancel = useCallback(() => {
    setCreateShoppingListRequest(null);
    onClose();
  }, [onClose, setCreateShoppingListRequest]);
  
  const onCreateShoppingList = useCallback(async () => {
    setIsLoading(true);
    await delay(1000);
    if (!createShoppingListRequest?.title.trim()) {
      console.log("Title must not be empty!");
      return;
    }
    setIsLoading(false);
    dispatch(appendShoppingList({
      id: "bcd123",
      status: Status.OPEN,
      createdDate: moment().toISOString(),
      lastModifiedDate: moment().toISOString(),
      description: createShoppingListRequest?.description,
      dueDate: createShoppingListRequest?.dueDate,
      title: createShoppingListRequest!.title.trim(),
      items: [],
    }));
    toast.current?.show({ severity: "success", summary: "Success", detail: "Created shopping list" });
    setCreateShoppingListRequest(null);
    onClose();
    
    //  todo: remove dispatch from above & uncomment below & test later
    // const response = await axios.post<IShoppingList>("http://localhost:8080/api/shopping-list", createShoppingListRequest!);
    // if (response.status !== 200) {
    //   console.log("error from BE server:", response.status);
    //   setIsLoading(false);
    //   return;
    // }
    //
    // dispatch(appendShoppingList(response.data));
    // setIsLoading(false);
  }, [createShoppingListRequest, dispatch, toast, onClose, setIsLoading, setCreateShoppingListRequest]);
  
  const footer = (
    <div>
      <Button
        label="Create"
        icon={isLoading ? "pi pi-spin pi-spinner" : "pi pi-plus"}
        iconPos="right"
        onClick={onCreateShoppingList}
        disabled={!createShoppingListRequest?.title?.trim()}
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
        header="Create Shopping List"
        visible={visible}
        className="w-11 sm:w-9 md:w-7 lg:w-5 xl:w-4"
        onHide={onCancel}
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
