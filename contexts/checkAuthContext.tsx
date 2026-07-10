import { createContext, useEffect, useState } from "react";
import { supabase } from "@/utils/supabase"; // adjust path

type AuthContextType = {
  isAuthenticated: boolean;
  loading: boolean;
  setIsAuthenticated: (value: boolean) => void;
};

export const CheckAuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  loading: true,
  setIsAuthenticated: () => {},
});


export const CheckAuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    async function checkSession() {

      const { data } = await supabase.auth.getSession();
      console.log("Session data:", data.session);   

      setIsAuthenticated(Boolean(data.session));
      setLoading(false);

    }


    checkSession();


    // Listen for login/logout changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsAuthenticated(Boolean(session));
      }
    );


    return () => {
      subscription.unsubscribe();
    };

  }, []);


  return (
    <CheckAuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        setIsAuthenticated,
      }}
    >
      {children}
    </CheckAuthContext.Provider>
  );
};