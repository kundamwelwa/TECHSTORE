// OTPScreen.js
import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { View, StyleSheet, Text, Button, TouchableOpacity } from "react-native";
import OTPDigitInput from "../components/OTPDigitInput";
import { useNavigation, useRoute } from "@react-navigation/native";

const OTPScreen = ({ navigation }) => {
  const route = useRoute();
  const { phoneData } = route.params;
  const [otp, setOTP] = useState(["", "", "", ""]);
  const refs = useRef([...Array(4)].map(() => React.createRef()));
  const firstInputRef = useRef();
  const [prevs, setPrevs] = useState("");

  const focusNext = (index) => {
    if (index < 3) {
      refs.current[index + 1].current.focus();
    }
  };

  const focusPrev = (index) => {
    if (index > 0) {
      refs.current[index - 1].current.focus();
    }
  };

  const handleInputChange = (text, index) => {
    const newOTP = [...otp];
    newOTP[index] = text;
    setOTP(newOTP);
  };

  useLayoutEffect(() => {
    firstInputRef.current.focus(); // Focus on the first input when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once

  const compareOTP = (text) => {
    const enteredOTP = otp.join(""); // Convert the OTP array to a single string
    if (enteredOTP === text) {
      const prevScreen =
        navigation?.getState()?.routes?.[navigation.getState().index - 1]?.name;
      console.log("Previous Screen:", prevScreen);
      if (prevScreen == "Log in") {
        navigation.navigate("Home");
      } else if (prevScreen == "Sign up") {
        navigation.navigate("Log in");
      }
    } else {
      alert("Invalid OTP", "The entered OTP is incorrect. Please try again.");
      // Clear the OTP input after an incorrect comparison if desired
      setOTP(["", "", "", ""]);
      firstInputRef.current.focus();
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.title2}>
        We have sent a text message to{" "}
        <Text style={{ fontWeight: "bold" }}> +260 {phoneData}</Text>
      </Text>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <OTPDigitInput
            key={index}
            value={digit}
            focusNext={() => focusNext(index)}
            focusPrev={() => focusPrev(index)}
            onInputChange={(text) => handleInputChange(text, index)}
            ref={index === 0 ? firstInputRef : refs.current[index]} // Set ref for the first input
          />
        ))}
      </View>

      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: "#fff",
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 60,
          borderRadius: 10,
          paddingHorizontal: 60,
          borderColor: "#EE3855",
          borderWidth: 0.3,
          elevation: 5,
          shadowColor: "#000",
          shadowOpacity: 0.5,
          shadowOffset: {
            height: 3,
            width: 3,
          },
        }}
        onPress={() => compareOTP("1234")}
      >
        <Text style={{ color: "#EE3855", fontSize: 16, fontWeight: "500" }}>
          Verify
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
    color: "#EE3855",
  },
  title2: {
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 30,
    color: "#000",
  },
  otpContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default OTPScreen;
