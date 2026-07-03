import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  

  const [focusedField, setFocusedField] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      {/* heading and welcome text */}
      <View
        style={{
          marginTop: 40,
        }}
      >
        <Text style={styles.heading}>Create Account</Text>
        <Text style={styles.text}>
          Join GourmetGo to experience premium culinary delights.
        </Text>
      </View>
      {/* input */}
      <View
        style={{
          marginTop: 15,
          display: "flex",
          gap: 15,
        }}
      >
        <TextInput  
          style={[
            styles.inputField, 
            focusedField === "name" && styles.inputFieldFocused
          ]}
          placeholder="Full Name" 
          onFocus={() => setFocusedField("name")}
          onBlur={() => setFocusedField(null)}
        />
        <TextInput
          style={[
            styles.inputField, 
            focusedField === "email" && styles.inputFieldFocused
          ]}
          placeholder="Email Address"
          keyboardType="email-address"
          autoCapitalize="none"
          onFocus={() => setFocusedField("email")}
          onBlur={() => setFocusedField(null)}
        />
        <TextInput
          style={[
            styles.inputField, 
            focusedField === "phone" && styles.inputFieldFocused
          ]}
          placeholder="Phone Number"
          keyboardType="number-pad"
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
              padding:10,
              borderRadius:"100%"
            }}
            onPress={() => setShowPassword(!showPassword)}
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
              focusedField === "password" && styles.inputFieldFocused
            ]}
            placeholder="Password"
            secureTextEntry={showPassword}
            autoCapitalize="none"
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
              padding:10,
              borderRadius:"100%"
            }}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <AntDesign
              name={showConfirmPassword ? "eye" : "eye-invisible"}
              size={15}
              color="black"
            />
          </Pressable>
          <TextInput
            style={[
              styles.inputField, 
              focusedField === "confirmPassword" && styles.inputFieldFocused
            ]}
            placeholder="Confirm Password"
            secureTextEntry={showConfirmPassword}
            autoCapitalize="none"
            onFocus={() => setFocusedField("confirmPassword")}
            onBlur={() => setFocusedField(null)}
          />
        </View>
      
        <Pressable 
          style={({ pressed }) => [
            styles.btn,
            pressed && styles.btnPressed
          ]}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "white",
            }}
          >
            Create Account
          </Text>
        </Pressable>
      </View>
      {/* Alternatives */}
      <View
        style={{
          borderColor: "red",
          width: "100%",
        }}
      >
        {/* or */}
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
          ></View>
          <Text>OR CONTINUE WITH</Text>
          <View
            style={{
              height: 1,
              backgroundColor: "#E1BFB5",
              width: "30%",
            }}
          ></View>
        </View>
        {/* auth buttons */}
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
          {/* google */}
        
          <Pressable 
            style={({ pressed }) => [
              styles.authBtn,
              pressed && styles.authBtnPressed
            ]}
          >
            <AntDesign name="google" size={24} color="#DB4437" />
            <Text>Google</Text>
          </Pressable>
          {/* apple */}
         
          <Pressable 
            style={({ pressed }) => [
              styles.authBtn,
              pressed && styles.authBtnPressed
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
          <Text>ALready have an acount?</Text>
          <Link
            href="/(auth)/login"
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
  inputField: {
    width: "100%",
    paddingHorizontal: 15,
    height: 50,
    borderRadius: 20,
    borderColor: "#E1BFB5",
    borderWidth: 1,
    backgroundColor: "white",
    fontSize:15,
  },
  inputFieldFocused:{
    borderColor: "#FF6B35"
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
