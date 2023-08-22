import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import * as Animatable from "react-native-animatable";
const Advert = () => {
  const textArray = ["house", "boarding house", "shop", "warehouse"];
  const [currentText, setCurrentText] = useState(textArray[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % textArray.length;
      setCurrentIndex(nextIndex);
      setCurrentText(textArray[nextIndex]);
    }, 3000); // change the interval to control how often the text changes

    return () => clearInterval(interval);
  }, [currentIndex]);

  const isTablet = () => {
    const { width, height } = Dimensions.get("window");
    const aspectRatio = height / width;
    // Adjust the threshold value as per your requirement
    return aspectRatio <= 1.6;
  };
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        paddingTop: 20,
        width: "100%",
        borderBottomColor: "gray",
        borderBottomWidth: 0.2,
        paddingVertical: 20,
        backgroundColor: "#fff",
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 18,
          ...(isTablet() && {
            fontSize: 24,
          }),
        }}
      >
        Find a
      </Text>
      <Animatable.Text
        animation="fadeIn"
        duration={700}
        style={{
          fontWeight: "bold",
          fontSize: 18,
          color: "#EE3855",
          ...(isTablet() && {
            fontSize: 24,
          }),
        }}
        key={currentIndex}
      >
        {" "}
        {currentText}{" "}
      </Animatable.Text>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 18,
          ...(isTablet() && {
            fontSize: 24,
          }),
        }}
      >
        with ease
      </Text>
    </View>
  );
};

export default Advert;

const styles = StyleSheet.create({});
