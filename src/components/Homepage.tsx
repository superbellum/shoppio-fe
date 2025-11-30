import useDataLoader from "../hooks/useDataLoader";
import { ReactNode, useEffect, useState } from "react";
import { useAppSelector } from "../store";
import { TabPanel, TabView } from "primereact/tabview";
import ShoppingListTab from "./ShoppingListTab";
import { Button } from "primereact/button";
import CreateShoppingListModality from "./CreateShoppingListModality";

export default function Homepage() {
  const shoppingLists = useAppSelector(state => state.shoppingLists);
  const { loadShoppingLists } = useDataLoader();
  const [isCreateShoppingListModalityVisible, setIsCreateShoppingListModalityVisible] = useState(false);
  
  useEffect(() => {
    loadShoppingLists();
  }, [loadShoppingLists]);
  
  return (
    <>
      <CreateShoppingListModality
        visible={isCreateShoppingListModalityVisible}
        onHide={() => setIsCreateShoppingListModalityVisible(false)}
      />
      
      <div className="p-4">
        <div className="flex align-items-center gap-3 p-1">
        <span className="text-2xl">
        <i className="pi pi-shopping-cart text-2xl mr-2"></i>
        Shopping lists: {shoppingLists.length}
        </span>
          <Button size="small" icon="pi pi-plus" rounded onClick={() => setIsCreateShoppingListModalityVisible(true)}/>
        </div>
        
        <TabView>
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
