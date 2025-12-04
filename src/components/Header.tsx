import CreateShoppingListModality from "./modalities/CreateShoppingListModality.tsx";
import Dial from "./molecules/Dial.tsx";
import CreateShoppingListItemModality from "./modalities/CreateShoppingListItemModality.tsx";

export default function Header() {

  return (
    <div>
      <Dial/>

      <CreateShoppingListModality/>

      <CreateShoppingListItemModality/>
    </div>
  );
}
