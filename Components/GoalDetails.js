import React from "react";
import {Text, View, Button, Pressable} from "react-native";
import {StyleSheet, TouchableOpacity, Image} from "react-native";
import {useEffect, useState} from "react";
import PressableButton from "./PressableButton";
import {FontAwesome} from "@expo/vector-icons";
import {addWarning} from "../Firebase/firestoreHelper";
import GoalUsers from "./GoalUsers";
import {getDownloadURL, ref} from "firebase/storage";
import {storage} from "../Firebase/firebaseSetup";

/* goal is passed as a prop from the parent component */
export const GoalDetails = ({navigation, route}) => {
    const [warning, setWarning] = useState(false);
    const [imageUri, setImageUri] = useState("");
    const handleWarning = async () => {
        if (route.params && route.params.goal.id) {
            await addWarning(route.params.goal.id);
            setWarning(true);
            navigation.setOptions({
                title: "Warning",
            });
        }
    };

    useEffect(() => {
        async function getImageUrl() {
            if (route.params) {
                try {
                    const url = await getDownloadURL(ref(storage, route.params.goal.imageUri));
                    setImageUri(url);
                } catch (err) {
                    console.log("get image uri ", err);
                }
            }
        }

        getImageUrl();
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return <PressableButton onPressHandler={handleWarning} customStyle={styles.buttonStyle}>
                    <FontAwesome name="warning" size={24} color="black"/>
                </PressableButton>
            }
        });
    }, [navigation, route.params]);
    console.log("route", route.params);

    return (<View>
            {route.params ? (<View>
                    <Text style={warning && styles.warning}>
                        You are seeing the details of the goal with text :
                        {route.params.goal.text} and id:{route.params.goal.id}
                    </Text>
                    {imageUri && (<Image
                        source={{
                            uri: imageUri,
                        }}
                        style={styles.image}
                    />)}
                </View>
            ) : (<Text style={warning ? styles.warning : null}>More details</Text>)}
            <Button
                title="More details"
                onPress={() => {
                    navigation.push("Details");
                }}
            />
            {route.params && <GoalUsers id={route.params.goal.id}/>}
        </View>

    );
}

const styles = StyleSheet.create({
    warning: {
        color: 'red',
    }, buttonStyle: {
        backgroundColor: "pink", padding: 5, margin: 10,
    },
    image: {width: 100, height: 100},
});