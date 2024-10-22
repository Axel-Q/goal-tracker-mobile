import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

const GoalUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("The request was not successful");
        }
        // if I get to here means that fetch was successful
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.log("fetch user data ", err);
      }
    }
    fetchUserData();
  }, []);
  return (
    <View>
      <FlatList
        data={users}
        renderItem={({ item }) => {
          return <Text>{item.name}</Text>;
        }}
      />
    </View>
  );
};

export default GoalUsers;

const styles = StyleSheet.create({});