import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
  Foundation,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const BHListCard = ({ props }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Details")}
      style={{
        height: 150,
        width: "98%",
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
        shadowOpacity: 0.3,
        shadowRadius: 4,
        marginEnd: 1,
        margin: 5,
        padding: 5,
        flexDirection: "row",
        marginBottom: 13,
      }}
    >
      <ImageBackground
        source={require("../assets/images/bh3.png")}
        resizeMethod="resize"
        imageStyle={{ borderRadius: 10 }}
        style={{
          height: "100%",
          width: 130,
          borderRadius: 10,
          marginEnd: 12,
        }}
      />
      <View
        style={{
          height: "100%",
          flex: 1,
          backgroundColor: "#fff",
          paddingEnd: 5,
        }}
      >
        <Text
          style={{
            color: "#000",
            fontWeight: "700",
            fontSize: 16,
            marginBottom: 10,
          }}
        >
          Angel Boarding Houses
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons name="house" size={18} color="#000" />
          <Text
            style={{
              color: "#000",
              marginStart: 3,
            }}
          >
            {"22 kalewa"}
          </Text>
        </View>
        <View
          style={{ flexDirection: "row", padding: 3, alignItems: "center" }}
        >
          <Foundation name="male-female" size={18} color="black" />
          <Text
            style={{
              color: "#000",
              marginStart: 3,
            }}
          >
            Male
          </Text>
        </View>
        <View
          style={{ flexDirection: "row", padding: 3, alignItems: "center" }}
        >
          <FontAwesome name="bed" size={18} color="black" />
          <Text
            style={{
              color: "#000",
              marginStart: 3,
            }}
          >
            2
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginBottom: 2,
            alignItems: "center",
            justifyContent: "space-between",
            bottom: 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              padding: 3,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#EE3855",
              }}
            >
              K {750}
            </Text>
            <Text
              style={{
                color: "#EE3855",
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
            <FontAwesome name="star" size={16} color="gold" />
            <Text
              style={{
                fontSize: 14,
                fontWeight: "400",
                color: "black",
                marginStart: 4,
              }}
            >
              {4}{" "}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BHListCard;

const styles = StyleSheet.create({});
