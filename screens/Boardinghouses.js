import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import BHCard from "../components/BHCard";

const Boardinghouses = () => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          marginTop: 10,
          marginTop: 10,
          marginBottom: 5,
        }}
      >
        Watch List
      </Text>

      <View
        style={{
          height: 1,
          width: 45,
          backgroundColor: "#dedede",
        }}
      ></View>

      <Text style={{ marginStart: 10, marginVertical: 10, color: "#333" }}>
        All your watched searches will appear Here
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          marginTop: 10,
          marginTop: 10,
          marginBottom: 5,
        }}
      >
        Near you
      </Text>

      <View
        style={{
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
    </View>
  );
};

export default Boardinghouses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
});
