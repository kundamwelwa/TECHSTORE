import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import { GOOGLE_API_KEY } from "../ENVIRONMENTS";

const NearbyColleges = () => {
  const [colleges, setColleges] = useState([]);

  // Function to get device's current location and fetch colleges
  const fetchCollegesNearby = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const apiKey = GOOGLE_API_KEY;
      const radius = 20000; // Search within a 5 km radius (you can adjust this as needed)
      const types = "university"; // You can use other types like 'college', 'school', etc.

      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.coords.latitude},${location.coords.longitude}&radius=${radius}&type=${types}&key=${apiKey}`
      );

      setColleges(response.data.results);
      console.log(location.coords);
    } catch (error) {
      console.log("Error fetching colleges: ", error);
    }
  };

  useEffect(() => {
    fetchCollegesNearby();
  }, []);

  return (
    <View>
      <Text>Nearby Colleges and Universities:</Text>
      {colleges.map((college, index) => (
        <Text key={index}>{college.name}</Text>
      ))}
    </View>
  );
};

export default NearbyColleges;
