import CreateShoppingListModality from "./modalities/CreateShoppingListModality.tsx";
import Dial from "./molecules/Dial.tsx";
import CreateShoppingListItemModality from "./modalities/CreateShoppingListItemModality.tsx";
import EditShoppingListModality from "./modalities/EditShoppingListModality.tsx";
import EditShoppingListItemModality from "./modalities/EditShoppingListItemModality.tsx";

export default function Header() {

  return (
    <div>
      <Dial/>

      <CreateShoppingListModality/>

      <CreateShoppingListItemModality/>

      <EditShoppingListModality/>

      <EditShoppingListItemModality/>
    </div>
  );
}
