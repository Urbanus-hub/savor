import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthFeedbackModal } from "@/components/AuthFeedbackModal";
import { signup } from "@/services/auth";

export default function Register() {
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackTitle, setFeedbackTitle] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState<"success" | "error" | "info">("info");
  const router = useRouter();

  const openFeedback = (
    title: string,
    message: string,
    type: "success" | "error" | "info" = "info",
  ) => {
    setFeedbackTitle(title);
    setFeedbackMessage(message);
    setFeedbackType(type);
    setFeedbackVisible(true);
  };

  const isValidData = () => {
    if (!name.trim() || !email.trim() || !phone.trim() || !password.trim() || !confirmPassword.trim()) {
      openFeedback("Missing details", "Please fill in all the fields.", "error");
      return false;
    }

    if (password !== confirmPassword) {
      openFeedback("Password mismatch", "Password and confirm password must match.", "error");
      return false;
    }

    return true;
  };

  const signUpUser = async () => {
    if (!isValidData()) {
      return;
    }

    setLoading(true);
    const { error } = await signup(email.trim(), password);
    setLoading(false);

    if (error) {
      openFeedback("Sign up failed", error.message, "error");
      return;
    }

    openFeedback("Account created", "Your account was created successfully.", "success");
  };

  return (
    <SafeAreaView style={styles.container}>
      <AuthFeedbackModal
        visible={feedbackVisible}
        title={feedbackTitle}
        message={feedbackMessage}
        type={feedbackType}
        buttonLabel={feedbackType === "success" ? "Go to login" : "OK"}
        onClose={() => {
          setFeedbackVisible(false);
          if (feedbackType === "success") {
            router.replace("/login");
          }
        }}
      />

      <StatusBar style="dark" />

      <View style={{ marginTop: 35 }}>
        <Text style={styles.heading}>Create Account</Text>
        <Text style={styles.text}>Join GourmetGo to experience premium culinary delights.</Text>
      </View>

      <View style={{ marginTop: 15, display: "flex", gap: 15 }}>
        <TextInput
          style={[styles.inputField, focusedField === "name" && styles.inputFieldFocused]}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          onFocus={() => setFocusedField("name")}
          onBlur={() => setFocusedField(null)}
        />

        <TextInput
          style={[styles.inputField, focusedField === "email" && styles.inputFieldFocused]}
          placeholder="Email Address"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          onFocus={() => setFocusedField("email")}
          onBlur={() => setFocusedField(null)}
        />

        <TextInput
          style={[styles.inputField, focusedField === "phone" && styles.inputFieldFocused]}
          placeholder="Phone Number"
          keyboardType="number-pad"
          value={phone}
          onChangeText={setPhone}
          onFocus={() => setFocusedField("phone")}
          onBlur={() => setFocusedField(null)}
        />

        <View style={{ position: "relative" }}>
          <Pressable
            style={{
              position: "absolute",
              right: 15,
              top: 6,
              zIndex: 2,
              padding: 10,
              borderRadius: 999,
            }}
            onPress={() => setShowPassword((current) => !current)}
          >
            <AntDesign name={showPassword ? "eye" : "eye-invisible"} size={15} color="black" />
          </Pressable>
          <TextInput
            style={[styles.inputField, focusedField === "password" && styles.inputFieldFocused]}
            placeholder="Password"
            secureTextEntry={showPassword}
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
            onFocus={() => setFocusedField("password")}
            onBlur={() => setFocusedField(null)}
          />
        </View>

        <View style={{ position: "relative" }}>
          <Pressable
            style={{
              position: "absolute",
              right: 15,
              top: 6,
              zIndex: 2,
              padding: 10,
              borderRadius: 999,
            }}
            onPress={() => setShowConfirmPassword((current) => !current)}
          >
            <AntDesign name={showConfirmPassword ? "eye" : "eye-invisible"} size={15} color="black" />
          </Pressable>
          <TextInput
            style={[
              styles.inputField,
              focusedField === "confirmPassword" && styles.inputFieldFocused,
            ]}
            placeholder="Confirm Password"
            secureTextEntry={showConfirmPassword}
            autoCapitalize="none"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            onFocus={() => setFocusedField("confirmPassword")}
            onBlur={() => setFocusedField(null)}
          />
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.btn,
            pressed && styles.btnPressed,
            loading && styles.btnDisabled,
          ]}
          onPress={signUpUser}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="white" /> : <Text style={styles.btnText}>Create Account</Text>}
        </Pressable>
      </View>

      <View style={{ borderColor: "red", width: "100%" }}>
        <View
          style={{
            width: "100%",
            height: 80,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ height: 1, backgroundColor: "#E1BFB5", width: "30%" }} />
          <Text>OR CONTINUE WITH</Text>
          <View style={{ height: 1, backgroundColor: "#E1BFB5", width: "30%" }} />
        </View>

        <View
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 25,
          }}
        >
          <Pressable style={({ pressed }) => [styles.authBtn, pressed && styles.authBtnPressed]}>
            <AntDesign name="google" size={24} color="#DB4437" />
            <Text>Google</Text>
          </Pressable>

          <Pressable style={({ pressed }) => [styles.authBtn, pressed && styles.authBtnPressed]}>
            <FontAwesome name="apple" size={24} color="black" />
            <Text>Apple</Text>
          </Pressable>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
          }}
        >
          <Text>Already have an account?</Text>
          <Link
            href="/login"
            style={{
              color: "#FF6B35",
            }}
          >
            Sign in
          </Link>
        </View>
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
    color: "#594139",
    fontSize: 16,
  },
  heading: {
    color: "#AB3500",
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
  btnDisabled: {
    opacity: 0.75,
  },
  btnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
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
