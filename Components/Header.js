import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Header({name}) {

    return (
        <Text style={styles.text}>Welcome to {name}</Text>
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

