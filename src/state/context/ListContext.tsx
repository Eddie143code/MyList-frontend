"use client";
import { useContext, createContext, useState, useReducer } from "react";
import { reducer } from "./reducer";

const initialState: any = {
  Lists: [
    {
      id: 1,
      name: "Movies",
      items: [
        { id: 1, name: "Avatar" },
        { id: 2, name: "The Avengers" },
        { id: 3, name: "Kill Bill" },
      ],
    },
    {
      id: 2,
      name: "Books",
      items: [
        { id: 4, name: "Avatar" },
        { id: 5, name: "The Hobbit" },
        { id: 6, name: "The Lord of the Rings" },
      ],
    },
    { id: 3, name: "Anime", items: [] },
  ],
};

const AppContext = createContext(initialState);

export const AppProvider = ({ children }: any) => {
  const [state, dispatch]: any = useReducer(reducer, initialState);

  const addNewList = (req: any) => {
    dispatch({ type: "ADD_NEW_LIST", payload: req });
  };

  const editList = (req: any) => {
    console.log("this is request in editList: ", req);
    dispatch({ type: "EDIT_EXISTING_LIST", payload: req });
  };

  const findList = (req: any) => {
    const myList = state.Lists.find(
      (list: any) => list.name.toLowerCase() === req.toLowerCase()
    );
    return myList;
  };

  const addNewItem = (req: any) => {
    console.log("this is request: ", req);

    dispatch({ type: "ADD_NEW_ITEM", payload: req });
  };

  const editItem = (req: any) => {
    console.log("this is request in editItem: ", req);
    dispatch({ type: "EDIT_EXISTING_ITEM", payload: req });
  };
  return (
    <AppContext.Provider
      value={{ ...state, addNewList, findList, addNewItem, editList, editItem }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
