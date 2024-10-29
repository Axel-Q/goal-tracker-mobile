import { View, Text } from "react-native";
import React from "react";
import { auth } from "../Firebase/firebaseSetup";
/*
* Profile Screen
* */
export default function Profile() {
  console.log(auth.currentUser);
  return (
    <View>
      <Text>Profile of user with id: {auth.currentUser.uid}</Text>
    </View>
  );
}