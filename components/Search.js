import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "../ENVIRONMENTS";
const Search = () => {
  return (
    <View>
      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={(data, details = null) => {
          // 'data' contains information about the selected place
          // 'details' contains more detailed information about the place
          console.log(details.geometry.location);
        }}
        query={{
          key: GOOGLE_API_KEY,
          language: "en", // You can set the language for the results
          components: "country:zm",
          types: "(regions)", // You can set the types of results to be displayed (e.g., 'address', 'geocode', etc.)
        }}
        styles={{ marginVertical: 40 }}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
