import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useRef, useEffect } from "react";
import { List, Modal, Portal, Button } from "react-native-paper";
import * as Animatable from "react-native-animatable";

import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import NotificationComponent from "../components/NotificationComponent";
import { MaterialIcons } from "@expo/vector-icons";

const Notifications = ({ navigation, onAnimationComplete }) => {
  const [foundNotifications, setfoundNotifications] = React.useState(true);
  const [visible, setVisible] = React.useState(false);
  const [animationVisible, setAnimationVisible] = useState(false);
  const animationRef = useRef(null);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const startAnimation = () => {
    setAnimationVisible(true); // Show the animation view
  };

  useEffect(() => {
    // Trigger onAnimationComplete after animation is done
    if (onAnimationComplete) {
      onAnimationComplete();
    }
  }, []);

  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
    height: "60%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.7,
    shadowOffset: {
      height: 3,
      width: 3,
    },
  };
  const nav = useNavigation();
  return (
    <View style={styles.container}>
      {!foundNotifications ? (
        <>
          <Ionicons
            name="md-notifications-off-circle-outline"
            size={80}
            color="#EE3855"
          />
          <Text style={styles.noNotificatioin}>You have no Notification</Text>
          <TouchableOpacity
            onPress={() => nav.navigate("Home")}
            style={{
              height: 50,
              width: "60%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#EE3855",
              borderRadius: 7,
              marginVertical: 30,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "500" }}>
              Go to home
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <ScrollView style={{ flex: 1 }}>
          <View>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "500",
                marginBottom: 30,
                marginStart: 20,
              }}
            >
              Notifications
            </Text>
            <TouchableOpacity onPress={() => showModal()}>
              <NotificationComponent
                Title={
                  "🏡📣 Discover Your Perfect Boarding House with Our App! 📣🏡"
                }
                description={
                  "Looking for hassle-free and affordable boarding options? Look no further! Introducing the ultimate Boarding House Finder App – your key to comfortable living and exciting savings!"
                }
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => showModal()}>
              <NotificationComponent
                Title={"December"}
                description={
                  "📢 Don't miss out on this incredible opportunity to enjoy top-notch boarding facilities without worrying about the cost. Share the app today and embark on a new journey of convenience, comfort, and savings!                  📱 Download Now and Start Sharing the Comfort! 📱"
                }
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => showModal()}>
              <NotificationComponent
                Title={
                  "🎉 Limited-Time Promotion: Share the App, Get Three Months' Boarding Fee FREE! 🎉"
                }
                description={
                  "Look no further Our app is the answer you've been waiting for. With a sleek interface and powerful search features, finding your ideal boarding house has never been easier. And now, sharing the app comes with an amazing bonus – three months of boarding fee completely FREE for each friend who joins through your referral!"
                }
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <ScrollView
            style={{ maxHeight: 600 }} // Set a maximum height for the modal
            contentContainerStyle={{ flexGrow: 1 }} // Allow ScrollView to take up all available space
          >
            <View>
              <Text style={styles.notTitle}>
                🎉 Limited-Time Promotion: Share the App, Get Three Months'
                Boarding Fee FREE! 🎉
              </Text>
              <View style={styles.sideBorder}></View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialIcons name="email" size={14} color="black" />
                <Text style={styles.notAdmin}>
                  Author:
                  <Text style={{ color: "#333", fontSize: 12 }}>
                    {"pezabond@admin.com"}
                  </Text>
                </Text>
              </View>
              <View>
                <Text style={styles.body}>
                  Look no further! Our app is the answer you've been waiting
                  for. With a sleek interface and powerful search features,
                  finding your ideal boarding house has never been easier. And
                  now, sharing the app comes with an amazing bonus – three
                  months of boarding fee completely FREE for each friend who
                  joins through your referral!
                </Text>
                <Text style={styles.instruction}>
                  ✅ Share: Share the app with your friends and family through
                  your unique referral link.
                </Text>
                <Text style={styles.instruction}>
                  ✅ They Join: Your friends download the app and sign up.
                </Text>
                <Text style={styles.instruction}>
                  ✅ You Earn: For each friend who joins, you both get three
                  months of boarding fee absolutely FREE!
                </Text>

                <TouchableOpacity style={styles.link}>
                  <Text
                    style={{
                      color: "#EE3855",
                      textDecorationLine: "underline",
                    }}
                  >
                    📱 Download Now and Start Sharing the Comfort! 📱
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </Modal>
      </Portal>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  noNotificatioin: {
    fontSize: 18,
    fontWeight: "400",
    marginTop: 10,
  },
  notTitle: {
    color: "#000",
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 3,
  },
  sideBorder: {
    height: 1,
    width: "100%",
    backgroundColor: "#ee3855",
    marginRight: 10,
  },
  notAdmin: {
    marginStart: 2,
    color: "#000",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 3,
    marginTop: 2,
  },
  body: {
    marginVertical: 10,
    color: "#000",
  },
  instruction: {
    marginVertical: 5,
  },
  link: {
    marginTop: 30,
    bottom: 0,
    paddingBottom: 5,
  },
});
