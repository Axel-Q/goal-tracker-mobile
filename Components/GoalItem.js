import { StyleSheet, Text, View } from "react-native";
import React from "react";

const GoalItem = ({ goal }) => {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.text}>{goal.text}</Text>
    </View>
  );
};

export default GoalItem;

const styles = StyleSheet.create({
    textContainer: {
        marginVertical: 25,
        backgroundColor: "#faa5a5",
        padding: 40,
        borderRadius: 15,
    },
    text: {
        color: "white",
        fontSize: 20,
    },
});