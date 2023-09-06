import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const TextViewWithLimit = ({ text, wordLimit }) => {
  // Split the text into words
  const words = text.split(" ");

  // Slice the words array to get the limited number of words
  const limitedWords = words.slice(0, wordLimit);

  // Join the limited words back into a single string
  const limitedText = limitedWords.join(" ");

  return (
    <View>
      <Text>{limitedText}</Text>
    </View>
  );
};
const NotificationComponent = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.notContainer}>
        <View style={styles.sideBorder}></View>
        <View style={styles.notTitleandDesc}>
          <Text style={styles.notTitle}>{props.Title}</Text>
          <TextViewWithLimit
            style={styles.notDescription}
            text={props.description}
            wordLimit={25}
          />
        </View>
      </View>
    </View>
  );
};

export default NotificationComponent;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderTopColor: "#e4e4e4",
    borderBottomColor: "#e4e4e4",
    borderEndColor: "#000",
    borderStartColor: "rgba(0,0,0,0.0)",
    paddingVertical: 10,
  },
  sideBorder: {
    height: "100%",
    width: 3,
    backgroundColor: "#ee3855",
    marginRight: 10,
  },
  notContainer: {
    flexDirection: "row",
    marginRight: 20,
  },
  notTitle: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 3,
  },
});
