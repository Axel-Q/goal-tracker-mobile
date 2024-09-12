import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Header({name}) {

    return (
        <Text>Welcome to {name}</Text>
    );
}

