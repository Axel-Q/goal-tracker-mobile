import {StatusBar} from 'expo-status-bar';
import {Button, SafeAreaView, StyleSheet, Text, TextInput, View, ScrollView, FlatList, Alert} from 'react-native';
import {useState, useRef, useEffect} from 'react';
import Header from "./Header";
import React from "react";
import Input from "./Input";
import GoalItem from "./GoalItem";
import {deleteFromDB, writeToDB, deleteAll} from "../Firebase/firestoreHelper";
import {collection, onSnapshot, query, where} from "firebase/firestore";
import {auth, db, storage} from "../Firebase/firebaseSetup";
import {ref, uploadBytesResumable, uploadBytes} from "firebase/storage";
import PressableButton from "./PressableButton";

export default function Home({navigation}) {
    // console.log("db", db);
    const appName = "Axel's APP";
    const collectionName = "goals";
    const [inputData, setInputData] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [goals, setGoals] = useState([]);
    const handleVisibility = () => {
        setModalVisible(true);
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(
                collection(db, collectionName),
                where("owner", "==", auth.currentUser.uid)
            ),
            (querySnapshot) => {
                let newArray = [];
                if (!querySnapshot.empty) {
                    querySnapshot.forEach((docSnapshot) => {
                        console.log(docSnapshot.id);
                        newArray.push({...docSnapshot.data(), id: docSnapshot.id});
                    });
                }
                setGoals(newArray);
            },
            (err) => {
                console.log(err);
            });
        return () => {
            unsubscribe();
        }
    }, []);

    async function retrieveAndUploadImage(uri) {
        try {
            const response = await fetch(uri);
            if (!response.ok) {
                throw new Error("The request was not successful");
            }
            const blob = await response.blob();
            const imageName = uri.substring(uri.lastIndexOf("/") + 1);
            const imageRef = ref(storage, `images/${imageName}`);
            const uploadResult = await uploadBytes(imageRef, blob);
            return uploadResult.metadata.fullPath;
        } catch (err) {
            console.log("retrieve and upload image ", err);
        }
    }

    async function handleInputData(data) {
        console.log("data", data);
        let imageUri = "";
        if (data.imageUri) {
            imageUri = await retrieveAndUploadImage(data.imageUri);
        }
        console.log("retrieved ", imageUri);
        setInputData("study: " + data);
        setModalVisible(false);
        console.log("imageUri", imageUri);
        // add the new goal to the list of goals
        const newGoal = {
            text: data.text,
            owner: auth.currentUser.uid,
        };
        console.log("newGoal", newGoal);
        writeToDB(newGoal, "goals");
        console.log("goals", goals);
        setModalVisible(false);
    }

    function handleCancel() {
        setModalVisible(false);
    }

    function handleDelete(id) {
        deleteFromDB(id, collectionName);
    }

    function handleDeleteAll(collectionName) {
        Alert.alert(
            'Delete All Goals',
            'Are you sure you want to delete all goals?',
            [
                {text: 'No', style: 'cancel'},
                {text: 'Yes', onPress: () => deleteAll('goals')},
            ],
            {cancelable: false}
        );
    }

    const listSeparator = ({highlighted}) => {
        return <View
            style={[
                styles.separator,
                highlighted ? {backgroundColor: 'red'} : {backgroundColor: 'grey'}
            ]}
        />
    }


    /*add back the SafeAreaView tag*/
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto"/>
            <View style={styles.topView}>
                <Header name={appName}/>
                {/*<Button title={'Add a goal'} onPress={handleVisibility}/>*/}
                <PressableButton
                    onPressHandler={() => {
                        setModalVisible(true);
                    }}
                    componentStyle={styles.buttonStyle}
                >
                    <Text style={styles.textStyle}>Add a goal</Text>
                </PressableButton>
                <Input textInputFocus={true}
                       inputHandler={handleInputData}
                       visible={modalVisible}
                       cancelHandler={handleCancel}/>
            </View>
            <View style={styles.bottomView}>

                <FlatList
                    contentContainerStyle={styles.scrollViewContainer}
                    data={goals}
                    renderItem={({item, separators}) => {
                        return (
                            <GoalItem goal={item} handleDelete={handleDelete} onPressIn={() => separators.highlight()}
                                      onPressOut={() => separators.unhighlight()}/>
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
                    ItemSeparatorComponent={listSeparator}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    scrollViewContainer: {},
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
    separator: {
        height: 3,
        width: '100%',
        backgroundColor: 'grey',
    },
});






