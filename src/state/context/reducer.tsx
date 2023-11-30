export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_NEW_LIST":
      console.log("in addNewList");
      return {
        ...state,
        Lists: [...state.Lists, action.payload],
      };

    case "EDIT_EXISTING_LIST":
      const newnewL = state.Lists.map((l: any) => {
        if (l.id === action.payload.id) {
          return { ...action.payload, items: l.items };
        }
        return l;
      });
      console.log(newnewL);

      return { Lists: [...newnewL] };

    case "DELETE_EXISTING_LIST":
      const newDL = state.Lists.filter((list: any) => {
        return list.id !== action.payload;
      });
      console.log(newDL);

      return { Lists: [...newDL] };

    case "ADD_NEW_ITEM":
      console.log("in addNewList");

      const newL = state.Lists.map((l: any) => {
        if (l.id == action.payload.list.id) {
          return {
            ...state.Lists[action.payload.list.id - 1],
            items: [
              ...state.Lists[action.payload.list.id - 1].items,
              action.payload.item,
            ],
          };
        }
        return l;
      });
      console.log(newL);

      return {
        Lists: [...newL],
      };

    case "EDIT_EXISTING_ITEM":
      const newnewI = state.Lists.map((l: any) => {
        if (l.id === action.payload.list.id) {
          const nnI = l.items.map((ll: any) => {
            if (ll.id === action.payload.item.id) {
              return action.payload.item;
            }
            return ll;
          });
          console.log(nnI);

          return {
            id: action.payload.list.id,
            name: action.payload.list.name,
            items: [...nnI],
          };
        }
        return l;
      });
      console.log(newnewI);

      return { Lists: [...newnewI] };
  }
};
