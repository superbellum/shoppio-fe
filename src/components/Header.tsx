import CreateShoppingListModality from "./modalities/CreateShoppingListModality.tsx";
import Dial from "./molecules/Dial.tsx";
import CreateShoppingListItemModality from "./modalities/CreateShoppingListItemModality.tsx";
import EditShoppingListModality from "./modalities/EditShoppingListModality.tsx";

export default function Header() {

  return (
    <div>
      <Dial/>

      <CreateShoppingListModality/>

      <CreateShoppingListItemModality/>

      <EditShoppingListModality/>
    </div>
  );
}
