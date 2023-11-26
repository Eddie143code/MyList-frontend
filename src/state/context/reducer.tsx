export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "addNewList":
      return {
        ...state,
        allLists: [...state.allLists, action.payload],
      };
  }
};
