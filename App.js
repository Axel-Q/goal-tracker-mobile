import {StatusBar} from 'expo-status-bar';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {useState, useRef} from 'react';
import Header from "./Components/Header";
import React from "react";
import Input from "./Components/Input";

export default function App() {
    const appName = "Axel's APP";
    const [focus, setFocus] = useState(false);
      // Handler for focus state, passed to Input component
    const handleFocusChange = (focusState) => {
        setFocus(focusState);
    };
    return (
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <Header name={appName}/>
            <Input onFocusChange={handleFocusChange} autoFocus={focus} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});






