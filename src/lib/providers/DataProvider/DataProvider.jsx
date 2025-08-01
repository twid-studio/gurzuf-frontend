"use client";

import React from "react";
import { DataContext } from "./context";


export const DataProvider = ({ children, data }) => {
  return (
    <DataContext.Provider value={{ data }}>
      {children}
    </DataContext.Provider>
  );
  // return data ? (
  //   <DataContext.Provider value={{ data }}>
  //     {children}
  //   </DataContext.Provider>
  // ) : null;
};
