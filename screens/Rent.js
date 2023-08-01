import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Modal,
  Button,
  Platform,
  Linking,
} from "react-native";
import React, { Component } from "react";
import { MaterialIcons } from "@expo/vector-icons";

import FadeLoader from "../components/FadeLoader";
import * as Animatable from "react-native-animatable";
import PropertyItem from "../components/PropertyItem";
import RBSheet from "react-native-raw-bottom-sheet";
import VehicleType from "./../components/VehicleType";
import { Ionicons } from "@expo/vector-icons";
import Map from "./Map";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Chip } from "react-native-paper";
import * as Location from "expo-location";
import { GOOGLE_API_KEY } from "../ENVIRONMENTS";
import axios from "axios";
// Create a stack navigator
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Search from "../components/Search";
const Stack = createStackNavigator();

export default class Rent extends Component {
  constructor(props) {
    super(props);
    this.state = { showViewOne: true, modalVisible: false };
    this.toggleView = this.toggleView.bind(this);
    this.bottomSheetRef = React.createRef();
  }

  state = {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    componentHeight: this.height * 0.7,
    componentWidth: this.width * 0.7,
    SOS: "",
    BR: 0,
    city: "",
    street: "",
    errorMessage: null,
  };

  componentDidMount() {
    this.getLocationAsync();
  }

  getLocationAsync = async () => {
    try {
      // Ask for permission to access the device's location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        this.setState({
          errorMessage: "Permission to access location was denied",
        });
        return;
      }

      // Get the device's current location
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      // Use the latitude and longitude to get the address details (city and street)
      let address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      // Extract the city and street from the address object
      if (address.length > 0) {
        this.setState({
          city: address[0].city,
          street: address[0].street,
        });
      }
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
  };

  isTablet = () => {
    const { width, height } = Dimensions.get("window");
    const aspectRatio = height / width;
    // Adjust the threshold value as per your requirement
    return aspectRatio <= 1.6;
  };

  makeCall = (phoneNumber) => {
    let phoneNumberStr = "";
    if (Platform.OS === "android") {
      phoneNumberStr = `tel:${phoneNumber}`;
    } else {
      phoneNumberStr = `telprompt:${phoneNumber}`;
    }
    Linking.openURL(phoneNumberStr);
  };

  toggleView() {
    this.setState((prevState) => ({ showViewOne: !prevState.showViewOne }));
  }
  toggleViewMap() {
    this.setState((prevState) => ({ modalVisible: !prevState.modalVisible }));
    console.log("pressed");
  }

  openBottomSheet = () => {
    this.bottomSheetRef.current.open();
  };

  isTablet() {
    const { width, height } = Dimensions.get("window");
    const aspectRatio = height / width;
    // Adjust the threshold value as per your requirement
    return aspectRatio <= 1.6;
  }

  render() {
    const { showViewOne } = this.state;
    const { navigation } = this.props;
    const { modalVisible } = this.state;

    const { isTablet } = this.state;
    const containerStyle = [
      styles.container,
      isTablet ? styles.tabletContainer : null,
    ];

    return (
      <>
    
        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          bounces={true}
          style={{
            marginBottom: 20,
            paddingBottom: 50,
            ...(this.isTablet() && { marginHorizontal: "3%" }),
          }}
        >
          {showViewOne ? (
            <View>
              <View
                style={{
                  flexDirection: "row",

                  ...(this.isTablet() && {
                    justifyContent: "space-between",
                    paddingHorizontal: 30,
                  }),
                }}
              >
                <View
                  style={{
                    ...(this.isTablet() && {
                      width: "50%",
                    }),
                  }}
                ></View>
                <View
                  style={{
                    borderColor: "#707070",
                    borderWidth: 0.5,
                    borderRadius: 5,
                    width: Dimensions.get("window").width - 40,
                    height: 44,
                    alignItems: "center",
                    padding: 10,
                    flexDirection: "row",
                    marginVertical: 20,
                    marginStart: 20,
                    paddingEnd: 20,
                    marginHorizontal: "20%",
                    ...(this.isTablet() && {
                      width: "48%",
                      height: 58,
                      marginHorizontal: "30%",
                      marginVertical: 45,
                    }),
                  }}
                >
                  <Image
                    style={{ width: 15, height: 17, marginEnd: 15 }}
                    source={require("../assets/images/search.png")}
                  />
                  <View
                    style={{
                      width: "85%",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <TextInput
                      placeholder={"Search by locality"}
                      placeholderTextColor="#666666"
                      textContentType="addressCityAndState"
                      style={{
                        ...(this.isTablet() && {
                          fontSize: 18,
                          fontWeight: "400",
                          height: 200,
                        }),
                      }}
                      autoCapitalize="sentences"
                      width={200}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState((prevState) => ({
                        modalVisible: !prevState.modalVisible,
                      }));
                    }}
                  >
                    <MaterialIcons
                      style={{ alignContent: "flex-end" }}
                      name="my-location"
                      size={24}
                      color="#EE3855"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {this.state.city == "" || this.isTablet() ? null : (
                <Chip
                  icon="check"
                  onPress={() => console.log("Pressed")}
                  mode="flat"
                  style={{
                    width: Dimensions.get("window").width - 40,
                    height: 44,
                    alignItems: "center",
                    flexDirection: "row",
                    marginVertical: 5,
                    marginStart: 20,
                    paddingEnd: 20,
                    marginHorizontal: "20%",
                  }}
                  disabled
                >
                  <Text>Your current city, </Text>
                  {this.state.city}
                </Chip>
              )}

              <Modal visible={modalVisible} animationType="slide">
                <TouchableOpacity
                  onPress={() => {
                    this.setState((prevState) => ({
                      modalVisible: !prevState.modalVisible,
                    }));
                  }}
                  style={{
                    marginStart: 10,
                    marginTop: Platform.OS === "ios" ? 45 : 20,
                    marginBottom: Platform.OS === "ios" ? 5 : 10,
                  }}
                >
                  <Ionicons
                    name="arrow-back-circle-outline"
                    size={this.isTablet() ? 40 : 30}
                    // size={30}
                    color="#EE3855"
                  />
                </TouchableOpacity>
                <Map />
              </Modal>

              <Text
                style={{
                  color: "black",
                  marginStart: 20,
                  fontWeight: "bold",
                  fontSize: 15,
                  marginVertical: 23,
                  ...(this.isTablet() && {
                    fontSize: 24,
                    marginTop: 5,
                  }),
                }}
              >
                Number of beds spaces per room
              </Text>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginHorizontal: 20,
                  marginVertical: 10,
                  ...(this.isTablet() && { marginVertical: 15 }),
                }}
              >
                <View style={styles.row}>
                  <TouchableOpacity style={styles.item}>
                    <Text style={styles.br}>1 BR</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.item}>
                    <Text style={styles.br}>2 BR</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.item}>
                    <Text style={styles.br}>3 BR</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.row}>
                  <TouchableOpacity style={styles.item}>
                    <Text style={styles.br}>4 BR</Text>
                  </TouchableOpacity>
                  <View style={styles.item}>
                    <Text style={styles.br}>5 BR</Text>
                  </View>
                  <View style={styles.item}>
                    <Text style={styles.br}>5+ BR</Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  // width: Dimensions.get("window").width - 40,
                  width: "100%",
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  marginVertical: 20,
                  marginBottom: 10,
                  // backgroundColor: "red",
                  // marginHorizontal: "20%",
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "#EE3855",
                    borderRadius: 5,
                    height: 50,
                    // width: "100%",
                    width: "85%",
                    alignItems: "center",
                    justifyContent: "center",
                    marginVertical: 20,
                    marginBottom: 40,
                    borderColor: "#EE3855",
                    borderWidth: 2,
                    ...(this.isTablet() && {
                      width: "95%",
                      height: 70,
                    }),
                  }}
                  onPress={this.toggleView}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 18,
                      ...(this.isTablet() && {
                        // width: "95%",
                        fontSize: 23,
                        fontWeight: "400",
                      }),
                    }}
                  >
                    Search
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  marginTop: 30,
                  width: "100%",
                }}
              >
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                    justifyContent: "space-between",
                    // backgroundColor: "red",
                    paddingHorizontal: 25,
                    ...(this.isTablet() && {
                      marginHorizontal: "1%",
                    }),
                  }}
                >
                  <View style={{ width: "45%", fontSize: 19 }}>
                    <Text
                      style={{
                        fontSize: 19,
                        fontWeight: "bold",
                        ...(this.isTablet() && {
                          fontSize: 28,
                        }),
                      }}
                    >
                      Get your property listed on our App
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#B8B8B8",
                        marginBottom: 5,
                        ...(this.isTablet() && {
                          fontSize: 22,
                        }),
                      }}
                    >
                      Contact the peza bond team to get your property advert
                      listed oon our App
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "50%",
                      ...(this.isTablet() && {
                        width: "50%",
                      }),
                    }}
                  >
                    <Image
                      style={{
                        resizeMode: "contain",
                        width: 180,
                        height: 180,
                        // backgroundColor: "red",
                        ...(this.isTablet() && {
                          resizeMode: "contain",
                          width: 350,
                          height: 350,
                        }),
                      }}
                      source={require("../assets/images/housewithpointer.png")}
                    />
                  </View>
                </View>
                <View
                  style={{
                    // backgroundColor: "green",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: 5,
                      width: "85%",
                      height: 50,
                      marginHorizontal: "10%",
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: 2,
                      ...(this.isTablet() && {
                        borderWidth: 2,
                        height: 70,
                      }),
                      borderColor: "#EE3855",
                    }}
                    onPress={this.makeCall}
                  >
                    <Text
                      style={{
                        color: "#EE3855",
                        fontSize: 16,
                        ...(this.isTablet() && {
                          fontSize: 23,
                          fontWeight: "400",
                        }),
                      }}
                    >
                      Get Free Property Ad
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  marginTop: 30,
                  width: "100%",
                }}
              >
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                    justifyContent: "space-between",
                    // backgroundColor: "red",
                    paddingHorizontal: 25,
                    ...(this.isTablet() && {
                      marginHorizontal: "1%",
                    }),
                  }}
                >
                  <View style={{ width: "45%", fontSize: 19 }}>
                    <Text
                      style={{
                        fontSize: 19,
                        fontWeight: "bold",
                        ...(this.isTablet() && {
                          fontSize: 28,
                        }),
                      }}
                    >
                      Introducing Packers & Movers
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#B8B8B8",
                        marginBottom: 5,
                        ...(this.isTablet() && {
                          fontSize: 22,
                        }),
                      }}
                    >
                      Great Prices On-time, safe delivery
                    </Text>
                  </View>
                  <Image
                    style={{
                      width: "50%",
                      resizeMode: "cover",

                      ...(this.isTablet() && {
                        width: 300,
                        height: 300,
                      }),
                    }}
                    source={require("../assets/images/pm.png")}
                  />
                </View>

                <View
                  style={{
                    // backgroundColor: "green",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: 5,
                      width: "85%",
                      height: 50,
                      marginHorizontal: "10%",
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: 2,
                      ...(this.isTablet() && {
                        borderWidth: 2,
                        height: 70,
                      }),
                      borderColor: "#EE3855",
                    }}
                    onPress={this.openBottomSheet}
                  >
                    <Text
                      style={{
                        color: "#EE3855",
                        fontSize: 16,
                        ...(this.isTablet() && {
                          fontSize: 23,
                          fontWeight: "400",
                        }),
                      }}
                    >
                      Hire us
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : (
            <Animatable.View
              animation="fadeInUp"
              duration={500}
              style={{ marginVertical: 25, marginHorizontal: 10 }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 25,
                }}
                onPress={this.toggleView}
              >
                <Ionicons
                  name="search-circle-sharp"
                  size={24}
                  color="#EE3855"
                />
                <Text>Search Again</Text>
              </TouchableOpacity>
              <Text style={{ color: "black", fontSize: 14, marginStart: 10 }}>
                {0} Results
              </Text>
              <ScrollView showsVerticalScrollIndicator={false}>
                {/* <FadeLoader />
              <FadeLoader />
              <FadeLoader />
              <FadeLoader /> */}
                <PropertyItem />
                <PropertyItem />
                <PropertyItem />
                <PropertyItem />
                <PropertyItem />
                <PropertyItem />
                <PropertyItem />
                <PropertyItem />
              </ScrollView>
            </Animatable.View>
          )}
        </ScrollView>

        <RBSheet
          ref={this.bottomSheetRef}
          height={Dimensions.get("window").height * 0.4}
          duration={300}
          closeOnDragDown={false}
          closeOnPressMask={true}
          customStyles={{
            container: {
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              borderTopColor: "#EE3855",
              borderTopWidth: 4,
            },
          }}
        >
          <View style={{ alignItems: "center", padding: 15 }}>
            <Text style={{ color: "#000", fontSize: 20, fontWeight: "bold" }}>
              Vehicle category
            </Text>
          </View>
          <ScrollView
            scrollEnabled={true}
            horizontal={true}
            style={{ padding: 15, paddingEnd: 50 }}
          >
            <View
              style={{
                backgroundColor: "#EE3855",
                padding: 20,
                height: 200,
                width: 150,
                borderRadius: 5,
                alignItems: "center",
                marginEnd: 10,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  marginBottom: 3,
                  fontSize: 18,
                }}
              >
                Lite Truck
              </Text>
              <Text style={{ color: "#EDEDED" }}>1,815 kg Max</Text>
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  marginVertical: 5,
                }}
              >
                House holds
              </Text>
              <Image
                style={{ width: 90, height: 50, marginVertical: 10 }}
                source={require("../assets/icons/truck.png")}
              />
            </View>

            <View
              style={{
                backgroundColor: "#EE3855",
                padding: 20,
                height: 200,
                width: 150,
                borderRadius: 5,
                alignItems: "center",
                marginEnd: 10,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  marginBottom: 3,
                  fontSize: 18,
                }}
              >
                Car
              </Text>
              <Text style={{ color: "#EDEDED" }}>1,815 kg Max</Text>
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  marginVertical: 5,
                }}
              >
                lite weights
              </Text>
              <Image
                style={{ width: 90, height: 70, marginVertical: 10 }}
                source={require("../assets/icons/vehicle.png")}
              />
            </View>

            {/* <VehicleType name="Lite Truck" weight = {1890} goods="Households"/>
            <VehicleType name="Car" weight = {1200} goods="Lite Goods"/>
            <VehicleType name="Motor Bike" weight = {600} goods="Small Package"/> */}
          </ScrollView>
        </RBSheet>
      </>
    );
  }
}
const isTablet = () => {
  const { width, height } = Dimensions.get("window");
  const aspectRatio = height / width;
  // Adjust the threshold value as per your requirement
  return aspectRatio <= 1.6;
};

const styles = StyleSheet.create({
  textInput: {},
  search: {
    borderColor: "#707070",
    borderWidth: 0.5,
    borderRadius: 5,
    width: Dimensions.get("window").width - 40,
    height: 44,
    alignItems: "center",
    padding: 10,
    flexDirection: "row",
    marginVertical: 20,
    marginStart: 20,
    marginHorizontal: "20%",
  },
  mainGrid: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  row: {
    flexDirection: "row",
  },
  item: {
    flex: 1,
    height: 35,
    marginRight: 15,
    marginBottom: 15,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    ...(isTablet() && {
      height: 55,
    }),
  },
  br: {
    ...(isTablet() && {
      fontSize: 20,
    }),
  },
});
