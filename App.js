import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Home from "./screens/Home.js";
import { PaperProvider } from "react-native-paper";
import Login from "./screens/Login.js";
import { createStackNavigator } from "@react-navigation/stack";
import { Signup } from "./screens/Signup";
import AppContainer from "./screens/AppContainer";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./Redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <AppContainer />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {},
});
