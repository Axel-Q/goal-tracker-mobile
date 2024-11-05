import {Alert, Button, StyleSheet, Image, View} from "react-native";
import React, {useState} from "react";
import * as ImagePicker from "expo-image-picker";

const ImageManager = ({ imageUriHandler }) => {
    const [response, requestPermission] = ImagePicker.useCameraPermissions();
    const [imageUri, setImageUri] = useState("");

    async function verifyPermission() {
        if (response.granted) {
            return true;
        }
        const permissionResponse = await requestPermission();
        return permissionResponse.granted;
    }

    async function takeImageHandler() {
        try {
            const hasPermission = await verifyPermission();
            if (!hasPermission) {
                Alert.alert("You need to give permission to launch camera");
                return;
            }
            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
            });
            setImageUri(result.assets[0].uri);
            imageUriHandler(result.assets[0].uri);
        } catch (err) {
            console.log("take image ", err);
        }
    }

    return (
        <View style={styles.container}>
            <Button title="Take an Image" onPress={takeImageHandler} />
            {imageUri && (
                <Image
                    source={{
                        uri: imageUri,
                    }}
                    style={styles.image}
                />
            )}
        </View>
    );
};

export default ImageManager;

const styles = StyleSheet.create({image: {width: 100, height: 100}, container: {margin: 10}});