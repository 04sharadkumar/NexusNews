// src/context/SidebarContext.js
import { createContext, useContext, useState } from "react";

// Create context
const SidebarContext = createContext();

// Provider component
export const SidebarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Custom hook to use SidebarContext
export const useSidebar = () => {
  return useContext(SidebarContext);
};
