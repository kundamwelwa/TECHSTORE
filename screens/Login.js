import {
  StyleSheet,
  Text,
  Button,
  View,
  SafeAreaView,
  Image,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, Component } from "react";
import { Ionicons, Entypo } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      password: "",
    };
  }

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <Animatable.Image
          animation="zoomIn"
          duration={1500}
          source={require("../assets/icons/pezabongofficial.png")}
          resizeMode="contain"
          style={{ width: "100%", height: 80, marginBottom: 30 }}
        />
        <Animatable.Text
          animation="fadeInDown"
          duration={1500}
          style={{
            fontWeight: "700",
            fontSize: 22,
            letterSpacing: 1,
            color: "#000",
            marginVertical: 10,
            marginBottom: 20,
          }}
        >
          Login
        </Animatable.Text>
        <Animatable.View
          animation="fadeInUp"
          duration={1500}
          style={{ width: "100%" }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.line}></View>
            <Entypo
              name="phone"
              size={20}
              color="black"
              style={{ marginHorizontal: 5 }}
            />
            <Text style={{ marginLeft: 5 }}>+260</Text>
            <TextInput
              placeholder="Enter your mobile number"
              fontSize={16}
              maxLength={9}
              marginHorizontal={10}
              returnKeyType="done"
              keyboardType="phone-pad"
              onChangeText={(phone) => this.setState({ phone })}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <View style={styles.line}></View>

            <Entypo
              name="lock"
              size={20}
              color="black"
              style={{ marginHorizontal: 5 }}
            />

            <TextInput
              placeholder="Password"
              fontSize={16}
              marginHorizontal={10}
              maxLength={8}
              returnKeyType="done"
              autoCapitalize="none"
              keyboardType="default"
              secureTextEntry={true}
              width={100}
              onChangeText={(password) => this.setState({ password })}
            />
          </View>

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 40,
            }}
          >
            <TouchableOpacity
              style={styles.signInBtn}
              onPress={() => {
                if (this.state.phone.trim() == "") {
                  alert("phone number field is empty");
                } else if (this.state.password.trim() == "") {
                  alert("password field can't be empty");
                } else {
                  navigation.navigate("OTP", { phoneData: this.state.phone });
                }
              }}
            >
              <Text style={{ fontWeight: "600", fontSize: 18, color: "#fff" }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 30,
            }}
          >
            <TouchableOpacity
              style={styles.toSignUp}
              onPress={() => navigation.navigate("Sign up")}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: "#000",
                }}
              >
                Dont have an account?
              </Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  line: {
    marginVertical: 10,
    height: 25,
    width: 1,
    backgroundColor: "#000",
  },
  signInBtn: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#eded",
    // marginHorizontal: 30,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EE3855",
  },
  toSignUp: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Login;
