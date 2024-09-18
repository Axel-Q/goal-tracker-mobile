import {StatusBar} from 'expo-status-bar';
import {Button, SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import {useState, useRef} from 'react';
import Header from "./Components/Header";
import React from "react";
import Input from "./Components/Input";

export default function App() {
    const appName = "Axel's APP";
    const [inputData, setInputData] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const handleVisibility = () => {
        setModalVisible(true);
    }


    function handleInputData(data) {
        console.log("console logout ", data);
        setInputData("study: " + data);
        setModalVisible(false);
    }


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto"/>
            <View style={styles.topView}>
                <Header name={appName}/>
                <Button title={'Add a goal'} onPress={handleVisibility}/>
                <Input textInputFocus={true}
                       inputHandler={handleInputData}
                       visible={modalVisible}/>
            </View>
            <View style={styles.bottomView}>
                <Text style={styles.text}>{inputData}</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        justifyContent: 'center',
        padding: 20, // Added padding for better spacing
    },
    headerContainer: {
        borderColor: 'purple',
        borderWidth: 2,
        padding: 5,
        marginBottom: 20,
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






