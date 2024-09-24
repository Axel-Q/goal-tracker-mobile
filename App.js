import {StatusBar} from 'expo-status-bar';
import {Button, SafeAreaView, StyleSheet, Text, TextInput, View, ScrollView} from 'react-native';
import {useState, useRef} from 'react';
import Header from "./Components/Header";
import React from "react";
import Input from "./Components/Input";

export default function App() {
    const appName = "Axel's APP";
    const [inputData, setInputData] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [goals, setGoals] = useState([]);
    const handleVisibility = () => {
        setModalVisible(true);
    }

    function handleInputData(data) {
        console.log("console logout ", data);
        setInputData("study: " + data);
        setModalVisible(false);
        // add the new goal to the list of goals
        const newGoal = {id: Math.random(), text: data};
        console.log("newGoal", newGoal);
        // make a new goal and store the recent goals to the list of goals using  state setter function
        setGoals((currentGoals) => {
            return [...currentGoals, newGoal];
        })
    }

    function handleCancel() {
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
                       visible={modalVisible}
                       cancelHandler={handleCancel}/>
            </View>
            <View style={styles.bottomView}>
                {goals.length === 0 ? (
                    <Text style={styles.text}>No goals yet</Text>) : (
                    <ScrollView>
                        // map through the goals and display them
                        {goals.map((goal) => {
                            return (
                                <View key={goal.id} style={styles.textContainer}>
                                    <Text style={styles.text}>{goal.text}</Text>
                                </View>
                            );
                        })}
                    </ScrollView>
                )}
            </View>
        </SafeAreaView>
    )
        ;
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
    textContainer: {
        marginVertical: 25,
        backgroundColor: "#faa5a5",
        padding: 30,
        borderRadius: 15,
    },
    text: {
        color: "white",
        fontSize: 20,
    },
});






