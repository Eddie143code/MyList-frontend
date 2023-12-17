export const reducer = (state: any, action: any) => {
  switch (action.type) {
    // ITEM
    case "GET_LISTS":
      // console.log("in getList: ", action.payload);
      const gL = action.payload;
      return {
        ...state,
        Lists: [...gL],
      };

    case "ADD_NEW_LIST":
      console.log("in addNewList");
      return {
        Lists: [...state.Lists, action.payload],
      };

    case "EDIT_EXISTING_LIST":
      const newnewL = state.Lists.map((l: any) => {
        if (l.id === action.payload.id) {
          return { ...action.payload, items: l.items };
        }
        return l;
      });
      // console.log(newnewL);

      return { Lists: [...newnewL] };

    case "DELETE_EXISTING_LIST":
      console.log("in deleteExistingList");
      const newDL = state.Lists.filter((list: any) => {
        return list.id !== action.payload;
      });

      return { Lists: [...newDL] };

    // ITEM
    case "ADD_NEW_ITEM":
      //  console.log("in addNewList");

      const newL = state.Lists.map((l: any) => {
        if (l.myListId == action.payload.myListId) {
          return {
            ...state.Lists[action.payload.myListI],
            items: [
              ...state.Lists[action.payload.myListId].items,
              { itemId: action.payload.itemId, name: action.payload.name },
            ],
          };
        }
        return l;
      });
      // console.log(newL);

      return {
        Lists: [...newL],
      };

    case "EDIT_EXISTING_ITEM":
      const newnewI = state.Lists.map((l: any) => {
        if (l.myListId === action.payload.myListId) {
          const nnI = l.items.map((ll: any) => {
            if (ll.itemId === action.payload.itemId) {
              return {
                itemId: action.payload.itemId,
                name: action.payload.name,
              };
            }
            return ll;
          });
          return {
            myListId: l.myListId,
            name: l.name,
            items: [...nnI],
          };
        }
        return l;
      });
      console.log(newnewI);

      return { Lists: [...newnewI] };

    case "DELETE_EXISTING_ITEM":
      const nDI = state.Lists.map((list: any) => {
        if (list.myListId === action.payload.myListId) {
          const n = state.Lists.myListId.map((l: any) => {
            if (l.itemId == action.payload.itemId) {
              return;
            }
            return l;
          });
          return n;
        }
        return list;
      });

      return { Lists: [...nDI] };
  }
};
