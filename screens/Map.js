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
import {
  EvilIcons,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import * as Location from "expo-location";
import AnimatedLottieView from "lottie-react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import BHCard from "../components/BHCard";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

export default function Map({ navigation }) {
  const [location, setLocation] = useState(null);
  const [city, setCity] = React.useState("");
  const [street, setStreet] = useState(""); // State to store the street name

  const [mapReady, setMapReady] = useState(false);

  const fetchedAeromechanicsShops = [
    // Replace with your actual fetched data
    {
      ShopID: 1,
      ShopName: "BH 1",
      Latitude: 28.646451,
      Longitude: -12.947038,
    },
    {
      ShopID: 2,
      ShopName: "BH 2",
      Latitude: -12.94757,
      Longitude: 28.644077,
    },
    {
      ShopID: 3,
      ShopName: "BH 3",
      Latitude: -12.947038,
      Longitude: 28.646451,
    },
    {
      ShopID: 4,
      ShopName: "BH 4",
      Latitude: -12.948248,
      Longitude: 28.644152,
    },

    {
      ShopID: 5,
      ShopName: "BH 5",
      Latitude: -12.946442,
      Longitude: 28.639933,
    },
    {
      ShopID: 6,
      ShopName: "BH 6",
      Latitude: -12.946528,
      Longitude: 28.639947,
    },
    {
      ShopID: 7,
      ShopName: "BH 7",
      Latitude: -12.947089,
      Longitude: 28.639814,
    },
    {
      ShopID: 8,
      ShopName: "BH 8",
      Latitude: -12.949464,
      Longitude: 28.642954,
    },

    // Add more shops as needed
  ];
  const handleMapReady = () => {
    setMapReady(true);
  };

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
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
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
        <Text style={{ marginTop: 15 }}>Locating Boarding houses</Text>
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
        style={styles.map}
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
          radius={1000}
          fillColor="rgba(0, 255, 0, 0.1)" // Adjust the fill color and opacity as needed
          strokeColor="rgba(0, 0, 0, 1)" // Adjust the stroke color and opacity as needed
          strokeWidth={1}
        />

        {fetchedAeromechanicsShops.map((shop) => (
          <Marker
            key={shop.ShopID}
            coordinate={{
              latitude: shop.Latitude,
              longitude: shop.Longitude,
            }}
            title={shop.ShopName}
            // Add more details to the callout if needed
            // description={...}
            image={require("../assets/icons/home2.png")}
            style={styles.marker}
          />
        ))}
      </MapView>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
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
  marker: {
    width: 2, // Adjust the width as per your preference
    height: 1, // Adjust the height as per your preference
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
  map: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    elevation: 5,
  },
});
