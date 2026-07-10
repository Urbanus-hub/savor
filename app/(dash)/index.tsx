import { UserContext } from "@/contexts/userContext";
import { getSession } from "@/services/auth";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [isChecked, setChecked] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { user, loading } = useContext(UserContext);
  console.log("user", user);
  useEffect(() => {
    const loadSession = async () => {
      const session = await getSession();
      console.log("session", session);
    };

    void loadSession();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {/* welcome text */}
      <View
        style={{
          marginTop: 10,
          width: "100%",
          height: "50%",

          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Text>Hello there</Text>
        <Text>{loading}</Text>
        <Text>
          {loading
            ? "Loading..."
            : user
              ? `Welcome, ${user.full_name}`
              : "Not logged in"}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff8f6",
    padding: 20,
  },
  text: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "100",
  },
  heading: {
    color: "white",
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 8,
  },
  btn: {
    backgroundColor: "#FF6B35",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 15,
    height: 50,
    borderRadius: 20,
  },

  btnPressed: {
    backgroundColor: "#E65A2B",
  },
  inputField: {
    width: "100%",
    paddingHorizontal: 15,
    height: 50,
    borderRadius: 20,
    borderColor: "#E1BFB5",
    borderWidth: 1,
    backgroundColor: "white",
    fontSize: 15,
  },
  inputFieldFocused: {
    borderColor: "#FF6B35",
  },
  authBtn: {
    height: 50,
    borderRadius: 20,
    width: "45%",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#E1BFB5",
    borderWidth: 1,
    gap: 7,
  },

  authBtnPressed: {
    backgroundColor: "#F2ECEB",
  },
});
