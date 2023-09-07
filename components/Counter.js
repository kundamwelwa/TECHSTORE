// Counter.js
import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const Counter = () => {
  const navigation = useNavigation();
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Set up an interval to increment the counter every second
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const decrementCounter = () => {
    setCount(count - 1);
  };

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
      }}
    >
      {count > 8 && (
        <>
          <Text style={{ color: "#454545", fontSize: 14, fontWeight: "400" }}>
            This is taking longer than expected
          </Text>

          <TouchableOpacity
            style={styles.button1}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={22} color="#fff" />
            <Text style={styles.textInside}>Try again</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default Counter;
const styles = StyleSheet.create({
  button1: {
    backgroundColor: "#454545",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    width: 150,
    marginVertical: 15,
    justifyContent: "center",
  },
  textInside: {
    color: "#fff",
    fontWeight: "300",
  },
});
