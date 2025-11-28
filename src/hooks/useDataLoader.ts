import { useCallback } from "react";
import type { IShoppingList } from "../model/entity/IShoppingList";
import { useAppDispatch } from "../store";
import { saveShoppingLists } from "../store/slices/shoppingListSlice";
import { Status } from "../model/entity/Status";
import moment from "moment";

export default function useDataLoader() {
  const dispatch = useAppDispatch()

  const loadShoppingLists = useCallback(async () => {
    // const response = await axios.get<IShoppingList[]>("http://localhost:8080/api/shopping-list");
    
    // TODO: dont commit his!!!
    const apiResponse: IShoppingList[] = [
      {
        id: "abc123",
        status: Status.OPEN,
        createdDate: moment().subtract(1, "month").toISOString(),
        lastModifiedDate: moment().subtract(1, "week").toISOString(),
        description: "This is a shopping list for renovating the kitchen. Expect many items and high costs :D",
        dueDate: moment().add(1, "month").toISOString(),
        title: "Kitchen upgrade",
        items: [
          {
            id: "qwe123",
            createdDate: moment().subtract(5, "day").toISOString(),
            lastModifiedDate: moment().subtract(5, "day").toISOString(),
            imageData: undefined,
            shoppingListId: "abc123",
            status: Status.OPEN,
            link: undefined,
            name: "big counter"
          },
          {
            id: "qwe456",
            createdDate: moment().subtract(4, "day").toISOString(),
            lastModifiedDate: moment().subtract(4, "day").toISOString(),
            imageData: "https://www.igscountertops.com/wp-content/uploads/2019/04/small-kitchen-counter.jpeg",
            shoppingListId: "abc123",
            status: Status.OPEN,
            link: undefined,
            name: "small counter"
          },
          {
            id: "qwe789",
            createdDate: moment().subtract(3, "day").toISOString(),
            lastModifiedDate: moment().subtract(3, "day").toISOString(),
            imageData: "https://nobio.sk/161937-large_default/pribornik-cristall-protismykovy-povrch-antracit.jpg",
            shoppingListId: "abc123",
            status: Status.COMPLETED,
            link: "https://nobio.sk/priborniky-a-prislusenstvo/30337-88932-pribornik-cristall-protismykovy-povrch-antracit.html?gad_source=1&gad_campaignid=16090376560&gbraid=0AAAAACVhWlRijR6tqtutAxf04DZfkdabo&gclid=Cj0KCQiAiqDJBhCXARIsABk2kSk_bNnmsbIDBrmLRtyixkpBF0iVIlK0Mo_boty2u_bMQyiwJ0Edx50aAlM_EALw_wcB#/2388-vnutorna_sirka_zasuvky-590_650_mm/2391-hlbka-420_490_mm?utm_source=google&utm_medium=cpc&utm_campaign=Performance%20Max&utm_id=16085241279",
            name: "utensils"
          }
        ]
      }
    ];
    
    const response = {
      status: 200,
      data: apiResponse
    };

    if (response.status === 200) {
      dispatch(saveShoppingLists(response.data));
    }
  }, [dispatch]);

  return {loadShoppingLists};
}