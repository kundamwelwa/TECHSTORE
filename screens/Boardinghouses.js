import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Dimensions,
  ImageBackground,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import BHCard from "../components/BHCard";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
  Foundation,
  Feather,
} from "@expo/vector-icons";
import RBSheet from "react-native-raw-bottom-sheet";
import NumericInput from "react-native-numeric-input";
import RadioForm from "react-native-simple-radio-button";
import { Button } from "react-native-paper";
import BHListCard from "../components/BHListCard";
import * as Animatable from "react-native-animatable";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome"; // Import the icon library you're using
import { StatusBar } from "expo-status-bar";

const Boardinghouses = ({ navigation }) => {
  // dummy data
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://www.pezabond.com/pezabondfiles/fetchAllRooms.php"
      );
      const data = await response.json();
      setData(data);
      setFilteredData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleFilterData = (text) => {
    setSearchText(text);
    const filtered = data.filter(
      (item) =>
        item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.street.toLowerCase().includes(text.toLowerCase()) ||
        item.sex.toLowerCase().includes(text.toLowerCase()) ||
        item.city.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const onClearInput = () => {
    setSearchText(""); // Clear the input text
    setFilteredData(data); // Reset the filtered data to show all items
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  // end here
  const refRBSheet = useRef();
  const [bedspaces, setBedspaces] = React.useState(1);
  const [gender, setGender] = React.useState(0);
  const [bhgender, setbhGender] = React.useState("Male");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleFilter = () => {
    if (parseFloat(minPrice) >= parseFloat(maxPrice)) {
      Alert.alert("Price Range Error", "Invalid Price Range");
    } else {
      closeBottomSheet();
    }
  };

  const bh_gender = [
    { label: "Male", value: 0 },
    { label: "Female", value: 1 },
  ];

  const openBottomSheet = () => {
    refRBSheet.current.open();
  };

  const closeBottomSheet = () => {
    refRBSheet.current.close();
  };
  return (
    <View style={styles.container}>
      <StatusBar style="dark-content" />

      <Animatable.View
        animation={"fadeInLeft"}
        duration={800}
        style={{ flexDirection: "row", marginBottom: 20 }}
      >
        <View style={styles.sideBorder}></View>
        <View>
          <Text style={{ fontSize: 20, fontWeight: "700" }}>
            Find your home
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            away from home
          </Text>
        </View>
      </Animatable.View>

      <View
        style={{
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={openBottomSheet}>
          <Ionicons name="filter" size={24} color="#EE3855" />
        </TouchableOpacity>
        <View style={styles.searchBox}>
          <TextInput
            placeholder="search by street, city, gender or bh name"
            clearButtonMode="always"
            autoCapitalize="none"
            fontSize={13}
            style={{ width: "90%" }}
            selectionColor="#EE3855" // Change this color
            value={searchText}
            onChangeText={handleFilterData}
          />
          {searchText !== "" && (
            <TouchableOpacity onPress={onClearInput}>
              <MaterialIcons name="cancel" size={24} color="#EE3855" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          marginTop: 10,
          marginBottom: 5,
        }}
      >
        Search Results
      </Text>
      <View
        style={{
          height: 1,
          width: 45,
          marginBottom: 5,
          backgroundColor: "#dedede",
        }}
      ></View>

      {loading ? (
        <ActivityIndicator size="large" color="#EE3855" />
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <BHListCard
                name={item.name}
                street={item.street}
                sex={item.sex}
                bed_spaces={item.bed_spaces}
                price={item.amount_per_month}
                rating={item.rating}
                id={item.id}
              />
            </View>
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#EE3855"]} // Customize the loading indicator color
              tintColor="#EE3855" // Customize the loading indicator color
            />
          }
        />
      )}
      <RBSheet
        ref={refRBSheet}
        height={Dimensions.get("window").height * 0.5}
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
        <ScrollView style={{ padding: 15, paddingTop: 20 }}>
          <Text style={{ color: "black", fontSize: 22 }}>
            Filter your Search
          </Text>
          <View
            style={{
              width: "30%",
              height: 1,
              marginTop: 3,
              marginBottom: 20,
              backgroundColor: "#ccc",
            }}
          ></View>
          <View style={{ marginTop: 5 }}>
            <Text
              style={{
                fontSize: 15,
                color: "black",
                fontWeight: "bold",
                marginBottom: 5,
              }}
            >
              Boarding house type by gender
            </Text>
          </View>
          <View style={{}}>
            <View
              style={{
                marginStart: 10,
                marginVertical: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: "black",
                  fontWeight: "500",
                  marginBottom: 5,
                  marginEnd: 20,
                }}
              >
                Gender
              </Text>
              <View
                style={{
                  marginVertical: 5,
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
                  }}
                />
              </View>
            </View>
            <View
              style={{
                marginVertical: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: "black",
                  fontWeight: "500",
                  marginBottom: 5,
                  marginEnd: 10,
                }}
              >
                Bed-spaces per room
              </Text>
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
                }}
              />
            </View>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  color: "black",
                  fontWeight: "bold",
                  marginBottom: 10,
                  marginEnd: 10,
                }}
              >
                Price per month
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TextInput
                  placeholder="(ZMW) Min Price"
                  keyboardType="numeric"
                  value={minPrice}
                  fontSize={16}
                  onChangeText={(text) => setMinPrice(text)}
                  style={{
                    borderBottomWidth: 1,
                    borderColor: "#ccc",
                    borderWidth: 2,
                    padding: 5,
                    width: 150,
                    paddingStart: 10,
                  }}
                />
                <Text style={{ fontWeight: "bold", marginHorizontal: 10 }}>
                  {" "}
                  -{" "}
                </Text>
                <TextInput
                  placeholder="(ZMW) Max Price"
                  keyboardType="numeric"
                  value={maxPrice}
                  fontSize={16}
                  onChangeText={(text) => setMaxPrice(text)}
                  style={{
                    borderBottomWidth: 1,
                    marginRight: 10,
                    borderColor: "#ccc",
                    borderWidth: 2,
                    padding: 5,
                    width: 150,
                    paddingStart: 10,
                  }}
                />
              </View>
              <TouchableOpacity
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 30,
                  paddingVertical: 20,
                  backgroundColor: "#EE3855",
                  borderRadius: 8,
                }}
                onPress={handleFilter}
              >
                <Text
                  style={{ color: "#fff", fontSize: 16, fontWeight: "500" }}
                >
                  Apply Filter
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </RBSheet>
    </View>
  );
};

export default Boardinghouses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  searchBox: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 10,
    marginStart: 5,
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sideBorder: {
    height: "100%",
    width: 3,
    backgroundColor: "#ee3855",
    marginRight: 10,
  },
});
