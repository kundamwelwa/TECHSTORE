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
import { useRoute } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";

const BHhoom = ({ navigation }) => {
  const route = useRoute();
  const [selected, setSelected] = React.useState([]);
  const [bedspaces, setBedspaces] = React.useState(1);
  const [viewLoading, setViewLoading] = React.useState(false);
  const [gender, setGender] = React.useState(0);
  const [bhgender, setbhGender] = React.useState("Male");
  const [rooms, setRooms] = useState([]);
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

  const [city, setCity] = useState("Loading...");

  useEffect(() => {
    const fetchLocationAndCity = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.error("Location permission not granted");
        return;
      }

      try {
        const location = await Location.getCurrentPositionAsync({});
        const coords = location.coords;
        const cityName = await getCityName(coords);
        setCity(cityName);
        fetchRooms(cityName);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    fetchLocationAndCity();
  }, []);

  const getCityName = async (coords) => {
    const { latitude, longitude } = coords;
    const apiKey = GOOGLE_API_KEY;
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const addressComponents = data.results[0].address_components;
      const cityComponent = addressComponents.find((component) =>
        component.types.includes("locality")
      );
      const cityName = cityComponent
        ? cityComponent.long_name
        : "City not found";

      return cityName;
    } catch (error) {
      console.error("Error fetching city:", error);
      return "Error fetching city";
    }
  };

  const fetchRooms = async (cityName) => {
    var formdata = new FormData();
    formdata.append("city", cityName);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://www.pezabond.com/pezabondfiles/fetchNear.php",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setRooms(result);
        console.log(rooms);
      })
      .catch((error) => console.log("error", error));
    setRooms([]);
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
                Find a home away from home
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#B8B8B8",
                  marginBottom: 5,
                  ...(isTablet() && { fontSize: 20 }),
                }}
              >
                we can save you time, stress and cost while searching for a
                baording house
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
          {/* <View style={{ marginHorizontal: 10, marginTop: -25 }}>
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
          </View> */}
          {/* <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "400",
                marginStart: 10,

                marginBottom: 5,
                ...(isTablet() && { fontSize: 22, fontWeight: "700" }),
              }}
            >
              use the smart map Search
            </Text>
          </View> */}
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
                marginTop: 7,
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
                  fontWeight: "600",
                  ...(isTablet() && { fontSize: 22, fontWeight: "400" }),
                }}
              >
                Locate boarding house using Map
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

        {rooms.length == 0 ? (
          <View style={styles.container2}>
            <Lottie
              source={require("../assets/animations/clouds.json")}
              autoPlay
              loop
              speed={2}
              style={{ width: "100%", height: "90%" }}
            />
            <Text style={{ fontWeight: "500", fontSize: 14, marginTop: -20 }}>
              We couldn't find boarding houses in your current city
            </Text>
          </View>
        ) : (
          <FlatList
            horizontal
            data={rooms}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View key={item.id}>
                <BHCard
                  id={item.id}
                  amount_per_month={item.amount_per_month}
                  bed_spaces={item.bed_spaces}
                  address={item.street}
                  self_contained={item.self_contained}
                  booked={item.booked}
                  rating={item.rating}
                  contact={item.contact}
                />
              </View>
            )}
          />
        )}
      </ScrollView>
    </>
  );
};

export default BHhoom;

const styles = StyleSheet.create({
  Near: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    marginBottom: 20,
  },
  container2: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
