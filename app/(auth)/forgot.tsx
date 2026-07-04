import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Forgot() {
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [isChecked, setChecked] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

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
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FFE9E3",
          }}
        >
          <MaterialCommunityIcons name="lock-reset" size={35} color="#AB3500" />
        </View>
        <Text
          style={{
            width: "75%",
            textAlign: "center",
            fontSize: 16,
            lineHeight: 24,
            letterSpacing: 0.19,
          }}
        >
          Enter your email address and we&apos;ll send you a link to reset your
          password.
        </Text>
        <TextInput
          style={[
            styles.inputField,
            focusedField === "phone" && styles.inputFieldFocused,
          ]}
          placeholder="Email Address"
          keyboardType="email-address"
          onFocus={() => setFocusedField("phone")}
          onBlur={() => setFocusedField(null)}
          autoCapitalize="none"
        />
        <Pressable
          style={({ pressed }) => [
            styles.btn,
            pressed && styles.btnPressed,
            { display: "flex", flexDirection: "row", gap: 10 },
          ]}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              color: "white",
            }}
          >
            Send Reset Link
          </Text>
          <Feather name="arrow-right" color="white" size={24} />
        </Pressable>

        <Link
          href="/(auth)/login"
          style={{
            marginTop: 16,
            color: "#FF6B35",
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          Back to sign in
        </Link>
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
