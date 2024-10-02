import React from "react";
import {Text, View, Button} from "react-native";

/* goal is passed as a prop from the parent component */
export const GoalDetails = ({navigation, route}) => {
    console.log("route", route.params);
    return (
        <View>
            {route.params ? (
                    <Text>GoalDetails with id {route.params.goal.id} and text is {route.params.goal.text}</Text>)
                : (<Text>More details</Text>)}
            <Button
                title="More details"
                onPress={() => {
                    navigation.push("Details");
                }}
            />
        </View>

    );
}