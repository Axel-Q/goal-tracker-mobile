import {StatusBar} from 'expo-status-bar';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {useState, useRef} from 'react';
import Header from "./Components/Header";
import React from "react";
import Input from "./Components/Input";

export default function App() {
    const appName = "Axel's APP";
    const [focus, setFocus] = useState(true);
    const [inputData, setInputData] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    // Handler for focus state, passed to Input component
    const handleFocusChange = (focusState) => {
        setFocus(focusState);
    };

    function handleInputData(data) {
        console.log("console logout ", data);
        setInputData("User input: " + data);
        setModalVisible(false);
    }

    const handleVisibility = () => {
        setModalVisible(true);
    }



    return (
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <Header name={appName}/>
            <Button title={'Add a goal'} onPress={handleVisibility} />
            <Input onFocusChange={handleFocusChange}
                   autoFocus={focus}
                   inputHandler={handleInputData}
                   visible={modalVisible}/>
            <Text style={{marginTop: 10, backgroundColor: 'skyblue'}}>{inputData}</Text>
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






