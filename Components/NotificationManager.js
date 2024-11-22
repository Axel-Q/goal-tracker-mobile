import {Button, StyleSheet, Text, View} from "react-native";
import React from "react";
import * as Notifications from "expo-notifications";

export async function verifyPermission() {
    try {
        const response = await Notifications.getPermissionsAsync();

        if (response.granted) {
            return true;
        }
        const requestResponse = await Notifications.requestPermissionsAsync();
        return requestResponse.granted;
    } catch (err) {
        console.log("permission ", err);
    }
}

const NotificationManager = () => {
    async function scheduleNotificationHandler() {
        try {
            const hasPermission = await verifyPermission();
            console.log(hasPermission);
            await Notifications.scheduleNotificationAsync({
                content: {body: "This is your reminder", title: "Goal Reminder"},
                trigger: {seconds: 5},
            });
        } catch (err) {
            console.log("schedule notification ", err);
        }
    }

    return (
        <View>
            <Button
                title="Remind me to add a goal"
                onPress={scheduleNotificationHandler}
            />
        </View>
    );
};
export default NotificationManager;
