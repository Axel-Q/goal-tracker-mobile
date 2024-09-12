import {StatusBar} from 'expo-status-bar';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {useState} from 'react';
import Header from "./Components/Header";
import {onchangeText} from "react-native";
import React from "react";

export default function App() {
    const appName = "Axel's APP";
    const [text, setText] = useState('');
    return (
        <View style={styles.container}>
            <Header name={appName}/>
            <StatusBar style="auto"/>
          <TextInput placeholder={"Enter your phone number"} keyboardType={"numeric"}
                     style={{color: "blue"}} value={text}
          onChangeText={(text) => setText(text)}/>
            <Text>
                Your phone number is : {text}
            </Text>
            <Button title={"Clear"} onPress={() => setText('')}/>
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






