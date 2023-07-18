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
    </Stack.Navigator>
  );
};

export default Room;

const styles = StyleSheet.create({});
