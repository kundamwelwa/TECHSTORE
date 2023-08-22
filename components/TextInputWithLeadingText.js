import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const TextInputWithLeadingText = ({
  leadingText,
  leadingTextColor,
  ...textInputProps
}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.leadingText, { color: leadingTextColor }]}>
        {leadingText}
      </Text>
      <TextInput {...textInputProps} style={styles.textInput} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  leadingText: {
    marginRight: 5,
    fontSize: 16,
    fontWeight: "500",
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    paddingStart: 5,
  },
});

export default TextInputWithLeadingText;
