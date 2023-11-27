export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_NEW_LIST":
      console.log("in addNewList");
      return {
        ...state,
        Lists: [...state.Lists, action.payload],
      };

    case "ADD_NEW_ITEM":
      console.log("in addNewList");

      const newL = state.Lists.map((l: any) => {
        if (l.name == action.payload.list.name) {
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
  }
};
