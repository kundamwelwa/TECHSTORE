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
import NumericInput from "react-native-numeric-input";
import { useNavigation, useRoute } from "@react-navigation/native";

const PaymentScreen = ({ navigation, onAnimationComplete }) => {
  const route = useRoute();
  const { price } = route.params;

  const [expanded, setExpanded] = React.useState(true);
  const [visible, setVisible] = React.useState(false);
  const [animationVisible, setAnimationVisible] = useState(false);
  const animationRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [AcceptTC, setAcceptTC] = useState(false);
  const [months, setMonths] = React.useState(1);
  const [checkout, setcheckout] = React.useState(price);
  const [total, setTotal] = React.useState(checkout);

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
          Checkout
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
              width: "57%",
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
              selectionColor="#EE3855" // Change this color
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

        <View style={{ marginStart: 15, marginTop: 20 }}>
          <Text style={{ color: "#000", fontWeight: "500" }}>
            How many months are you paying for?
          </Text>
          <View
            style={{
              marginVertical: 15,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <NumericInput
              value={months}
              onChange={(value) => {
                setMonths(value);
                if (value >= 3) {
                  console.log("max reached");
                }
              }}
              maxValue={3}
              minValue={1}
              totalWidth={120}
              totalHeight={40}
              rounded
              step={1}
              valueType="integer"
              iconStyle={{
                color: "#EE3855",
              }}
            />
            <View style={styles.sideBorder}></View>
            <View
              style={{
                flexDirection: "row",
                marginEnd: 30,
                padding: 5,
                paddingHorizontal: 10,
                borderRadius: 6,
                backgroundColor: "#EE3855",
              }}
            >
              <Text
                style={{
                  fontWeight: "500",
                  color: "#fff",
                  fontSize: 20,
                  marginEnd: 10,
                }}
              >
                ZMW
              </Text>
              <Text style={{ fontWeight: "500", color: "#fff", fontSize: 20 }}>
                {checkout * months}
              </Text>
            </View>
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
              disabled={!AcceptTC}
            />
            <List.Item
              title="AIRTEL Money"
              description="Pay using airtel money"
              onPress={() => showModal()}
              disabled={!AcceptTC}
            />
          </List.Accordion>
        </List.Section>
        {!AcceptTC && (
          <View>
            <Text style={{ color: "red", marginStart: 10 }}>
              Oops! Accept Terms of use to proceed to pay
            </Text>
          </View>
        )}
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
            fillColor="#ee3855"
            unfillColor="#FFFFFF"
            text="Accept Terms of use"
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

const styles = StyleSheet.create({
  sideBorder: {
    height: "100%",
    width: 1,
    backgroundColor: "#ee3855",
    marginRight: 10,
  },
});
