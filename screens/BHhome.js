import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import React from "react";
import Lottie from "lottie-react-native";

import { SelectList } from "react-native-dropdown-select-list";
import NumericInput from "react-native-numeric-input";
import BHCard from "../components/BHCard";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";

const BHhoom = ({ navigation }) => {
  const [institution, setSelected] = React.useState("");
  const [bedspaces, setBedspaces] = React.useState(1);
  const [viewLoading, setViewLoading] = React.useState(false);
  const [gender, setGender] = React.useState(0);
  const [bhgender, setbhGender] = React.useState("Male");
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

  const isTablet = () => {
    const { width, height } = Dimensions.get("window");
    const aspectRatio = height / width;
    // Adjust the threshold value as per your requirement
    return aspectRatio <= 1.6;
  };

  const goToResultsScreen = () => {
    if (institution == "") {
      Alert.alert(
        "Mandatory field empty",
        "Select an instituion from the drop down selection"
      );
    } else {
      setViewLoading(true);
      // console.log(institution, " ", bedspaces, " ", bhgender);
      setTimeout(() => {
        navigation.navigate("Results", { institution, bedspaces, bhgender });
        setViewLoading(false);
      }, 3000); // wait for 3 seconds (300 milliseconds) before navigating
    }
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      bounces={true}
      style={{
        paddingHorizontal: 10,
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
              Our system will suggest the nearest within your institution radius
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
              fontSize: 14,
              color: "black",
              fontWeight: "bold",
              marginBottom: 5,
              ...(isTablet() && { fontSize: 22, fontWeight: "700" }),
            }}
          >
            Institution
          </Text>
          <View
            style={{
              marginVertical: 10,
              ...(isTablet() && { marginEnd: "40%" }),
            }}
          >
            <SelectList
              setSelected={(val) => setSelected(val)}
              data={institutions}
              save="value"
              totalHeight={20}
              style={{
                ...(isTablet() && { fontSize: 16, fontWeight: "700" }),
              }}
            />
          </View>
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
              marginBottom: 10,
              ...(isTablet() && {
                height: 60,
                marginStart: 0,
                width: "60%",
              }),
            }}
            //   onPress={(prev) => setViewLoading(true); goToDetailsScreen }
            onPress={goToResultsScreen}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                ...(isTablet() && { fontSize: 22, fontWeight: "400" }),
              }}
            >
              Locate Boarding House
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
              source={require("../assets/animations/loading3.json")}
              autoPlay
              loop
              style={{
                position: "relative",
                width: "30%",
                justifyContent: "space-evenly",
                alignContent: "center",
                marginBottom: -15,
                marginTop: -10,
              }}
            />
          ) : (
            <Lottie
              source={require("../assets/animations/loading3.json")}
              autoPlay
              loop
              style={{
                position: "relative",
                width: "30%",
                justifyContent: "space-evenly",
                alignContent: "center",
                marginBottom: -17,
                marginTop: -10,
              }}
            />
          )}
          <Text
            style={{
              color: "black",
              fontSize: 14,
              fontWeight: "400",
              marginBottom: 10,
              ...(isTablet() && { fontSize: 30, fontWeight: "700" }),
            }}
          >
            Locating...
          </Text>
        </View>
      ) : null}

      <Text
        style={{
          fontSize: 14,
          fontWeight: "bold",
          marginTop: 10,
          marginStart: 10,
          marginVertical: 10,
          ...(isTablet() && { fontSize: 22, fontWeight: "700" }),
        }}
      >
        Near you
      </Text>

      <Lottie
        source={require("../assets/animations/bar.json")}
        autoPlay
        loop
        style={{
          position: "relative",
          width: 2000,
          height: 3,
          marginStart: 4,
        }}
      />

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
        <BHCard price={1000} rating={4} address={"45 kalewa"} distance={120} />
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
    </ScrollView>
  );
};

export default BHhoom;

const styles = StyleSheet.create({});
