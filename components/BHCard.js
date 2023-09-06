import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
  EvilIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const BHCard = (props) => {
  const { price, address, distance, rating } = props;
  const isTablet = () => {
    const { width, height } = Dimensions.get("window");
    const aspectRatio = height / width;
    // Adjust the threshold value as per your requirement
    return aspectRatio <= 1.6;
  };
  const navigation = useNavigation();
  return (
    <TouchableOpacity
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
      />
      <View
        style={{
          flexDirection: "row",
          marginVertical: 5,
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
            K {price}
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
            {rating}{" "}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", padding: 3, alignItems: "center" }}>
        <MaterialCommunityIcons name="shower" size={18} color="#000" />
        <Text
          style={{
            color: "#000",
            textDecorationLine: "line-through",
            ...(isTablet() && {
              fontSize: 18,
            }),
          }}
        >
          {" "}
          Self Contained
        </Text>
      </View>
      <View style={{ flexDirection: "row", padding: 3, alignItems: "center" }}>
        <MaterialIcons name="house" size={18} color="#000" />
        <Text
          style={{
            color: "#000",
            ...(isTablet() && {
              fontSize: 18,
            }),
          }}
        >
          {" "}
          {address}
        </Text>
      </View>
      <View style={{ flexDirection: "row", padding: 3, alignItems: "center" }}>
        <MaterialCommunityIcons
          name="map-marker-distance"
          size={18}
          color="#000"
        />
        <Text
          style={{
            color: "#000",
            ...(isTablet() && {
              fontSize: 18,
            }),
          }}
        >
          {" "}
          {distance}m
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
