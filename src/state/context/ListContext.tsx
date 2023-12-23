"use client";
import { useContext, createContext, useState, useReducer } from "react";
import { reducer } from "./reducer";
import {
  loginUserService,
  registerUserService,
  logoutUserService,
} from "../services/UserService";
import {
  createList,
  deleteExistingList,
  editExistingList,
  fetchAllLists,
} from "../services/ListService";
import {
  createItem,
  deleteExistingItem,
  editExistingItem,
} from "../services/ItemService";

const initialState: any = {
  Lists: [],
};

const AppContext = createContext(initialState);

export const AppProvider = ({ children }: any) => {
  const [state, dispatch]: any = useReducer(reducer, initialState);

  const getAllLists = async () => {
    //  console.log("in getAllLists context");
    const res = await fetchAllLists();
    dispatch({ type: "GET_LISTS", payload: res });
    //  console.log(res);

    return res;
  };

  const addNewList = async (req: any) => {
    try {
      const res = await createList(req);
      dispatch({ type: "ADD_NEW_LIST", payload: res });
      return res;
    } catch (error) {
      return error;
    }
  };

  const deleteList = async (req: any) => {
    //console.log("this is request in deleteList: ", req);
    try {
      const res = await deleteExistingList(req);
      dispatch({ type: "DELETE_EXISTING_LIST", payload: req });
      return res;
    } catch (error) {
      return error;
    }
  };

  const editList = async (req: any) => {
    console.log("this is request in editList: ", req);
    try {
      const res = await editExistingList(req);
      const { myListId, Name, items } = res;
      const p = { myListId: myListId, name: Name, items: items };
      dispatch({ type: "EDIT_EXISTING_LIST", payload: p });
      return res;
    } catch (error) {
      return error;
    }
  };

  const findList = (req: any) => {
    //  console.log(state);

    const myList = state.Lists.find((list: any) => list.name === req);
    //   console.log(myList);

    return myList;
  };

  const getItemsList = (req: any) => {
    const l = req.payload;

    dispatch({ type: "" });
  };

  const addNewItem = async (req: any) => {
    // console.log("this is request: ", req);
    const res = await createItem(req);
    // console.log(res);

    dispatch({ type: "ADD_NEW_ITEM", payload: res });
    return res;
  };

  const editItem = async (req: any) => {
    //  console.log("this is request in editItem: ", req);
    try {
      const res = await editExistingItem(req);
      console.log(res);
      dispatch({ type: "EDIT_EXISTING_ITEM", payload: res });
    } catch (error) {}
  };

  const deleteItem = async (req: any) => {
    console.log("this is request in editItem: ", req);
    try {
      const res = await deleteExistingItem(req);
      dispatch({ type: "DELETE_EXISTING_ITEM", payload: res });
    } catch (error) {}
  };

  const userRegister = (req: any) => {
    // console.log(req);

    return registerUserService(req);
  };

  const userLogin = (req: any) => {
    return loginUserService(req);
  };

  const userLogout = () => {
    return logoutUserService();
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
        userLogout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
