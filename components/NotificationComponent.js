import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const NotificationComponent = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.notContainer}>
        <View style={styles.sideBorder}></View>
        <View style={styles.notTitleandDesc}>
          <Text style={styles.notTitle}>{props.Title}</Text>
          <Text style={styles.notDescription}>{props.description}</Text>
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
