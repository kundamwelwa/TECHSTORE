import React, { useState, useEffect, useRef } from "react";
import MapView, { Circle, Marker } from "react-native-maps";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { EvilIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import AnimatedLottieView from "lottie-react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import BHCard from "../components/BHCard";
import { ActivityIndicator, MD2Colors } from "react-native-paper";


export default function Map() {
  const [location, setLocation] = useState(null);
  const [city, setCity] = React.useState("");
  const [street, setStreet] = useState(""); // State to store the street name

  const bottomSheetRef = useRef();

  useEffect(() => {
    // Request permission to access the device's location
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        // Handle the case when permission is not granted
        return;
      }

      // Get the current location
      let location = await Location.getCurrentPositionAsync({});

      setLocation(location.coords);

      // Reverse geocoding to get the city
      let address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (address.length > 0) {
        setCity(address[0].city);
        setStreet(address[0].street); // Set the street name
      }
    })();
  }, []);

  // Handle button press event
  const handleButtonPress = () => {
    // Add your button's functionality here
    bottomSheetRef.current.open(); // Open the bottom sheet when the button is pressed
  };

  if (!location) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {/* <AnimatedLottieView
          source={require("../assets/animations/loadingmap1.json")}
          autoPlay
          loop
          style={{
            position: "relative",
            width: "80%",
            justifyContent: "space-evenly",
            alignContent: "center",
            marginBottom: -15,
            marginTop: -10,
          }}
        /> */}
        <ActivityIndicator animating={true} color={"#EE3855"} size={"large"} />
        <Text style={{ marginTop: 15 }}>Finding your location</Text>
      </View>
    );
  }

  // Calculate the desired height of the bottom sheet (25% of the screen height)
  const screenHeight = Dimensions.get("window").height;
  const bottomSheetHeight = screenHeight * 0.4;

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        provider="google"
        style={{ flex: 1 }}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0221,
        }}
      >
        <Circle
          center={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          radius={3000}
          fillColor="rgba(0, 255, 0, 0.1)" // Adjust the fill color and opacity as needed
          strokeColor="rgba(0, 0, 0, 1)" // Adjust the stroke color and opacity as needed
          strokeWidth={1}
        />
      </MapView>
      <View
        style={{
          marginVertical: 10,
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-evenly",
          position: "absolute",
          top: 16,
          ...(isTablet() && {
            marginStart: 10,
            justifyContent: "space-evenly",
          }),
        }}
      >
        <View style={styles.breadcramp}>
          <EvilIcons name="location" size={20} color="#fff" />
          <Text style={styles.crampText}>
            {city}, {street}
          </Text>
        </View>
        <View style={styles.breadcramp}>
          <MaterialCommunityIcons
            name="sign-real-estate"
            size={20}
            color="#fff"
          />
          <Text style={styles.crampText}>{22} houses for rent near you</Text>
        </View>
      </View>
      {/* Floating centered bottom button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
          <Text style={styles.buttonText}>View All properties</Text>
        </TouchableOpacity>
      </View>

      {/* RawBottomSheet */}
      <RBSheet
        ref={bottomSheetRef}
        height={bottomSheetHeight} // Set the height of the bottom sheet
        closeOnDragDown // Allow closing the bottom sheet by dragging it down
      >
        {/* Content inside the bottom sheet */}

        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={styles.bottomSheetContent}
        >
          <BHCard
            price={1000}
            rating={4}
            address={"45 kalewa"}
            distance={120}
          />
          <BHCard
            price={750}
            rating={5}
            address={"22 Arthur davison"}
            distance={100}
          />
          <BHCard
            price={1000}
            rating={4}
            address={"20 Mwami road"}
            distance={45}
          />
          <BHCard
            price={1200}
            rating={4}
            address={"22 Mwatiyanvwa"}
            distance={45}
          />
        </ScrollView>
      </RBSheet>
    </SafeAreaView>
  );
}

const isTablet = () => {
  const { width, height } = Dimensions.get("window");
  const aspectRatio = height / width;
  // Adjust the threshold value as per your requirement
  return aspectRatio <= 1.6;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
  },
  breadcramp: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#a3a3a3",
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
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#ee3855",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 3,
      width: 3,
    },
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
