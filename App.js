import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Home from "./screens/Home.js";
import { PaperProvider } from "react-native-paper";
import Login from "./screens/Login.js";
import { createStackNavigator } from "@react-navigation/stack";
import { Signup } from "./screens/Signup";
import AppContainer from "./screens/AppContainer";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <AppContainer />
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {},
});
