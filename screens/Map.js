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
  ImageBackground,
  FlatList,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
  EvilIcons,
} from "@expo/vector-icons";
import * as Location from "expo-location";
import AnimatedLottieView from "lottie-react-native";

import BHCard from "../components/BHCard";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "../ENVIRONMENTS";
import AddressPicker from "../components/AddressPicker";
import MapViewDirections from "react-native-maps-directions";
import RBSheet from "react-native-raw-bottom-sheet";
import { Entypo } from "@expo/vector-icons";
import Counter from "../components/Counter";
import BHListCard from "./../components/BHListCard";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
export default function Map({ navigation }) {
  const route = useRoute();
  const { location } = route.params;

  const [city, setCity] = React.useState("");
  const [street, setStreet] = useState(""); // State to store the street name
  const mapRef = useRef();
  const bsRef = useRef();
  const [mapReady, setMapReady] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [destination, setDestination] = useState(null);
  const [distance, setDistance] = useState(null);
  const [institution, setInstitution] = useState("Zict college");
  const [bedspaces, setBedspaces] = useState(2);
  const [bhgender, setBhgender] = useState("Male");
  const [count, setCount] = useState(0);
  const [boardingHouses, setBoardingHouses] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [address, setAddress] = React.useState("");

  const isTablet = () => {
    const { width, height } = Dimensions.get("window");
    const aspectRatio = height / width;
    // Adjust the threshold value as per your requirement
    return aspectRatio <= 1.6;
  };

  const handleMarkerPress = (bh) => {
    const mark = {
      id: bh.id,
      latitude: parseFloat(bh.Latitude),
      longitude: parseFloat(bh.Longitude),
      bhName: bh.bhName,
      street: bh.street,
      gender: bh.gender,
      bedspaces: bh.bedspaces,
      price: bh.price,
    };
    setSelectedMarker(mark);
    fetchRooms(bh.id);
    openBottomSheet();
    setAddress(bh.street);
  };

  const fetchRooms = async (id) => {
    var formdata = new FormData();
    formdata.append("bhID", id);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://www.pezabond.com/pezabondfiles/fetchRooms.php",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setRooms(result);
      })
      .catch((error) => console.log("error", error));
  };

  const openBottomSheet = () => {
    bsRef.current.open();
  };
  const handlePlaceSelected = (data, details) => {
    console.log("Selected Place Details:", details);
  };

  const handleMapReady = () => {
    setMapReady(true);
  };

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("https://www.pezabond.com/pezabondfiles/fetchboardinghouses.php")
      .then((response) => {
        setBoardingHouses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Handle button press event
  const handleButtonPress = () => {
    // Add your button's functionality here
    bsRef.current.open(); // Open the bottom sheet when the button is pressed
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
        <ActivityIndicator animating={true} color={"#EE3855"} size={"large"} />
        <Text style={{ marginTop: 15 }}>Locating Boarding houses</Text>
        <Counter />
      </View>
    );
  }

  // Calculate the desired height of the bottom sheet (25% of the screen height)
  const screenHeight = Dimensions.get("window").height;
  const bottomSheetHeight = screenHeight * 0.4;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark-content" />

      <MapView
        ref={mapRef}
        provider="google"
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0222,
          longitudeDelta: 0.0121,
        }}
      >
        {boardingHouses.map((bh) => (
          <Marker
            key={bh.id}
            coordinate={{
              latitude: parseFloat(bh.Latitude),
              longitude: parseFloat(bh.Longitude),
            }}
            title={bh.name}
            onPress={() => {
              handleMarkerPress(bh);
            }}
            image={require("../assets/icons/home4.png")}
          />
        ))}

        {destination && (
          <Circle
            center={{
              latitude: destination.latitude,
              longitude: destination.longitude,
            }}
            radius={500}
            fillColor="rgba(0, 255, 0, 0.1)" // Adjust the fill color and opacity as needed
            strokeColor="rgba(0, 0, 0, 1)" // Adjust the stroke color and opacity as needed
            strokeWidth={1}
          />
        )}

        {destination && selectedMarker && (
          <>
            <MapViewDirections
              origin={{
                latitude: selectedMarker.latitude,
                longitude: selectedMarker.longitude,
              }}
              destination={{
                latitude: destination.latitude,
                longitude: destination.longitude,
              }}
              mode="WALKING"
              apikey={GOOGLE_API_KEY}
              strokeWidth={3}
              strokeColor="#124e78"
              optimizeWaypoints={true}
              onReady={(result) => {
                // const { distance, duration } = result;

                // console.log("Distance:" + distance * 1000);

                // alert(address);
                mapRef.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: 60,
                    bottom: 100,
                    left: 60,
                    top: 100,
                  },
                });
              }}
            />
          </>
        )}
      </MapView>

      {/* <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity> */}

      <View style={styles.searchContainer}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-sharp" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: "#EE3855", padding: 2, borderRadius: 3 }}
            onPress={() => navigation.navigate("Boardinghouses")}
          >
            <Entypo name="list" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 10 }} />
        <AddressPicker
          placeholdeText="search by institution"
          fetchAddress={(latitude, longitude) => {
            setSelectedMarker(null);
            setDestination({ latitude, longitude });

            const newRegion = {
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.0222,
              longitudeDelta: 0.0121,
            };

            mapRef.current.animateToRegion(newRegion, 1200);
            console.log(newRegion);
          }}
        />
        <View
          style={{
            justifyContent: "center",
            marginTop: 2,
            backgroundColor: "#EE3855",
            paddingVertical: 10,
            paddingHorizontal: 5,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 12 }}>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Note: </Text>{" "}
            Click on the BH icon for more Boarding house details
          </Text>
        </View>
        <RBSheet
          ref={bsRef}
          height={Dimensions.get("window").height * 0.35}
          duration={500}
          closeOnDragDown={false}
          closeOnPressMask={true}
          customStyles={{
            container: {
              padding: 10,
              backgroundColor: "rgba(0, 0, 0,0.0)",
            },
          }}
        >
          {/* <TouchableOpacity
            style={{
              marginVertical: 7,
              marginBottom: 20,
            }}
            onPress={() => {
              bsRef.current.close();
              navigation.navigate("Results", {
                institution,
                bedspaces,
                bhgender,
              });
            }}
          >
            <Text
              style={{
                color: "#EE3855",
                fontWeight: "bold",
                textDecorationLine: "underline",
              }}
            >
              View (10) related results
            </Text>
          </TouchableOpacity> */}

          {selectedMarker && (
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
                    address={address}
                    self_contained={item.self_contained}
                    booked={item.booked}
                    rating={item.rating}
                  />
                </View>
              )}
            />
          )}
        </RBSheet>
      </View>
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
  searchContainer: {
    position: "absolute",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.2)",
    padding: 10,
    top: 0,
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
