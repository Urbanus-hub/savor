import { UserContext } from "@/contexts/userContext";
import { getSession } from "@/services/auth";
import { Feather } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [isChecked, setChecked] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { user, loading } = useContext(UserContext);
  const [dayPart,setDayPart]=useState("Morning");
  console.log("user", user);
  
 
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
    setDayPart("Morning")
      
    } else if (currentHour >= 12 && currentHour < 17) {
      
      setDayPart("Afternoon")
    } else if (currentHour >= 17 && currentHour < 21) {
      setDayPart("Evening")
      
    } else {
     setDayPart("Night")
    }
  
  useEffect(() => {
    const loadSession = async () => {
      const session = await getSession();
      console.log("session", session);
    };

    void loadSession();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {/* profile and location */}
      <View
        style={{
          
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 5,
         
        }}
      >
        {/* location */}
        <View
        style={
          {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }
        }
        >
          <Feather name="map-pin" size={18} color="#FF6B35" />
          <View style={
            {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }
          }>

     <Text>Deliver to</Text>
     <View style={
        {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
        }
     }>
       <Text style={{
        fontWeight:"700",
        fontSize: 14,
       }}>Home</Text>
     <Feather name="chevron-down" size={17} color="black" />
     </View>
          </View>
        </View>
        {/* profile icon */}
        <View>
          <Image
            source={require("../../assets/images/culinary.jpg")}
            style={{ width: 40, height: 40, borderRadius: 40 ,
              borderWidth:1,
              borderColor:"#FF6B35"
            }}
          />
        </View>
      </View>
      {/* welcome */}
      <View style={{ marginTop: 20,
      borderWidth:1,
        
       }}>
        <Text style={styles.heading}> Good {dayPart}, {user?.full_name.split(' ')[0]}!</Text>
        <Text style={styles.text}>What are you craving today?</Text>
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
    color: "black",
    fontSize: 16,
    fontWeight: "100",
  },
  heading: {
    color: "Black",
    fontSize: 22,
    fontWeight: "600",
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
