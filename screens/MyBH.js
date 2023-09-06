import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import DaysBetweenDates from "../components/DaysBetweenDates";
const MyBH = ({ navigation }) => {
  const getCurrentMonthDays = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // Get the number of days in the current month

    const daysArray = [];
    for (let day = 1; day <= daysInMonth; day++) {
      daysArray.push(day);
    }

    return daysArray;
  };

  const currentMonthDays = getCurrentMonthDays();

  const [foundBH, setfoundBH] = React.useState(true);
  return (
    <View style={styles.container}>
      {!foundBH ? (
        <View style={styles.container2}>
          <Image
            source={require("../assets/icons/house_cancel.png")}
            style={{ width: 100, height: 100, marginVertical: 10 }}
          />
          <Text style={styles.noNotificatioin}>
            You haven't rented any Boarding house
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Boardinghouses")}
            style={{
              height: 50,
              width: "60%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#EE3855",
              borderRadius: 7,
              marginVertical: 30,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "500" }}>
              Rent Now
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={styles.nameOfBH}>Angel boarding houses</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                padding: 10,
                borderRadius: 60,
                backgroundColor: "#ee3855",
                width: 40,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                marginEnd: 10,
                marginTop: 10,
              }}
            >
              <MaterialIcons name="house" size={20} color="white" />
            </View>

            <View
              style={{
                marginStart: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#000",
                  fontWeight: "600",
                }}
              >
                Address
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  marginTop: 2,
                  color: "#8e8e8e",
                }}
              >
                24 Kalewa Road
              </Text>
            </View>
          </View>
          <View style={styles.sideBorder}></View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginEnd: 5,
              paddingHorizontal: 5,
              flexDirection: "row",
              paddingBottom: 10,
            }}
          >
            <View>
              <Text style={{ fontSize: 12, fontWeight: "400" }}>
                Date Rented: {"10th Dec, 2023 "}
              </Text>

              <Text style={{ fontSize: 14, fontWeight: "500" }}>
                Room #: {12}{" "}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginStart: 5,
                marginVertical: 15,
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontSize: 30, fontWeight: "bold", color: "#ee3855" }}
              >
                K {650}
              </Text>
              <Text style={{ color: "#ee3855", fontSize: 16 }}> / month</Text>
            </View>
          </View>

          <View
            style={{
              justifyContent: "space-between",
              marginEnd: 10,
              paddingHorizontal: 10,
              flexDirection: "row",
              paddingBottom: 30,
              marginTop: 10,
            }}
          >
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons name="bed" size={25} color="#bdbdbd" />
                <Text
                  style={{
                    color: "#bdbdbd",
                    fontWeight: "800",
                    fontSize: 24,
                    marginStart: 10,
                  }}
                >
                  {2}
                </Text>
              </View>

              <Text
                style={{
                  color: "#bdbdbd",
                }}
              >
                Bed Spaces
              </Text>
            </View>
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="countertop"
                  size={25}
                  color="#bdbdbd"
                />
                <Text
                  style={{
                    color: "#bdbdbd",
                    fontWeight: "800",
                    fontSize: 24,
                    marginStart: 10,
                  }}
                >
                  {1}
                </Text>
              </View>

              <Text
                style={{
                  color: "#bdbdbd",
                }}
              >
                Tables
              </Text>
            </View>
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="locker-multiple"
                  size={25}
                  color="#bdbdbd"
                />
                <Text
                  style={{
                    color: "#bdbdbd",
                    fontWeight: "800",
                    fontSize: 24,
                    marginStart: 10,
                  }}
                >
                  2
                </Text>
              </View>

              <Text
                style={{
                  color: "#bdbdbd",
                }}
              >
                lockers
              </Text>
            </View>
          </View>

          <DaysBetweenDates startDate="2023-08-29" endDate="2023-12-06" />
        </View>
      )}
    </View>
  );
};

export default MyBH;

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  nameOfBH: {
    fontSize: 22,
    fontWeight: "800",
    marginVertical: 15,
  },
  sideBorder: {
    height: 0.5,
    width: "100%",
    backgroundColor: "#ee3855",
    marginRight: 10,
    marginVertical: 10,
  },
});
