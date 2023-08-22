import React from "react";
import { View, Text } from "react-native";
import * as Animatable from "react-native-animatable";

const PaymentSuccessAnimation = () => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 30,
      }}
    >
      <Animatable.Text
        animation="bounceIn"
        duration={3000}
        iterationCount={1}
        style={{
          fontSize: 25,
          color: "green",
          fontWeight: "bold",
        }}
      >
        Payment Successful
      </Animatable.Text>
    </View>
  );
};

export default PaymentSuccessAnimation;
