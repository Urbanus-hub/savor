import { CheckAuthProvider } from "@/contexts/checkAuthContext";
import { UserProvider } from "@/contexts/userContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <CheckAuthProvider>
<UserProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </UserProvider>
  
    </CheckAuthProvider>
    );
}
