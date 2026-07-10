import {createContext, useState} from "react";

export const CheckAuthContext = createContext<{
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});                 

export const CheckAuthProvider =({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
    return (
    <CheckAuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </CheckAuthContext.Provider>
  );
}

