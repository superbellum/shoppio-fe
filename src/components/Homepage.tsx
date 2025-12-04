import useDataLoader from "../hooks/useDataLoader.ts";
import {ReactNode, useEffect} from "react";
import {useAppSelector} from "../store";
import {TabPanel, TabView} from "primereact/tabview";
import ShoppingListTab from "./shoppingListTab/ShoppingListTab.tsx";
import Header from "./Header.tsx";

export default function Homepage() {
  const shoppingLists = useAppSelector(state => state.shoppingLists);
  const {loadShoppingLists} = useDataLoader();

  useEffect(() => {
    loadShoppingLists();
  }, [loadShoppingLists]);

  return (
    <>
      <Header/>

      <div className="p-2 md:p-4">
        <TabView scrollable>
          {shoppingLists.map(shoppingList => (
            <TabPanel header={shoppingList.title} key={shoppingList.id}>
              <ShoppingListTab shoppingList={shoppingList}/>
            </TabPanel> as ReactNode
          ))}
        </TabView>
      </div>
    </>
  );
}
