import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "../ENVIRONMENTS";

const PlacesAutocompleteScreen = () => {
  return (
    <View>
      <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        onPress={(data, details = null) => {
          // Handle selected place data here
          console.log(data);
          console.log(details);
        }}
        query={{
          key: GOOGLE_API_KEY,
          language: "en", // Change this to your desired language
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default PlacesAutocompleteScreen;
