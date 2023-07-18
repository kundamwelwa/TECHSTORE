import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Home from "./screens/Home.js";
import { NavigationContainer } from "@react-navigation/native";
import MyAds from "./screens/MyAds";
import Notifications from "./screens/Notifications.js";
import Profile from "./screens/Profile";
import UploadAd from "./screens/UploadAd";
import { PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <PaperProvider>
      <StatusBar barStyle="dark-content" />
      <Home />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {},
});
