import {Button} from "primereact/button";
import {useCallback} from "react";
import {useAppDispatch} from "../../store";
import {setCreateShoppingListModality} from "../../store/slices/appSlice.ts";

export default function Dial() {
  const dispatch = useAppDispatch();


  const onCreateShoppingList = useCallback(() => {
    dispatch(setCreateShoppingListModality({isVisible: true}));
  }, [dispatch]);

  return (
    <div>
      <Button
        tooltip="Create Shopping List"
        tooltipOptions={{
          position: "left",
          showDelay: 500,
        }}
        className="absolute"
        style={{right: 20, top: 20, zIndex: 999}}
        icon="pi pi-plus"
        rounded
        onClick={onCreateShoppingList}
      />
    </div>
  );
}
