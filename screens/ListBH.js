import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { TextInput, Button } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Animatable from "react-native-animatable";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
const ListBH = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    getPermission();
  }, []);

  const getPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
    });

    const newImages = result.assets.map((asset) => asset.uri);
    setImages([...images, ...newImages]);
  };

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    latitude: "",
    longitude: "",
    price: "",
    description: "",
    bedsPerRoom: "",
    tablesAndLockers: "",
    contactNumber: "",
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    // Perform form submission or data storage here
    console.log(formData);
    // Reset the form
    setFormData({
      name: "",
      address: "",
      latitude: "",
      longitude: "",
      price: "",
      description: "",
      bedsPerRoom: "",
      tablesAndLockers: "",
      contactNumber: "",
    });
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        enableOnAndroid
      >
        <Animatable.View
          animation={"fadeInLeft"}
          duration={800}
          style={{ flexDirection: "row", marginBottom: 20 }}
        >
          <View style={styles.sideBorder}></View>
          <View>
            <Text style={{ fontSize: 20, fontWeight: "700" }}>
              Fill in the form to list
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "500" }}>
              your boarding house
            </Text>
          </View>
        </Animatable.View>

        <TextInput
          label="Boarding House Name"
          value={formData.name}
          onChangeText={(text) => handleInputChange("name", text)}
          theme={{
            colors: {
              primary: "#333",
              accent: "red",
              background: "#333",
              underlineColor: "transparent",
              tertiary: "#333",
            },
            fonts: {
              regular: {
                // Customize the font style
                fontSize: 16, // Adjust the font size
                color: "#333", // Change the font color
              },
            },
          }}
          style={styles.input}
        />
        <TextInput
          label="Address"
          value={formData.address}
          textContentType={"addressCityAndState"}
          onChangeText={(text) => handleInputChange("address", text)}
          theme={{
            colors: {
              primary: "#333",
              accent: "#333",
              background: "#333",
              underlineColor: "transparent",
              tertiary: "#333",
            },
            fonts: {
              regular: {
                // Customize the font style
                fontSize: 16, // Adjust the font size
                color: "#333", // Change the font color
              },
            },
          }}
          style={styles.input}
        />

        <TextInput
          label="Contact"
          value={formData.contactNumber}
          keyboardType={"phone-pad"}
          textContentType={"telephoneNumber"}
          onChangeText={(text) => handleInputChange("contactNumber", text)}
          theme={{
            colors: {
              primary: "#ee3855",
              accent: "#333",
              background: "#333",
              underlineColor: "transparent",
              tertiary: "#333",
            },
            fonts: {
              regular: {
                // Customize the font style
                fontSize: 16, // Adjust the font size
                color: "#333", // Change the font color
              },
            },
          }}
          style={styles.input}
        />
        <TextInput
          label="Briefly describe the boarding house"
          value={formData.description}
          onChangeText={(text) => handleInputChange("description", text)}
          theme={{
            colors: {
              primary: "#333",
              accent: "red",
              background: "#333",
              underlineColor: "transparent",
              tertiary: "#333",
            },
            fonts: {
              regular: {
                // Customize the font style
                fontSize: 16, // Adjust the font size
                color: "#333", // Change the font color
              },
            },
          }}
          style={styles.input}
          multiline
          height={150}
        />
      </KeyboardAwareScrollView>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 50,
          marginHorizontal: 10,
        }}
      >
        {true && (
          <TouchableOpacity style={styles.nextAndPrev}>
            <Ionicons name="chevron-back" size={20} color="#fff" />
            <Text style={styles.inButtonText}>Prev</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.nextAndPrev}>
          <Text style={styles.inButtonText}>Next</Text>
          <Ionicons name="ios-chevron-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ListBH;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    paddingHorizontal: 10,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
  sideBorder: {
    height: "100%",
    width: 3,
    backgroundColor: "#ee3855",
    marginRight: 10,
  },
  input: {
    backgroundColor: "rgba(229, 229, 229,0.2)",
    marginTop: 20,
    width: "100%",
  },
  nextAndPrev: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: "#ee3558",
  },
  inButtonText: {
    color: "#fff",
  },
});
