import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Home from "./screens/Home.js";
import MyAds from "./screens/MyAds";
import Notifications from "./screens/Notifications.js";
import Profile from "./screens/Profile";
import UploadAd from "./screens/UploadAd";
import { PaperProvider } from "react-native-paper";
import Login from "./screens/Login.js";
import { createStackNavigator } from "@react-navigation/stack";
import { Signup } from "./screens/Signup";
import AppContainer from "./screens/AppContainer";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <AppContainer />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});
