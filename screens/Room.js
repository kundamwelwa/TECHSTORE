import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import Lottie from "lottie-react-native";

import { SelectList } from "react-native-dropdown-select-list";
import NumericInput from "react-native-numeric-input";
import BHhoom from "./BHhome";
import BHResults from "./BHResults";

// navigation imports
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Details from "./Details";
import Map from "./Map";
import LiveMap from "./LiveMap";
import Profile from "./Profile";
import Notifications from "./Notifications";
import MyBH from "./MyBH";
import ListBH from './ListBH';
import PaymentScreen from "./PaymentScreen";

// Create a stack navigator
const Stack = createStackNavigator();

const Room = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={BHhoom}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Results"
        component={BHResults}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Map"
        component={Map}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LiveMap"
        component={LiveMap}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyBH"
        component={MyBH}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="ListBH"
        component={ListBH}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Room;

const styles = StyleSheet.create({});
