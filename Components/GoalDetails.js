import React from "react";
import {Text, View, Button} from "react-native";
import {StyleSheet, TouchableOpacity} from "react-native";
import {useEffect, useState} from "react";

/* goal is passed as a prop from the parent component */
export const GoalDetails = ({navigation, route}) => {
    const [warning, setWarning] = useState(false);
    const handleWarning = () => {
        setWarning(true);
        navigation.setOptions({
            title: "Warning",
        });
    }
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return <Button title="Warning" color="pink" onPress={handleWarning}/>;
            }
        });
    }, [navigation]);
    console.log("route", route.params);
    return (<View>
            {route.params ? (<Text style={warning ? styles.warning : null}
            >GoalDetails with id {route.params.goal.id} and text is {route.params.goal.text}</Text>) : (
                <Text style={warning ? styles.warning : null}>More details</Text>)}
            <Button
                title="More details"
                onPress={() => {
                    navigation.push("Details");
                }}
            />
        </View>

    );
}

const styles = StyleSheet.create({
    warning: {
        color: 'red',
    },
});