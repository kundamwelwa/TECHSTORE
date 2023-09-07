import { StyleSheet, Text, Image, View } from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";

const OnboardingScreen = ({ navigation }) => {
  return (
    <Onboarding
      onDone={() => navigation.replace("Log in")}
      onSkip={() => navigation.replace("Log in")}
      pages={[
        {
          backgroundColor: "#EE3855",
          image: (
            <Image
              source={require("../assets/icons/rent.png")}
              style={styles.img}
            />
          ),
          title: "Welcome to pezabond",
          subtitle: "Your Journey to Finding a Home Away from Home Begins Here",
        },
        {
          backgroundColor: "#EE3855",
          image: (
            <Image
              source={require("../assets/icons/rent.png")}
              style={styles.img}
            />
          ),
          title: "Discover Your Ideal Boarding House",
          subtitle: "Browse, Filter, and Choose the Perfect Accommodation",
        },
        {
          backgroundColor: "#EE3855",
          image: (
            <Image
              source={require("../assets/icons/rent.png")}
              style={styles.img}
            />
          ),
          title: "Join the Pezabond Community",
          subtitle:
            "Connect with Housemates, Explore Your New Neighborhood, and Create Lifelong Bonds",
        },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  img: {
    width: 350,
    height: 350,
    resizeMode: "center",
  },
});
