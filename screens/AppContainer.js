import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import OTPScreen from "./OTPScreen";
import React, { useEffect } from "react";
import OnboardingScreen from "./OnboardingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();
const AppContainer = () => {
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);
  const [logged_in, setlogged_in] = React.useState(null);
  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value == null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
    AsyncStorage.getItem("logged_in").then((value) => {
      if (value == true) {
        setlogged_in(true);
      } else {
        setlogged_in(false);
      }
    });
  }, []);
  if (isFirstLaunch == null) {
    return null;
  } else if (isFirstLaunch == true) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false, // Hide the screen title for Screen1
          }}
          name="OnBoarding"
          component={OnboardingScreen}
        />
        <Stack.Screen
          name="Log in"
          component={Login}
          options={{
            headerShown: false, // Hide the screen title for Screen1
          }}
        />
        <Stack.Screen
          options={{
            headerShown: false, // Hide the screen title for Screen1
          }}
          name="Sign up"
          component={Signup}
        />
        <Stack.Screen
          options={{
            headerShown: false, // Hide the screen title for Screen1
          }}
          name="OTP"
          component={OTPScreen}
        />

        <Stack.Screen
          options={{
            headerShown: false, // Hide the screen title for Screen1
          }}
          name="Home"
          component={Home}
        />
      </Stack.Navigator>
    );
  } else if (isFirstLaunch == false) {
    if (logged_in == true) {
      console.log(logged_in);
      return (
        <Stack.Navigator>
          <Stack.Screen
            options={{
              headerShown: false, // Hide the screen title for Screen1
            }}
            name="Home"
            component={Home}
          />
        </Stack.Navigator>
      );
    } else {
      console.log(logged_in);
      return (
        <Stack.Navigator>
          <Stack.Screen
            name="Log in"
            component={Login}
            options={{
              headerShown: false, // Hide the screen title for Screen1
            }}
          />
          <Stack.Screen
            options={{
              headerShown: false, // Hide the screen title for Screen1
            }}
            name="Sign up"
            component={Signup}
          />
          <Stack.Screen
            options={{
              headerShown: false, // Hide the screen title for Screen1
            }}
            name="OTP"
            component={OTPScreen}
          />

          <Stack.Screen
            options={{
              headerShown: false, // Hide the screen title for Screen1
            }}
            name="Home"
            component={Home}
          />
        </Stack.Navigator>
      );
    }
  }
};

export default AppContainer;

const styles = StyleSheet.create({});
