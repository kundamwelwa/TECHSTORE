import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const VehicleType = ({ props }) => {
  return (
    <View
    style={{
      backgroundColor: "#EE3855",
      padding: 20,
      height: 200,
      width: 150,
      borderRadius: 5,
      alignItems: "center",
      marginEnd: 20,
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
      Truck
    </Text>
    <Text style={{ color: "#EDEDED" }}> 1234 kg Max</Text>
    <Text
      style={{
        color: "white",
        fontWeight: "bold",
        textTransform: "capitalize",
        marginVertical: 5,
      }}
    >
      house holds
    </Text>
    <Image
      style={{ width: 70, height: 55, marginVertical: 10 }}
      source={require("../assets/icons/bike.png")}
    />
  </View>
  )
}

export default VehicleType

const styles = StyleSheet.create({})