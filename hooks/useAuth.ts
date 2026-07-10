// check whether user is authenticated
import { useContext, useEffect } from "react";

import { CheckAuthContext } from "@/contexts/checkAuthContext";
import { getSession } from "@/services/auth";

export const useAuth = () => {
  const authContext = useContext(CheckAuthContext);

  useEffect(() => {
    const loadSession = async () => {
      const session = await getSession();
      authContext.setIsAuthenticated(Boolean(session));
    };

    void loadSession();
  }, [authContext]);

  return authContext;
};
