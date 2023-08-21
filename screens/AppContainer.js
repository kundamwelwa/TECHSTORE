import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import OTPScreen from "./OTPScreen";

const Stack = createStackNavigator();
const AppContainer = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
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
      /> */}

      <Stack.Screen
        options={{
          headerShown: false, // Hide the screen title for Screen1
        }}
        name="Home"
        component={Home}
      />
    </Stack.Navigator>
  );
};

export default AppContainer;

const styles = StyleSheet.create({});
