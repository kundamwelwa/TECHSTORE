import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react-native";

import { SelectList, DropDownSelect } from "react-native-dropdown-select-list";
import { Entypo, Feather } from "@expo/vector-icons";
import NumericInput from "react-native-numeric-input";
import BHCard from "../components/BHCard";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import * as Location from "expo-location";
import { GOOGLE_API_KEY } from "../ENVIRONMENTS";
import axios from "axios";
import NearbyColleges from "../components/NearbyColleges";
import Advert from "../components/advert";

const BHhoom = ({ navigation }) => {
  const [selected, setSelected] = React.useState([]);
  const [bedspaces, setBedspaces] = React.useState(1);
  const [viewLoading, setViewLoading] = React.useState(false);
  const [gender, setGender] = React.useState(0);
  const [bhgender, setbhGender] = React.useState("Male");

  const [location, setLocation] = useState(null);
  const [collegesData, setCollegesData] = useState([]);
  const bh_gender = [
    { label: "Male", value: 0 },
    { label: "Female", value: 1 },
  ];

  const institutions = [
    { key: "1", value: "Zambia University College of Technology" },
    { key: "2", value: "Northen Technical College" },
    { key: "3", value: "Copperbelt University" },
    { key: "4", value: "Northrise University" },
    { key: "5", value: "Ndola Teaching Hospital" },
    { key: "6", value: "Chreso University" },
    { key: "7", value: "University Of Lusaka" },
    { key: "8", value: "ZICAS" },
    { key: "9", value: "ICU" },
    { key: "10", value: "University Of Zambia" },
    { key: "11", value: "Mulungushi University" },
  ];
  const beds = [
    { key: "1", value: "1" },
    { key: "2", value: "2" },
    { key: "3", value: "3" },
    { key: "4", value: "4" },
    { key: "5", value: "5" },
    { key: "6", value: "6" },
  ];

  const house = [
    {
      data: { latitude: -12.969825, longitude: 28.6510915 },
      key: "ChIJXxwI9d-0bBkREAD7-7EJKis",
      value: "Northrise University",
    },
    {
      data: { latitude: -12.9541186, longitude: 28.6487254 },
      key: "ChIJvYMQehW1bBkRmYBtnEsvRq0",
      value: "Arthur David College of Paediatric and Child Health Nursing",
    },
    {
      data: { latitude: -12.9448429, longitude: 28.655469 },
      key: "ChIJlcEShNq1bBkRC0Nvz8jiETo",
      value: "Lusaka",
    },
  ];

  const handleItemSelect = (item) => {
    console.log(item.data);
  };
  const isTablet = () => {
    const { width, height } = Dimensions.get("window");
    const aspectRatio = height / width;
    // Adjust the threshold value as per your requirement
    return aspectRatio <= 1.6;
  };

  const goToResultsScreen = () => {
    setViewLoading(true);
    // console.log(institution, " ", bedspaces, " ", bhgender);
    setTimeout(() => {
      navigation.navigate("Map");
      // navigation.navigate("Results", { institution, bedspaces, bhgender });
      setViewLoading(false);
    }, 3000); // wait for 3 seconds (300 milliseconds) before navigating
  };

  // Function to get device's current location and fetch colleges
  const fetchCollegesNearby = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const apiKey = GOOGLE_API_KEY;
      const radius = 50000; // Search within a 5 km radius (you can adjust this as needed)
      const country = "Zambia";
      const types = "university"; // You can use other types like 'college', 'school', etc.

      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.coords.latitude},${location.coords.longitude}&radius=${radius}&type=${types}&key=${apiKey}`
      );
      // Extracting relevant data (ID and name) from the API response and storing in an array

      const colleges = response.data.results.map((college) => ({
        key: college.place_id,
        value: college.name,
        data: {
          latitude: college.geometry.location.lat,
          longitude: college.geometry.location.lng,
        },
      }));
      // console.log(colleges);
      setCollegesData(colleges);
    } catch (error) {
      console.log("Error fetching colleges: ", error);
    }
  };

  useEffect(() => {
    fetchCollegesNearby();
  }, []);

  const handleSelect = (item) => {
    // Extract latitude and longitude from the selected item
    // const { latitude, longitude, label } = item;
    // console.log(`Selected Institution: ${label}`);
    // console.log(`Latitude: ${latitude}`);
    // console.log(`Longitude: ${longitude}`);

    console.log(item);
  };

  return (
    <>
      <Advert />
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={true}
        style={{
          paddingHorizontal: 3,
          paddingBottom: 20,
          backgroundColor: "#fff",
          flex: 1,
          ...(isTablet() && {
            paddingBottom: 30,
          }),
        }}
      >
        <View style={{ paddingVertical: 0 }}>
          <View
            style={{
              flexDirection: "row",
              marginStart: 20,
              alignItems: "center",
              width: "100%",
            }}
          >
            <View style={{ width: "45%", fontSize: 19 }}>
              <Text
                style={{
                  fontSize: 19,
                  fontWeight: "bold",
                  ...(isTablet() && { fontSize: 28, fontWeight: "bold" }),
                }}
              >
                Complete the steps provided
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#B8B8B8",
                  marginBottom: 5,
                  ...(isTablet() && { fontSize: 20 }),
                }}
              >
                Our system will suggest the nearest within your institution
                radius
              </Text>
            </View>
            <Image
              style={{
                width: "45%",
                height: 250,
                marginEnd: 15,
                ...(isTablet() && { height: 350 }),
              }}
              source={require("../assets/icons/rent.png")}
            />
          </View>

          <View style={{ marginHorizontal: 10, marginTop: -25 }}>
            <Text
              style={{
                fontSize: 15,
                color: "black",
                fontWeight: "bold",
                marginBottom: 5,
                ...(isTablet() && { fontSize: 24, fontWeight: "700" }),
              }}
            >
              Boarding house type by gender
            </Text>
          </View>
          <View
            style={{
              ...(isTablet() && {
                marginVertical: 10,
                flexDirection: "row",
              }),
            }}
          >
            <View
              style={{
                marginStart: 10,
                marginVertical: 20,
                flexDirection: "row",
                alignItems: "center",
                ...(isTablet() && { marginVertical: 35 }),
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: "black",
                  fontWeight: "bold",
                  marginBottom: 5,
                  marginEnd: 20,
                  ...(isTablet() && { fontSize: 22, fontWeight: "500" }),
                }}
              >
                Gender
              </Text>
              <View
                style={{
                  marginVertical: 10,
                }}
              >
                <RadioForm
                  radio_props={bh_gender}
                  initial={0}
                  onPress={(value) => {
                    setGender(value);
                    {
                      value == 1 ? setbhGender("Female") : setbhGender("Male");
                    }
                  }}
                  animation={false}
                  formHorizontal={true}
                  buttonStyle={{
                    marginEnd: 10,
                  }}
                  buttonColor={"#ededed"}
                  buttonSize={10}
                  labelStyle={{
                    marginEnd: 15,
                    ...(isTablet() && { fontSize: 20 }),
                  }}
                />
              </View>
            </View>
            <View
              style={{
                marginHorizontal: 10,
                flexDirection: "row",
                alignItems: "center",
                ...(isTablet() && { marginVertical: 5 }),
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: "black",
                  fontWeight: "bold",
                  marginBottom: 5,
                  marginEnd: 10,
                  ...(isTablet() && {
                    fontSize: 22,
                    fontWeight: "500",
                    marginStart: 60,
                  }),
                }}
              >
                Bed-spaces per room
              </Text>
              <View
                style={{
                  marginVertical: 10,
                }}
              >
                <NumericInput
                  value={bedspaces}
                  onChange={(value) => setBedspaces(value)}
                  maxValue={6}
                  minValue={1}
                  totalWidth={120}
                  totalHeight={40}
                  rounded
                  step={1}
                  valueType="integer"
                  iconStyle={{
                    color: "#EE3855",
                    ...(isTablet() && { fontSize: 22, fontWeight: "700" }),
                  }}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#EE3855",
                borderRadius: 5,
                width: "90%",
                height: 50,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
                marginBottom: 25,
                ...(isTablet() && {
                  height: 60,
                  marginStart: 0,
                  width: "60%",
                }),
                flexDirection: "row",
              }}
              //   onPress={(prev) => setViewLoading(true); goToDetailsScreen }
              onPress={goToResultsScreen}
            >
              <Feather name="map" size={20} color="white" />
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  marginStart: 10,
                  ...(isTablet() && { fontSize: 22, fontWeight: "400" }),
                }}
              >
                Locate By Map
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {viewLoading ? (
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {Platform.OS === "ios" ? (
              <Lottie
                source={require("../assets/animations/bar.json")}
                autoPlay
                loop
                style={{
                  position: "relative",
                  width: 2000,
                  height: 3,
                }}
              />
            ) : (
              <Lottie
                source={require("../assets/animations/bar.json")}
                autoPlay
                loop
                style={{
                  position: "relative",
                  width: 2000,
                  height: 3,
                }}
              />
            )}
            <Text
              style={{
                color: "black",
                fontSize: 14,
                fontWeight: "400",
                marginBottom: 10,
                marginTop: 5,
                ...(isTablet() && { fontSize: 30, fontWeight: "700" }),
              }}
            >
              Please wait
            </Text>
          </View>
        ) : null}

        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            marginTop: 10,
            marginStart: 10,
            marginTop: 10,
            marginBottom: 5,
            ...(isTablet() && { fontSize: 22, fontWeight: "700" }),
          }}
        >
          Near you
        </Text>

        <View
          style={{
            marginStart: 10,
            height: 1,
            width: 45,
            backgroundColor: "#dedede",
          }}
        ></View>

        <ScrollView
          showsHorizontalScrollIndicator={false}
          bounce
          style={{
            backgroundColor: "#fff",
            paddingVertical: 10,
            marginBottom: 20,
          }}
          horizontal
        >
          <TouchableOpacity onPress={() => navigation.navigate("Details")}>
            <BHCard
              price={750}
              rating={5}
              address={"22 Arthur davison"}
              distance={100}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Details")}>
            <BHCard
              price={750}
              rating={5}
              address={"22 Arthur davison"}
              distance={100}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Details")}>
            <BHCard
              price={750}
              rating={5}
              address={"22 Arthur davison"}
              distance={100}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Details")}>
            <BHCard
              price={750}
              rating={5}
              address={"22 Arthur davison"}
              distance={100}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Details")}>
            <BHCard
              price={750}
              rating={5}
              address={"22 Arthur davison"}
              distance={100}
            />
          </TouchableOpacity>
        </ScrollView>
      </ScrollView>
    </>
  );
};

export default BHhoom;

const styles = StyleSheet.create({});
