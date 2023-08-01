// OTPDigitInput.js
import React, { useRef, useEffect } from "react";
import { TextInput, StyleSheet } from "react-native";

const OTPDigitInput = React.forwardRef(
  ({ value, focusNext, focusPrev, onInputChange }, ref) => {
    const inputRef = useRef();

    useEffect(() => {
      if (value === "") {
        inputRef.current.focus();
      }
    }, [value]);

    React.useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current.focus();
      },
    }));

    return (
      <TextInput
        ref={inputRef}
        style={[styles.otpDigit, { color: "#EE3855" }]}
        keyboardType="numeric"
        maxLength={1}
        value={value}
        onChangeText={(text) => {
          onInputChange(text);
          if (text !== "") {
            focusNext();
          }
        }}
        onKeyPress={({ nativeEvent }) => {
          if (nativeEvent.key === "Backspace") {
            focusPrev();
          }
        }}
      />
    );
  }
);

const styles = StyleSheet.create({
  otpDigit: {
    borderColor: "#EE3855",
    borderWidth: 2,
    borderRadius: 5,
    fontSize: 20,
    padding: 10,
    width: 40,
    textAlign: "center",
    marginRight: 10,
  },
});

export default OTPDigitInput;
