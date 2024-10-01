import {Button, StyleSheet, Text, View} from "react-native";
import React from "react";

const GoalItem = ({goal, handleDelete, handlePress}) => {
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
                        handlePress(goal);
                    }}
                />
            </View>
            {/*<Button*/}
            {/*    color='darkgreen'*/}
            {/*    title="X"*/}
            {/*    onPress={() => {*/}
            {/*        handleDelete(goal.id);*/}
            {/*    }}*/}
            {/*/>*/}
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