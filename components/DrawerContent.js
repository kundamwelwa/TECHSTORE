import React from "react";
import { StyleSheet, Text, View, Button, Share } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const DrawerContent = (props) => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const customer = useSelector((state) => state.customer);
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };
  const handleShare = async () => {
    try {
      const shareOptions = {
        title: "DOWNLOAD THE PEZABOND BOARDING HOUSE FINDER APP TODAY!!!",
        message:
          "Make your boarding house searching easy and stress free by downloading the pezabond boarding house finder app!. Use the link provided and check out their promotion! \n\nDownload it here: https://www.pezabond.com",
        url: "https://www.pezabond.com", // Replace with your app's actual download link
      };
      const result = await Share.share(shareOptions);

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared successfully
          console.log("Shared successfully");
        } else {
          // Shared cancelled
        }
      } else if (result.action === Share.dismissedAction) {
        // Dismissed
        alert("Tell a friend to tell a friend");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.DrawerContent}>
          <View style={styles.userInfoSection}>
            <View
              style={{
                flexDirection: "row",
                // justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar.Image
                source={{
                  uri: "https://yt3.ggpht.com/a/AATXAJy8V1MJElSp2uunJFtE-ZkCDdFJbBPWXOtB3g=s900-c-k-c0xffffffff-no-rj-mo",
                }}
                size={70}
              />
              <View style={{ flexDirection: "column", marginLeft: 15 }}>
                <Title style={styles.title}>{customer[0].name}</Title>
                <Caption style={styles.caption}>
                  260{"-"}
                  {customer[0].phone_number}
                </Caption>
                <Caption style={styles.caption2}>{customer[0].email}</Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={(color, size) => (
                <Ionicons name="ios-home-outline" size={22} color="black" />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />
            {/* <DrawerItem
              icon={(color, size) => (
                <View style={styles.drawerItem}>
                  <SimpleLineIcons name="bell" color={color} size={22} />
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>3</Text>
                  </View>
                </View>
              )}
              label="Notifications"
              onPress={() => {
                props.navigation.navigate("Notifications");
              }}
            ></DrawerItem> */}

            <DrawerItem
              icon={(color, size) => (
                <Ionicons name="bed-outline" color={color} size={22} />
              )}
              label="My Boarding house"
              onPress={() => {
                props.navigation.navigate("My boarding house");
              }}
            />
            <DrawerItem
              icon={(color, size) => (
                <MaterialCommunityIcons
                  name="home-search-outline"
                  size={22}
                  color={color}
                />
              )}
              label="Find Boarding house"
              onPress={() => {
                props.navigation.navigate("Boardinghouses");
              }}
            />
            <DrawerItem
              icon={(color, size) => (
                <Icon name="share-variant-outline" color={color} size={22} />
              )}
              label="Share App"
              onPress={handleShare}
            />
          </Drawer.Section>
          <Drawer.Section title="Owner Section" style={styles.drawerSection}>
            <DrawerItem
              icon={(color, size) => (
                <MaterialCommunityIcons
                  name="sign-real-estate"
                  size={22}
                  color="black"
                />
              )}
              label="List your property"
              onPress={() => {
                props.navigation.navigate("List boarding house");
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>

      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={(color, size) => (
            <Icon name="exit-to-app" color={color} size={22} />
          )}
          label="Sign Out"
          // onPress={() => {
          //   props.navigation.navigate("Log in");
          // }}
        />
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  DrawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    backgroundColor: "#EE3855",
    height: 130,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
    color: "white",
  },
  caption: {
    fontSize: 12,
    lineHeight: 14,
    color: "white",
  },
  caption2: {
    fontSize: 12,
    lineHeight: 14,
    color: "white",
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
  },
  rdrawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  badge: {
    backgroundColor: "#EE3855",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    position: "absolute",
    top: -2,
    right: -7,
  },
  badgeText: {
    color: "white",
    fontSize: 12,
  },
});

export default DrawerContent;
