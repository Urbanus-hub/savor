import { CheckAuthContext } from "@/contexts/checkAuthContext";
import { getSession } from "@/services/auth";
import { Redirect } from "expo-router";
import { useContext, useEffect, useState } from "react";

export default function Index() {
  const { isAuthenticated, setIsAuthenticated } = useContext(CheckAuthContext);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      setIsAuthenticated(Boolean(session));
      setCheckingSession(false);
    };

    void checkSession();
  }, [setIsAuthenticated]);

  if (checkingSession) {
    return null;
  }

  return <Redirect href={isAuthenticated ? "/(dash)" : "/(auth)/login"} />;
}
