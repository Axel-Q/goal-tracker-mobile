import {StatusBar} from 'expo-status-bar';
import {Button, SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
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
        <SafeAreaView style={styles.container}>
            <View style={styles.topView}>
            <StatusBar style="auto"/>
            <View style={styles.headerContainer}>
                <Header name={appName}/>
            </View>
            <Button title={'Add a goal'} onPress={handleVisibility}/>
            <Input onFocusChange={handleFocusChange}
                   autoFocus={focus}
                   inputHandler={handleInputData}
                   visible={modalVisible}/>
                      </View>
            <View style={styles.bottomView}>
            <Text style={{marginTop: 10, backgroundColor: 'skyblue'}}>{inputData}</Text>
                </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20, // Added padding for better spacing
    },
    headerContainer: {
        borderColor: 'purple',
        borderWidth: 2,
        padding: 5
    },
    text: {
        color: 'purple', // Added text color
    },
    topView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    bottomView: {
        flex: 4,
        backgroundColor: 'lightblue',
        alignItems: "center",
    },
});






