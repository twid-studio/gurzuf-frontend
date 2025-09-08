"use client";
import { usePathname } from 'next/navigation';
import React, { createContext, useEffect, useState } from 'react'

export const LocaleContext = createContext();

export const LocaleProvider = ({ children }) => {
    const path = usePathname();
    const [lang, setLang] = useState("ua");

    useEffect(() => {
      const isEnPath = path.startsWith("/en");
      setLang((isEnPath && "en") || "ua");
    }, [path]);

    return (
      <LocaleContext.Provider value={{ lang }}>
        {children}
      </LocaleContext.Provider>
    );
}