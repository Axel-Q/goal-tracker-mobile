import {View, Text, Pressable} from "react-native";
import React, {useLayoutEffect} from "react";
import {auth} from "../Firebase/firebaseSetup";
import {StackActions as navigation} from "@react-navigation/routers/src";
import {signOut} from "firebase/auth";
import {MaterialIcons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
/*
* Profile Screen
* */
export default function Profile() {
    console.log(auth.currentUser);
    const navigation = useNavigation();

    // Set up the sign-out icon in the header
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable onPress={handleSignOut} style={{marginRight: 10}}>
                    <MaterialIcons name="logout" size={24} color="black"/>
                </Pressable>
            ),
        });
    }, [navigation]);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            console.log("User signed out!");
            navigation.replace("Login"); // Navigate back to Login or any other screen after sign-out
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    return (
        <View>
            <Text>Email: {auth.currentUser.email}</Text>
            <Text>Profile of user with id: {auth.currentUser.uid}</Text>
        </View>
    );
}