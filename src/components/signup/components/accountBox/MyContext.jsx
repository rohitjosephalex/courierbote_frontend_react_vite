// MyContext.js
import React, { createContext, useState } from "react";

// Create a context with a default value
const MyContext = createContext();

// Create a provider component to wrap your components
const MyContextProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");

  return (
    <MyContext.Provider value={{ email, setEmail, password, setPassword, companyName, setCompanyName }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };
