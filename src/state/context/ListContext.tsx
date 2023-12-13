"use client";
import { useContext, createContext, useState, useReducer } from "react";
import { reducer } from "./reducer";
import { loginUserService, registerUserService } from "../services/userService";
import { fetchAllLists } from "../services/ListService";

const initialState: any = {
  Lists: [],
};

const AppContext = createContext(initialState);

export const AppProvider = ({ children }: any) => {
  const [state, dispatch]: any = useReducer(reducer, initialState);

  const getAllLists = async () => {
    console.log("in getAllLists context");
    const res = await fetchAllLists();
    dispatch({ type: "GET_LISTS", payload: res });
    //  console.log(res);

    return res;
  };

  const addNewList = (req: any) => {
    dispatch({ type: "ADD_NEW_LIST", payload: req });
  };

  const editList = (req: any) => {
    console.log("this is request in editList: ", req);
    dispatch({ type: "EDIT_EXISTING_LIST", payload: req });
  };

  const deleteList = (req: any) => {
    console.log("this is request in deleteList: ", req);
    dispatch({ type: "DELETE_EXISTING_LIST", payload: req });
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

  const deleteItem = (req: any) => {
    console.log("this is request in editItem: ", req);
    dispatch({ type: "DELETE_EXISTING_ITEM", payload: req });
  };

  const userRegister = (req: any) => {
    // console.log(req);

    registerUserService(req);
  };

  const userLogin = (req: any) => {
    loginUserService(req);
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        addNewList,
        editList,
        deleteList,
        findList,
        addNewItem,
        editItem,
        deleteItem,
        userRegister,
        userLogin,
        getAllLists,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
