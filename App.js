import {StatusBar} from 'expo-status-bar';
import {Button, SafeAreaView, StyleSheet, Text, TextInput, View, ScrollView, FlatList, Alert} from 'react-native';
import {useState, useRef} from 'react';
import Header from "./Components/Header";
import React from "react";
import Input from "./Components/Input";
import GoalIterm from "./Components/GoalItem";

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

    function handleDelete(id) {
        setGoals((currentGoals) => {
            return currentGoals.filter((goal) => goal.id !== id);
        });
    }

    function handleDeleteAll() {
        Alert.alert(
            'Delete All Goals',
            'Are you sure you want to delete all goals?',
            [
                {text: 'No', style: 'cancel'},
                {text: 'Yes', onPress: () => setGoals([])},
            ],
            {cancelable: false}
        );
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

                <FlatList
                    contentContainerStyle={styles.scrollViewContainer}
                    data={goals}
                    renderItem={({item}) => {
                        return (
                            <GoalIterm goal={item} handleDelete={handleDelete}/>
                        );
                    }
                    }
                    ListEmptyComponent={
                        <Text style={styles.noGoalsText}>No goals to show</Text>
                    }
                    ListHeaderComponent={
                        goals.length > 0 ? (
                            <Text style={styles.headerText}>My Goals</Text>
                        ) : null
                    }
                    ListFooterComponent={
                        goals.length > 0 ? (
                            <Button
                                title="Delete All"
                                onPress={handleDeleteAll}
                            />
                        ) : null
                    }
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        alignItems: "center",
    },
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
    noGoalsText: {
        color: 'purple',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
    headerText: {
        color: 'purple',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
});






