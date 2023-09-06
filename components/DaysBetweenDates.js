import React, { useEffect, useRef } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
export default function DaysBetweenDates({ startDate, endDate }) {
  const getDaysBetweenDates = (start, end) => {
    const daysArray = [];
    let currentDate = new Date(start);
    const today = new Date();

    while (currentDate <= end) {
      daysArray.push({
        date: new Date(currentDate),
        isPast: currentDate < today, // Check if the date is in the past
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return daysArray;
  };

  const daysInRange = getDaysBetweenDates(
    new Date(startDate),
    new Date(endDate)
  );

  const getDayStyle = (isPast) => {
    if (isPast) {
      return styles.pastDayItem; // Apply a different style for past dates
    }
    return styles.dayItem;
  };
  const endMonth = daysInRange[daysInRange.length - 1].date.toLocaleString(
    "default",
    { month: "long" }
  );
  const getCurrentMonth = () => {
    const currentDate = new Date();
    const options = { month: "long" };
    return currentDate.toLocaleDateString("en-US", options);
  };
  const scrollViewRef = useRef(null);

  useEffect(() => {
    // Find the index of the current date in daysInRange
    const currentDateIndex = daysInRange.findIndex((day) => {
      const today = new Date();
      return day.date.getDate() === today.getDate() && day.date.getMonth() === today.getMonth();
    });

    // Calculate the xOffset to center the current date
    const xOffset = currentDateIndex * 50 - 150; // Assuming each dayItem has a width of 40 and margin of 5

    // Scroll to the xOffset to center the current date
    scrollViewRef.current.scrollTo({ x: xOffset, animated: true });
  }, []);
  

  return (
    <View style={styles.container}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
      >
        <Feather name="calendar" size={24} color="black" />
        <Text style={styles.title}>Rental Calender</Text>
      </View>

      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
      >
        <Text style={styles.currentMonth}>
          {getCurrentMonth()}
          <Text style={{ color: "#EE3855" }}>{"  -"}</Text>
        </Text>
        <Text style={styles.currentMonth}>{endMonth}</Text>
      </View>

      <ScrollView
       ref={scrollViewRef}
        horizontal={true}
        contentContainerStyle={styles.monthsContainer}
      >
        {daysInRange.map((day, index) => (
          <View key={index} style={getDayStyle(day.isPast)}>
            <Text style={{ color: "#fff" }}>{day.date.getDate()}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginStart: 5,
  },
  monthsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
  },
  dayItem: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "lightgray",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  pastDayItem: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EE3855", // Different color for past dates
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  currentMonth: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 3,
    marginBottom: 5,
    marginStart: 5,
  },
});
