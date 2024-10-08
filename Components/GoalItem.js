import {Button, Pressable, StyleSheet, Text, View} from "react-native";
import React from "react";
import {useNavigation} from "@react-navigation/native";
import PressableButton from "./PressableButton";
import {FontAwesome} from "@expo/vector-icons";

/* GoalItem is a child component of GoalList */
const GoalItem = ({goal, handleDelete}) => {
    const navigation = useNavigation();
    return (
        <View style={styles.textContainer}>
            <Pressable
                android_ripple={{color: 'red', borderless: true, radius: 30}}
                style={({pressed}) => {
                    return [styles.barContainer, pressed && styles.pressedStyle];
                }}
                onPress={function () {
                    navigation.navigate("Details", {goal: goal});
                }}
            >
                <Text style={styles.text}>{goal.text}</Text>

                <PressableButton
                    customStyle={styles.buttonStyle}
                    onPressHandler={() => {
                        handleDelete(goal.id);
                    }}
                >
                    <FontAwesome name="trash" size={24} color="black"/>
                </PressableButton>
            </Pressable>
        </View>
    );
};

export default GoalItem;

const styles = StyleSheet.create({
    textContainer: {
        marginVertical: 15,
        padding: 10,
        borderRadius: 15,
    },
    text: {
        color: "white",
        fontSize: 30,
    },
    buttonStyle: {
        marginLeft: 15,
        backgroundColor: "grey",
        padding: 5,
    },
    barContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        backgroundColor: "#faa5a5",
    },
    pressedStyle: {
        backgroundColor: "#5ea9ff",
    },
});