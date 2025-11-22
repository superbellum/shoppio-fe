import useDataLoader from "../hooks/useDataLoader";
import {ReactNode, useEffect} from "react";
import {useAppSelector} from "../store";
import {TabPanel, TabView} from "primereact/tabview";
import ShoppingListTab from "./ShoppingListTab";

export default function Homepage() {
  const shoppingLists = useAppSelector(state => state.shoppingLists);
  const {loadShoppingLists} = useDataLoader();

  useEffect(() => {
    loadShoppingLists();
  }, [loadShoppingLists]);

  return (
    <div className="p-4">
      <h2>
        <i className="pi pi-shopping-cart text-2xl mr-2"></i>
        Shopping lists: {shoppingLists.length}
      </h2>
      <TabView>
        {shoppingLists.map(shoppingList => (
          <TabPanel header={shoppingList.title} key={shoppingList.id}>
            <ShoppingListTab shoppingList={shoppingList}/>
          </TabPanel> as ReactNode
        ))}
      </TabView>
    </div>
  );
}
