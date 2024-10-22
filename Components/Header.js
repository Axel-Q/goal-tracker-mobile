import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    useWindowDimensions,
} from "react-native";

export default function Header({name}) {
    const {height} = useWindowDimensions();
    console.log("Current height:", height);

    return (
        <Text
            style={[
                styles.text,
                {
                    paddingVertical: height < 415 ? 0 : 10,
                    paddingHorizontal: height < 415 ? 0 : 10,
                },
            ]}
        >
            Welcome to {name}
        </Text>
    );
}

const styles = StyleSheet.create({
    text: {
        color: "darkmagenta",
        fontSize: 25,
        borderColor: "darkmagenta",
        borderWidth: 2,
        padding: 5,
        marginBottom: 10,
    },
});

