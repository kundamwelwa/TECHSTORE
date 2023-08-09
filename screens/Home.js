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

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.bottomSheetRef = React.createRef();
  }

  state = {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    componentHeight: this.height * 0.7,
    componentWidth: this.width * 0.7,
    SOS: "",
    BR: 0,
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
            <TouchableOpacity onPress={this.openBottomSheet}>
              <Feather
                name="menu"
                size={this.isTablet() ? 50 : 30}
                color="#EE3855"
              />
            </TouchableOpacity>
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

          <RBSheet
            ref={this.bottomSheetRef}
            height={Dimensions.get("window").height * 0.7}
            duration={300}
            closeOnDragDown={false}
            closeOnPressMask={true}
            customStyles={{
              container: {
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                borderTopColor: "#EE3855",
                borderTopWidth: 4,
                paddingHorizontal: 20,
                paddingVertical: 20,
              },
            }}
          >
            <View>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  marginVertical: 20,
                  alignItems: "center",
                  borderBottomWidth: 0.2,
                  borderBottomColor: "#666666",
                  paddingBottom: 10,
                }}
                onPress={() =>
                  this.props.navigation.navigate("Profile")
                }
              >
                <Ionicons name="person" size={20} color="#666666" />
                <Text
                  style={{ fontSize: 14, color: "#666666", marginStart: 10 }}
                >
                  Profile
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  marginVertical: 20,
                  alignItems: "center",
                  borderBottomWidth: 0.2,
                  borderBottomColor: "#666666",
                  paddingBottom: 10,
                }}
              >
                <Entypo name="bell" size={20} color="#666666" />
                <Text
                  style={{ fontSize: 14, color: "#666666", marginStart: 10 }}
                >
                  Notifications
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  marginVertical: 20,
                  alignItems: "center",
                  borderBottomWidth: 0.2,
                  borderBottomColor: "#666666",
                  paddingBottom: 10,
                }}
              >
                <MaterialCommunityIcons name="bed" size={20} color="#666666" />
                <Text
                  style={{ fontSize: 14, color: "#666666", marginStart: 10 }}
                >
                  My Boarding house
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  marginVertical: 20,
                  alignItems: "center",
                  borderBottomWidth: 0.2,
                  borderBottomColor: "#666666",
                  paddingBottom: 10,
                }}
              >
                <FontAwesome5 name="house-user" size={20} color="#666666" />
                <Text
                  style={{ fontSize: 14, color: "#666666", marginStart: 10 }}
                >
                  List a Boarding House
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  marginVertical: 20,
                  alignItems: "center",
                  borderBottomWidth: 0.2,
                  borderBottomColor: "#666666",
                  paddingBottom: 10,
                }}
              >
                <Entypo name="share" size={20} color="#666666" />
                <Text
                  style={{ fontSize: 14, color: "#666666", marginStart: 10 }}
                >
                  Share App
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  marginVertical: 20,
                  alignItems: "center",
                  borderBottomWidth: 0.2,
                  borderBottomColor: "#666666",
                  paddingBottom: 10,
                }}
              >
                <Entypo name="log-out" size={20} color="#666666" />
                <Text
                  style={{ fontSize: 14, color: "#666666", marginStart: 10 }}
                >
                  Log Out
                </Text>
              </TouchableOpacity>
            </View>
          </RBSheet>
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
          <Tab.Screen name="boarding houses" component={Room} />
          {/* <Tab.Screen name="Rent" component={Rent} />
          <Tab.Screen name="Buy" component={Buy} /> */}
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
