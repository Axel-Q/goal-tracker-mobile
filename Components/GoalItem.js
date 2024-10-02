import {Button, StyleSheet, Text, View} from "react-native";
import React from "react";
import {useNavigation} from "@react-navigation/native";

/* GoalItem is a child component of GoalList */
const GoalItem = ({goal, handleDelete}) => {
    const navigation = useNavigation();
    return (
        <View style={styles.textContainer}>
            <Text style={styles.text}>{goal.text}</Text>
            <View style={styles.buttonStyle}>
                <Button
                    color="black"
                    title="X"
                    onPress={() => {
                        handleDelete(goal.id);
                    }}
                />
            </View>
            <View style={styles.buttonStyle}>
                <Button
                    color="black"
                    title="i"
                    onPress={() =>{
                        navigation.navigate('Details', {goal: goal});
                    }}
                />
            </View>
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
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    text: {
        color: "white",
        fontSize: 20,
    },
    buttonStyle: {
        margin: 5,
    },
});