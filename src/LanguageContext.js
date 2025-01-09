import React, { createContext, useState } from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currLanguage, setLanguage] = useState("English");

  return (
    <LanguageContext.Provider value={{ currLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};