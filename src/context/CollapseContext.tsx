import React, { createContext, useContext, useState } from "react";

// Define the context shape
interface CollapseContextProps {
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

// Create the context
const CollapseContext = createContext<CollapseContextProps | undefined>(
  undefined
);

// Create a custom hook to use the context
export const useCollapse = () => {
  const context = useContext(CollapseContext);
  if (!context) {
    throw new Error("useCollapse must be used within a CollapseProvider");
  }
  return context;
};

// Create the provider component
export const CollapseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <CollapseContext.Provider value={{ isCollapsed, toggleCollapse }}>
      {children}
    </CollapseContext.Provider>
  );
};
