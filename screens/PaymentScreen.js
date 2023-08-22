import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { List, Modal, Portal, Button } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import PaymentSuccessAnimation from "./../components/PaymentSuccessAnimation";
import TextInputWithLeadingText from "../components/TextInputWithLeadingText";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const PaymentScreen = ({ navigation, onAnimationComplete }) => {
  const [expanded, setExpanded] = React.useState(true);
  const [visible, setVisible] = React.useState(false);
  const [animationVisible, setAnimationVisible] = useState(false);
  const animationRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [AcceptTC, setAcceptTC] = useState(false);

  const changeTC = (value) => {
    setAcceptTC(value);
  };
  const startAnimation = () => {
    setAnimationVisible(true); // Show the animation view
  };

  useEffect(() => {
    // Trigger onAnimationComplete after animation is done
    if (onAnimationComplete) {
      onAnimationComplete();
    }
  }, []);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 40,
    height: 300,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.7,
    shadowOffset: {
      height: 3,
      width: 3,
    },
  };

  const handlePress = () => setExpanded(!expanded);
  return (
    <View style={{ padding: 5, backgroundColor: "#fff", flex: 1 }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          margin: 5,
          padding: 5,
          backgroundColor: "rgba(0,0,0,0.2)",
          width: 40,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
        }}
      >
        <Ionicons name="chevron-back" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={{ width: "100%" }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#000",
            textAlign: "center",
          }}
        >
          Payment Options
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <View
          style={{
            width: "100%",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              marginTop: 30,
              color: "gray",
            }}
          >
            Do you have a discount code?
          </Text>

          <View
            style={{
              height: 45,
              width: "70%",
              justifyContent: "space-between",
              flexDirection: "row",
              borderRadius: 50,
              elevation: 7,
              shadowColor: "#000",
              shadowOffset: {
                width: 0.3,
                height: 1,
              },
              shadowOpacity: 0.2,
              backgroundColor: "#fff",
              alignItems: "center",
              marginVertical: 10,
              paddingStart: 10,
            }}
          >
            <TextInput
              placeholder="discount code"
              maxLength={6}
              style={{
                fontSize: 16,
                marginStart: 10,
                fontWeight: "500",
                color: "#a8a8a8",
                fontStyle: "italic",
              }}
            />

            <TouchableOpacity
              style={{
                borderRadius: 50,
                height: "100%",
                width: 100,
                backgroundColor: "#EE3855",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  color: "#a8a8a8",
                  color: "#fff",
                }}
              >
                Apply
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <List.Section title="Payment Options">
          <List.Accordion
            title="Mobile Money"
            left={(props) => (
              <List.Icon {...props} icon="phone" color={"black"} />
            )}
            titleStyle={{
              color: "black",
            }}
            style={{
              backgroundColo: "rgba(23, 0, 0, .32)",
            }}
            rippleColor="rgba(0, 0, 0, .32)"
          >
            <List.Item
              title="MTN MoMo"
              description="Pay using MTN money"
              onPress={() => showModal()}
            />
            <List.Item
              title="AIRTEL Money"
              description="Pay using airtel money"
              onPress={() => showModal()}
            />
          </List.Accordion>
        </List.Section>
        <View
          style={{
            backgroundColor: "white",
            padding: 10,
            marginVertical: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "800",
              color: "#000",
              marginBottom: 10,
            }}
          >
            Terms & Conditions
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 2,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "400",
                color: "#000",
                marginEnd: 10,
                lineHeight: 18,
              }}
            >
              The terms and conditions for using the PezaBond Boarding House
              Finder App outline user responsibilities, intellectual property
              rights, privacy policies, disclaimers, limitations of liability,
              and governing laws, ensuring that users agree to abide by the
              specified guidelines and legal aspects before utilizing the app's
              services do you accept the terms and conditions of using the
              application.
            </Text>
          </View>
          <BouncyCheckbox
            size={18}
            fillColor="#EE3855"
            unfillColor="#FFFFFF"
            text="Accept"
            iconInnerStyle={{ borderWidth: 1 }}
            onPress={(isChecked: boolean) => changeTC(isChecked)}
            style={{ marginVertical: 15 }}
          />
        </View>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            {animationVisible && (
              <Animatable.View animation="bounceIn" iterationCount={1}>
                <PaymentSuccessAnimation />
              </Animatable.View>
            )}
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 14,
                  color: "gray",
                  marginBottom: 30,
                  justifyContent: "center",
                  marginTop: 20,
                }}
              >
                Enter your mobile money number and complete payment by entering
                your pin.
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <TextInputWithLeadingText
                leadingText="+260"
                placeholder="Enter Mobile number"
                keyboardType="numeric"
                textContentType="telephoneNumber"
                fontSize={18}
                textAlign="left"
                maxLength={9}
                leadingTextColor="#EE3855" // Change this color
                selectionColor="#EE3855" // Change this color
              />
            </View>
            <TouchableOpacity
              onPress={startAnimation}
              style={{
                height: 50,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#EE3855",
                borderRadius: 7,
                marginVertical: 30,
              }}
            >
              <Text style={{ color: "#fff", fontSize: 18, fontWeight: "500" }}>
                Pay Now
              </Text>
            </TouchableOpacity>
          </Modal>
        </Portal>
      </ScrollView>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({});
