import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from "expo-status-bar";
import { useContext, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthFeedbackModal } from "@/components/AuthFeedbackModal";
import { UserContext } from "@/contexts/userContext";
import { getUserDetails, login } from "@/services/auth";
import { CheckAuthContext } from "@/contexts/checkAuthContext";

export default function Login() {
  const [showPassword, setShowPassword] = useState(true);
  const [isChecked, setChecked] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackTitle, setFeedbackTitle] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState<
    "success" | "error" | "info"
  >("info");
  const router = useRouter();
  const { setUser,setLoading:setUserLoading } = useContext(UserContext) || {};
  const {isAuthenticated,setIsAuthenticated} = useContext(CheckAuthContext) || {};

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

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      openFeedback(
        "Missing details",
        "Enter both your email and password.",
        "error",
      );
      return;
    }

    setLoading(true);
    const { error, data } = await login(email.trim(), password);
    console.log("Login response:", data, error);

    if (error) {
      setLoading(false);
      openFeedback("Login failed", error.message, "error");
      return;
    }

    const userDetails = await getUserDetails();
    console.log("User details:", userDetails);

    if (setUser && userDetails) {
      setUser(userDetails);
      const session = data?.session;
      if (session) {
        setIsAuthenticated(true);
        //store session in local storage
         await AsyncStorage.setItem('userSession', JSON.stringify(session));

      }
      setUserLoading(false);

    }

    setLoading(false);

    openFeedback("Welcome back", "You have signed in successfully.", "success");
    
  };

  return (
    <SafeAreaView style={styles.container}>
      <AuthFeedbackModal
        visible={feedbackVisible}
        title={feedbackTitle}
        message={feedbackMessage}
        type={feedbackType}
        buttonLabel={feedbackType === "success" ? "Continue" : "OK"}
        onClose={() => {
          setFeedbackVisible(false);
          if (feedbackType === "success") {
            router.replace("/(dash)");
          }
        }}
      />

      <View
        style={{
          marginTop: 10,
          width: "100%",
          height: 100,
          display: "flex",
          alignItems: "center",
        }}
      >
        <StatusBar style="light" />
        <Text style={styles.heading}>Welcome Back!</Text>
        <Text style={styles.text}>
          Log in to continue your culinary journey.
        </Text>
      </View>

      <View
        style={{
          width: "120%",
          height: 270,
          zIndex: -2,
          display: "flex",
          alignItems: "center",
          position: "absolute",
          backgroundColor: "red",
        }}
      >
        <Image
          source={require("../../assets/images/culinary.jpg")}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        />
        <View
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#411b1783",
          }}
        />
      </View>

      <View
        style={{
          marginTop: 120,
          display: "flex",
          gap: 15,
        }}
      >
        <TextInput
          style={[
            styles.inputField,
            focusedField === "email" && styles.inputFieldFocused,
          ]}
          placeholder="Email Address"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          onFocus={() => setFocusedField("email")}
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
            <AntDesign
              name={showPassword ? "eye" : "eye-invisible"}
              size={15}
              color="black"
            />
          </Pressable>
          <TextInput
            style={[
              styles.inputField,
              focusedField === "password" && styles.inputFieldFocused,
            ]}
            placeholder="Password"
            secureTextEntry={showPassword}
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
            onFocus={() => setFocusedField("password")}
            onBlur={() => setFocusedField(null)}
          />
        </View>

        <View
          style={{
            width: "100%",
            height: 50,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Switch value={isChecked} onValueChange={setChecked} />
            <Text>Remember me</Text>
          </View>
          <Link href="/forgot" style={{ color: "#FF6B35" }}>
            Forgot password?
          </Link>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.btn,
            pressed && styles.btnPressed,
            loading && styles.btnDisabled,
          ]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.btnText}>Sign In</Text>
          )}
        </Pressable>
      </View>

      <View
        style={{
          borderColor: "red",
          width: "100%",
        }}
      >
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
          <View
            style={{
              height: 1,
              backgroundColor: "#E1BFB5",
              width: "30%",
            }}
          />
          <Text>OR CONTINUE WITH</Text>
          <View
            style={{
              height: 1,
              backgroundColor: "#E1BFB5",
              width: "30%",
            }}
          />
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
          <Pressable
            style={({ pressed }) => [
              styles.authBtn,
              pressed && styles.authBtnPressed,
            ]}
          >
            <AntDesign name="google" size={24} color="#DB4437" />
            <Text>Google</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.authBtn,
              pressed && styles.authBtnPressed,
            ]}
          >
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
          <Text>Don&apos;t have an account?</Text>
          <Link
            href="/register"
            style={{
              color: "#FF6B35",
            }}
          >
            Sign up
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
