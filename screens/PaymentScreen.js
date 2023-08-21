import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { List, Modal, Portal, Button } from "react-native-paper";
const PaymentScreen = ({ navigation }) => {
  const [expanded, setExpanded] = React.useState(true);
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "white",
    padding: 10,
    marginHorizontal: 40,
    height: 300,
    borderRadius: 3,
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
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <Text>Example Modal. Click outside this area to dismiss.</Text>
          </Modal>
        </Portal>
      </ScrollView>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({});
