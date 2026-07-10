import { CheckAuthContext } from "@/contexts/checkAuthContext";
import { Redirect } from "expo-router";
import { useContext } from "react";


export default function Index() {

  const {
    isAuthenticated,
    loading
  } = useContext(CheckAuthContext);


  if (loading) {
    return null;
  }


  return (
    <Redirect
      href={
        isAuthenticated
          ? "/(dash)"
          : "/(auth)/login"
      }
    />
  );
}