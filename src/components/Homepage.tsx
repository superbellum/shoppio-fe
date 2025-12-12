import useDataLoader from "../hooks/useDataLoader.ts";
import {ReactNode, useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../store";
import {TabPanel, TabView, type TabViewTabChangeEvent} from "primereact/tabview";
import ShoppingListTab from "./shoppingListTab/ShoppingListTab.tsx";
import Header from "./Header.tsx";
import {setActiveShoppingListTabIndex} from "../store/slices/appSlice.ts";

export default function Homepage() {
  const shoppingLists = useAppSelector(state => state.shoppingLists);
  const {loadShoppingLists} = useDataLoader();
  const dispatch = useAppDispatch();
  const activeShoppingListTabIndex = useAppSelector(state => state.appState.activeShoppingListTabIndex);

  const onTabChange = useCallback((e: TabViewTabChangeEvent) => {
    dispatch(setActiveShoppingListTabIndex(e.index));
  }, [dispatch]);

  useEffect(() => {
    loadShoppingLists();
  }, [loadShoppingLists]);

  return (
    <>
      <Header/>

      <div className="p-2">
        <TabView
          scrollable
          activeIndex={activeShoppingListTabIndex}
          onTabChange={onTabChange}>
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
