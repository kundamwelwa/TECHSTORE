import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  Image,
} from "react-native";
import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// external components
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Buy from "./Buy";
import Rent from "./Rent";
import Room from "./Room";
import Plots from "./Plots";
import { EvilIcons, Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import Advert from "../components/advert";
import Map from "./Map";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    componentHeight: this.height * 0.7,
    componentWidth: this.width * 0.7,
    SOS: "",
    BR: 0,
  };

  isTablet() {
    const { width, height } = Dimensions.get("window");
    const aspectRatio = height / width;
    // Adjust the threshold value as per your requirement
    return aspectRatio <= 1.6;
  }

  render() {
    return (
      <NavigationContainer style={styles.container}>
        <SafeAreaView
          style={{
            fontWeight: "bold",
            alignItems: "center",
            backgroundColor: "white",
            paddingTop: Platform.OS === "android" ? 35 : 0,
          }}
        >
          <View
            style={{
              width: Dimensions.get("window").width,
              justifyContent: "space-between",
              paddingHorizontal: 28,
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 10,
              marginBottom: 5,
              marginEnd: 25,
            }}
          >
            <Feather
              name="menu"
              size={this.isTablet() ? 50 : 30}
              color="#EE3855"
            />
            <Image
              style={{
                width: "50%",
                width: 90,
                height: 33,
                ...(this.isTablet() && {
                  width: 150,
                  height: 55,
                  padding: 20,
                  marginEnd: 10,
                }),
              }}
              source={require("../assets/images/logo.png")}
            />
          </View>

          <Advert />
        </SafeAreaView>

        <Tab.Navigator
          tabBarPosition="top"
          sceneContainerStyle={{
            backgroundColor: "#fff",
          }}
          screenOptions={{
            tabBarLabelStyle: {
              fontSize: 14,
              fontWeight: "600",
              textTransform: "capitalize",
              ...(this.isTablet() && {
                fontSize: 18,
              }),
            },
            tabBarItemStyle: { justifyContent: "space-between" },
            tabBarGap: 5,
            swipeEnabled: false,
            tabBarInactiveTintColor: "#818181",
            tabBarActiveTintColor: "#EE3855",
            tabBarIndicatorStyle: { backgroundColor: "#EE3855" },
          }}
        >
          <Tab.Screen name="Rent" component={Rent} />
          <Tab.Screen name="boarding houses" component={Room} />
          {/* <Tab.Screen name="Buy" component={Buy} /> */}
          {/* <Tab.Screen name="Plots" component={Plots} /> */}
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    paddingTop: 400,
  },
});
