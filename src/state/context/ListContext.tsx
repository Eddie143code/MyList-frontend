"use client";
import { useContext, createContext, useState, useReducer } from "react";
import { reducer } from "./reducer";

const initialState: any = {
  Lists: "YOOOO",
};

const AppContext = createContext(initialState);

export const AppProvider = ({ children }: any) => {
  const [state, dispatch]: any = useReducer(reducer, initialState);

  const changeData = (req: any) => {
    try {
      dispatch({ type: req.type, payload: req.payload });
    } catch (error) {
      error;
    }
  };
  return (
    <AppContext.Provider value={{ ...state, changeData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
