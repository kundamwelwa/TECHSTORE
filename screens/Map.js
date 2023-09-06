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
export default function Map({ navigation }) {
  const [location, setLocation] = useState(null);
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

  const isTablet = () => {
    const { width, height } = Dimensions.get("window");
    const aspectRatio = height / width;
    // Adjust the threshold value as per your requirement
    return aspectRatio <= 1.6;
  };
  const handleMarkerPress = (shop) => {
    const mark = {
      latitude: shop.Latitude,
      longitude: shop.Longitude,
    };
    setSelectedMarker(mark);
    openBottomSheet();
  };

  const openBottomSheet = () => {
    bsRef.current.open();
  };
  const handlePlaceSelected = (data, details) => {
    console.log("Selected Place Details:", details);
  };

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
    {
      ShopID: 9,
      ShopName: "BH 8",
      Latitude: -12.9576602,
      Longitude: 28.629381,
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
        {fetchedAeromechanicsShops.map((shop) => (
          <Marker
            key={shop.ShopID}
            coordinate={{
              latitude: shop.Latitude,
              longitude: shop.Longitude,
            }}
            title={shop.ShopName}
            onPress={() => {
              handleMarkerPress(shop);
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
          height={Dimensions.get("window").height * 0.37}
          duration={500}
          closeOnDragDown={false}
          closeOnPressMask={true}
          customStyles={{
            container: {
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              borderTopColor: "rgb(120, 120, 120)",
              borderTopWidth: 4,
              padding: 10,
            },
          }}
        >
          <TouchableOpacity
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
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              paddingVertical: 20,
              width: "100%",
            }}
          >
            <ImageBackground
              source={require("../assets/images/bh3.png")}
              resizeMethod="resize"
              imageStyle={{ borderRadius: 10 }}
              style={{
                height: Dimensions.get("window").height * 0.17,
                width: 150,
                borderRadius: 10,
                ...(isTablet() && {
                  height: 180,
                }),
              }}
            />

            <View
              style={{
                paddingStart: 20,
                width: "60%",
                marginEnd: 20,
                marginStart: 7,
              }}
            >
              <Text style={{ fontWeight: "600", fontSize: 20 }}>
                Northrise, Ndola
              </Text>
              <Text
                style={{ fontWeight: "300", fontSize: 14, marginBottom: 5 }}
              >
                Kalewa 22
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 5,
                }}
              >
                <MaterialCommunityIcons
                  name="map-marker-distance"
                  size={18}
                  color="#000"
                />
                <Text
                  style={{
                    color: "#000",
                    marginStart: 5,
                    ...(isTablet() && {
                      fontSize: 18,
                    }),
                  }}
                >
                  {" "}
                  {23}m
                </Text>
              </View>

              <View
                style={{
                  marginTop: 5,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons name="shower" size={18} color="#000" />
                <Text
                  style={{
                    color: "#000",
                    marginStart: 5,
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

              <View
                style={{
                  marginTop: 5,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons name="cash" size={18} color="#000" />
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
                      color: "#000",
                      ...(isTablet() && {
                        fontSize: 22,
                      }),
                    }}
                  >
                    K {750}
                  </Text>
                  <Text
                    style={{
                      color: "#000",
                      ...(isTablet() && {
                        fontSize: 16,
                      }),
                    }}
                  >
                    /month
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 10,
            }}
          >
            <TouchableOpacity
              style={{ alignItems: "center", flexDirection: "row" }}
              onPress={() => {
                bsRef.current.close();
                navigation.navigate("Details");
              }}
            >
              <Ionicons name="eye" size={24} color="black" />
              <Text style={{ marginStart: 5 }}>Details</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#EE3855",
                borderRadius: 20,
                elevation: 5,
                width: "60%",
                height: 60,
                alignItems: "center",
                justifyContent: "center",
                ...(isTablet() && {
                  width: 200,
                  height: 80,
                }),
              }}
              onPress={() => console.log("clicked")}
            >
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "500",
                  color: "#fff",
                  ...(isTablet() && {
                    fontSize: 24,
                  }),
                }}
              >
                Book Now
              </Text>
            </TouchableOpacity>
          </View>
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
