"use client";

import dynamic from "next/dynamic";
import React, { createContext, useContext, useEffect, useState } from "react";

// Define the context shape
interface CollapseContextProps {
  isCollapsed: boolean;
  toggleCollapse: () => void;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
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
  // Get the default collapse state from local storage
  const defaultCollapse =
    typeof window !== "undefined"
      ? localStorage.getItem("hirer:collapsed") === "true"
      : false;

  const [isCollapsed, setIsCollapsed] = useState<boolean>(defaultCollapse);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("hirer:collapsed", String(newState));
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // md breakpoint in Tailwind CSS
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <CollapseContext.Provider
      value={{
        isCollapsed,
        toggleCollapse,
        isMobileMenuOpen,
        toggleMobileMenu,
      }}
    >
      {children}
    </CollapseContext.Provider>
  );
};

export default dynamic(() => Promise.resolve(CollapseProvider), { ssr: false });
