import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  Image,
  Touchable,
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
import {
  EvilIcons,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
  FontAwesome5,
} from "@expo/vector-icons";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import Advert from "../components/advert";
import Map from "./Map";
import RBSheet from "react-native-raw-bottom-sheet";
import { TouchableOpacity } from "react-native-gesture-handler";
import Profile from "./Profile";
import ListBH from "./ListBH";
import Notifications from "./Notifications";
import MyBH from "./MyBH";
import { color } from "react-native-reanimated";
import DrawerContent from "../components/DrawerContent";
import Boardinghouses from "./Boardinghouses";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.bottomSheetRef = React.createRef();
    this.state = {
      visible: false,
    };
  }

  openDrawer = () => {
    this.props.navigation.openDrawer(); // Open the drawer when the icon is clicked
  };

  state = {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    componentHeight: this.height * 0.7,
    componentWidth: this.width * 0.7,
    SOS: "",
    BR: 0,
  };

  openMenu = () => {
    this.setState({ visible: true });
  };

  closeMenu = () => {
    this.setState({ visible: false });
  };

  openBottomSheet = () => {
    this.bottomSheetRef.current.open();
  };

  isTablet() {
    const { width, height } = Dimensions.get("window");
    const aspectRatio = height / width;
    // Adjust the threshold value as per your requirement
    return aspectRatio <= 1.6;
  }

  render() {
    return (
      <NavigationContainer independent={true} style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {...props} />}
          screenOptions={{
            activeTintColor: "red",
            headerTransparent: false,
            headerTitleStyle: {
              color: "rgba(255,255,255,0.0)",
            },
            drawerItemStyle: {
              borderEndColor: "red",
            },
            drawerActiveTintColor: "#EE3855",
            drawerActiveBackgroundColor: "#fff",
            headerRight: () => (
              <Image
                style={{
                  width: "50%",
                  width: 90,
                  marginEnd: 25,
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
            ),
          }}
        >
          <Drawer.Screen
            name="boarding houses"
            component={Room}
            options={{
              title: "Home",
              drawerIcon: ({ color, size }) => (
                <Entypo name="home" color={color} size={20} />
              ),
            }}
          />
          <Drawer.Screen
            name="Profile"
            component={Profile}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name="person" color={color} size={20} />
              ),
            }}
          />
          <Drawer.Screen
            name="Boardinghouses"
            component={Boardinghouses}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name="person" color={color} size={20} />
              ),
            }}
          />
          <Drawer.Screen
            name="List boarding house"
            component={ListBH}
            options={{
              drawerIcon: ({ color, size }) => (
                <FontAwesome5 name="laptop-house" size={20} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Notification"
            component={Notifications}
            options={{
              drawerIcon: ({ color, size }) => (
                <Entypo name="bell" color={color} size={20} />
              ),
            }}
          />

          <Drawer.Screen
            name="My boarding house"
            component={MyBH}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name="bed" color={color} size={20} />
              ),
            }}
          />
        </Drawer.Navigator>
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
