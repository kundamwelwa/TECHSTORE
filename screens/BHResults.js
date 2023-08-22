import {
  Dimensions,
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";
import React, { useState, useRef } from "react";
import { useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
  EvilIcons,
  Feather,
} from "@expo/vector-icons";
import BHCard from "../components/BHCard";
import { Lottie } from "lottie-react-native";
import { Entypo } from "@expo/vector-icons";
import Details from "./Details";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import RBSheet from "react-native-raw-bottom-sheet";

const screenHeight = Dimensions.get("window").height;
const statusBarHeight = StatusBar.currentHeight || 0;
const contentHeight = screenHeight - statusBarHeight;

const BHResults = ({ navigation }) => {
  const [reminder, setReminder] = React.useState(false);
  const [viewDetails, setviewDetails] = React.useState(false);
  const route = useRoute();
  const { institution, bedspaces, bhgender } = route.params;
  const [gender, setGender] = React.useState(0);
  const refRBSheet = useRef();

  const isTablet = () => {
    const { width, height } = Dimensions.get("window");
    const aspectRatio = height / width;
    // Adjust the threshold value as per your requirement
    return aspectRatio <= 1.6;
  };
  const bh_gender = [
    { label: "Male", value: 0 },
    { label: "Female", value: 1 },
  ];
  const openModal = () => {
    setviewDetails(true);
  };

  const closeModal = () => {
    setviewDetails(false);
  };

  const receiveFalseData = (data) => {
    console.log(data);
  };

  return (
    <ScrollView style={{ backgroundColor: "#fff", paddingHorizontal: 5 }}>
      <View
        style={{
          backgroundColor: "#fff",
          marginVertical: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          ...(isTablet() && {
            marginStart: 10,
          }),
        }}
      >
        <View style={styles.breadcramp}>
          <Text style={styles.crampText}>{institution}</Text>
        </View>
        <View style={styles.breadcramp}>
          <Text style={styles.crampText}>{bhgender}</Text>
        </View>
        <View style={styles.breadcramp}>
          <Text style={styles.crampText}>{bedspaces}</Text>
        </View>
      </View>

      <View
        style={{
          marginBottom: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          marginEnd: 10,
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="search-circle-sharp"
            size={isTablet() ? 35 : 24}
            color="#EE3855"
          />
          <Text
            style={{
              fontSize: 14,
              color: "black",
              fontWeight: "500",
              ...(isTablet() && {
                fontSize: 18,
              }),
            }}
          >
            Search Again
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            color: "black",
            fontSize: 14,
            fontWeight: "400",
            ...(isTablet() && {
              fontSize: 18,
            }),
          }}
        >
          {10} Results
        </Text>
      </View>

      <View
        style={{ height: 0.8, backgroundColor: "#EDED", marginBottom: 10 }}
      ></View>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        bounce
        style={{ backgroundColor: "#fff", flexGrow: 1 }}
        horizontal
      >
        <TouchableOpacity onPress={() => navigation.navigate("Details")}>
          <BHCard
            price={1000}
            rating={4}
            address={"45 kalewa"}
            distance={120}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Details")}>
          <BHCard
            price={1000}
            rating={4}
            address={"45 kalewa"}
            distance={120}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Details")}>
          <BHCard
            price={1000}
            rating={4}
            address={"45 kalewa"}
            distance={120}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Details")}>
          <BHCard
            price={1000}
            rating={4}
            address={"45 kalewa"}
            distance={120}
          />
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={viewDetails} animationType="slide">
        <Details SendFlaseData={receiveFalseData} />
      </Modal>

      {/* <RBSheet
        ref={refRBSheet}
        height={contentHeight}
        openDuration={250}
        closeOnDragDown={true}
        customStyles={{
          container: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          },
        }}
      >
        <Details />
      </RBSheet> */}

      <View style={{ flexGrow: 1 }}>
        <View
          style={{
            flexDirection: "row",
            marginStart: 10,
            alignItems: "center",
            marginTop: 30,
            borderTopColor: "#e8e8e8",
            borderTopWidth: 1,
            paddingTop: 20,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              width: "45%",
              fontSize: 19,
            }}
          >
            <Text
              style={{
                fontSize: 19,
                fontWeight: "bold",
                ...(isTablet() && {
                  fontSize: 26,
                }),
              }}
            >
              Didn't find any from the list?
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#B8B8B8",
                marginBottom: 5,
                ...(isTablet() && {
                  fontSize: 18,
                }),
              }}
            >
              click the bell icon, we will notify you when we have new listings
            </Text>
          </View>

          {reminder == true ? (
            <TouchableOpacity
              style={{
                backgroundColor: "#fff",
                marginStart: 25,
                padding: 30,
                alignItems: "center",
                justifyContent: "center",
                marginEnd: 20,
              }}
              onPress={() => setReminder(false)}
            >
              <Feather
                name="bell"
                size={isTablet() ? 35 : 24}
                color="#EE3855"
              />
              <Text
                style={{
                  fontSize: 14,
                  color: "#EE3855",
                  marginBottom: 5,
                  ...(isTablet() && {
                    fontSize: 18,
                  }),
                }}
              >
                Remind me
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                backgroundColor: "#fff",
                marginStart: 25,
                padding: 30,
                alignItems: "center",
                justifyContent: "center",
                marginEnd: 20,
              }}
              onPress={() => setReminder(true)}
            >
              <Feather
                name="bell-off"
                size={isTablet() ? 35 : 24}
                color="black"
              />
              <Text
                style={{
                  fontSize: 14,
                  color: "#000",
                  marginBottom: 5,
                  ...(isTablet() && {
                    fontSize: 18,
                  }),
                }}
              >
                Dont Remind
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default BHResults;

const isTablet = () => {
  const { width, height } = Dimensions.get("window");
  const aspectRatio = height / width;
  // Adjust the threshold value as per your requirement
  return aspectRatio <= 1.6;
};

const styles = StyleSheet.create({
  breadcramp: {
    backgroundColor: "#ee3855",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
    ...(isTablet() && {
      paddingVertical: 7,
      marginEnd: 20,
    }),
  },
  crampText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",

    ...(isTablet() && {
      fontSize: 18,
      fontWeight: "700",
    }),
  },
});
