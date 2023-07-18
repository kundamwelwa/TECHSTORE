import {
  Text,
  View,
  Modal,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import React, { Component } from "react";
import {
  Ionicons,
  Fontisto,
  AntDesign,
  MaterialCommunityIcons,
  EvilIcons,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";

export default class PropertyItem extends Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: "white",
          padding: 5,
          borderRadius: 5,
          elevation: 7,
          marginHorizontal: 10,
          marginVertical: 7,
          shadowColor: "#000",
          shadowOffset: {
            width: 1,
            height: 1,
          },
          shadowOpacity: 0.2,
          flexDirection:"row"
        }}
      >
        <Image
          style={{ width: "35%", height:90, marginEnd: 15 }}
          source={require("../assets/images/house2.png")}
        />
        <View style={{width: "100%" }}>
          <Text
            style={{
                width:"100%",
              fontSize: 15,
              fontWeight: "400",
              color: "#B8B8B8",
            }}
          >
            {"Ndola, Northrise Tanzania Rd"}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ marginVertical: 5 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "700",
                  color: "#EE3855",
                }}
              >
                {3} Bed room(s)
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "700",
                  color: "black",
                }}
              >
                ZMW {3500}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 5,
                paddingStart: 15,
                borderLeftWidth: 1,
                borderColor: "#EE3855",
                marginHorizontal: 10,
                width:"25%",
                justifyContent: "space-evenly",
              }}
            >
              <MaterialCommunityIcons
                name="map-marker-distance"
                size={20}
                color="black"
              />
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "bold",
                  color: "#000",
                  marginHorizontal: 10,
                }}
              >
                {45} Km from you
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
