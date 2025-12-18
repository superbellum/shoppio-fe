import useDataLoader from "../hooks/useDataLoader.ts";
import {ReactNode, useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../store";
import {TabPanel, TabView, type TabViewTabChangeEvent} from "primereact/tabview";
import Header from "./Header.tsx";
import {setActiveShoppingListTabIndex} from "../store/slices/appSlice.ts";
import moment from "moment";
import Icon from "./molecules/Icon.tsx";
import ShoppingListTab from "./shoppinglisttab/ShoppingListTab.tsx";

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

  function getColorForRemainingTime(time: number) {
    return time <= 0 ? "text-red-500" : "text-yellow-500";
  }

  return (
    <>
      <Header/>

      <div className="p-2">
        <TabView
          scrollable
          activeIndex={activeShoppingListTabIndex}
          onTabChange={onTabChange}>
          {shoppingLists.map(shoppingList => {
            const remainingTime = moment(shoppingList.dueDate).diff(moment(), "seconds");
            return (
              <TabPanel
                header={(
                  <div>
                    <p>{shoppingList.title}</p>
                    {remainingTime < 24 * 60 * 60 && (
                      <Icon
                        iconClassName={`absolute pi pi-stopwatch ${getColorForRemainingTime(remainingTime)}`}
                        iconStyle={{scale: 0.8, top: 10, right: 0}}
                        tooltip={{
                          text: remainingTime <= 0
                            ? "Time's up"
                            : remainingTime <= 3600
                              ? `Remaining ${(remainingTime / 60).toFixed(0)} minutes`
                              : `Remaining ${(remainingTime / 60 / 60).toFixed(0)} hours`
                        }}
                      />
                    )}
                  </div>
                ) as ReactNode}
                key={shoppingList.id}
              >
                <ShoppingListTab shoppingList={shoppingList}/>
              </TabPanel> as ReactNode
            );
          })}
        </TabView>
      </div>
    </>
  );
}
