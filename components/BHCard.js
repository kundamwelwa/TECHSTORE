import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
  EvilIcons,
  Entypo,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const BHCard = (props) => {
  const { price, address, distance, rating } = props;

  // const [isBooked, setIsBooked] = React.useState(false);
  const isBooked = props.booked === "1" ? true : false;
  const isTablet = () => {
    const { width, height } = Dimensions.get("window");
    const aspectRatio = height / width;
    // Adjust the threshold value as per your requirement
    return aspectRatio <= 1.6;
  };
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      disabled={isBooked}
      onPress={() => navigation.navigate("Details")}
      style={{
        height: 250,
        width: 180,
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
        shadowOpacity: 0.3,
        shadowRadius: 4,
        marginEnd: 10,
        margin: 5,
        padding: 3,
        ...(isTablet() && {
          width: 250,
          height: 350,
          marginEnd: 15,
          margin: 10,
          padding: 5,
        }),
      }}
    >
      <ImageBackground
        source={require("../assets/images/bh3.png")}
        resizeMethod="resize"
        imageStyle={{ borderRadius: 10 }}
        style={{
          height: 120,
          borderRadius: 10,
          margin: 2,
          ...(isTablet() && {
            height: 180,
          }),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            padding: 3,
            alignItems: "center",
            marginStart: 3,
          }}
        >
          <MaterialCommunityIcons
            name="moon-full"
            size={8}
            color={isBooked ? "red" : "green"}
          />
          <Text
            style={{
              color: "#fff",
              fontWeight: "500",
              ...(isTablet() && {
                fontSize: 18,
              }),
            }}
          >
            {" "}
            {isBooked ? "Booked" : "Available"}
          </Text>
        </View>
      </ImageBackground>
      <View
        style={{
          flexDirection: "row",
          marginTop: 5,
          alignItems: "center",
          justifyContent: "space-between",
          marginEnd: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            padding: 3,
            marginVertical: 5,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#EE3855",
              ...(isTablet() && {
                fontSize: 22,
              }),
            }}
          >
            K {props.amount_per_month}
          </Text>
          <Text
            style={{
              color: "#EE3855",
              ...(isTablet() && {
                fontSize: 16,
              }),
            }}
          >
            /month
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginVertical: 5,
            alignItems: "center",
          }}
        >
          <FontAwesome name="star" size={isTablet() ? 22 : 16} color="gold" />
          <Text
            style={{
              fontSize: 14,
              fontWeight: "400",
              color: "black",
              marginStart: 4,
              ...(isTablet() && {
                fontSize: 20,
              }),
            }}
          >
            {props.rating}{" "}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", padding: 3, alignItems: "center" }}>
        <MaterialCommunityIcons name="shower" size={18} color="#000" />
        {props.self_contained == 1 ? (
          <Text
            style={{
              color: "#000",
              textDecorationLine: "none",
              ...(isTablet() && {
                fontSize: 14,
              }),
            }}
          >
            {"  "}
            Self Contained
          </Text>
        ) : (
          <Text
            style={{
              color: "#000",
              textDecorationLine: "line-through",
              ...(isTablet() && {
                fontSize: 14,
              }),
            }}
          >
            {"  "}
            Self Contained
          </Text>
        )}
      </View>
      <View style={{ flexDirection: "row", padding: 3, alignItems: "center" }}>
        <Entypo name="address" size={18} color="black" />
        <Text
          style={{
            color: "#000",
            ...(isTablet() && {
              fontSize: 18,
            }),
          }}
        >
          {"  "}
          {props.address}
        </Text>
      </View>
      <View style={{ flexDirection: "row", padding: 3, alignItems: "center" }}>
        <FontAwesome name="bed" size={18} color="black" />
        <Text
          style={{
            color: "#000",
            fontWeight: "400",
            ...(isTablet() && {
              fontSize: 18,
            }),
          }}
        >
          {"  "}
          {props.bed_spaces}
        </Text>
      </View>

      <Ionicons
        name="eye"
        size={22}
        color="#9e9e9e"
        style={{
          position: "absolute",
          bottom: 10,
          right: 10,
          ...(isTablet() && {
            right: 15,
          }),
        }}
      />
    </TouchableOpacity>
  );
};

export default BHCard;

const styles = StyleSheet.create({});
