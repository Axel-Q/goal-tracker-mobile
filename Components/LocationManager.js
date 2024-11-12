import {Alert, Button, StyleSheet, Image, View} from "react-native";
import React, {useState} from "react";
import * as Location from "expo-location";
import {mapsApiKey} from "@env";
import {Dimensions} from "react-native";
import {useNavigation} from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;

const LocationManager = () => {
    const navigation = useNavigation();
    console.log("Navigation Object:", navigation);
    const [response, requestPermission] = Location.useForegroundPermissions();
    const [location, setLocation] = useState(null);

    async function verifyPermission() {
        console.log(response);
        if (response.granted) {
            return true;
        }

        const permissionResponse = await requestPermission();
        return permissionResponse.granted;
    }

    function chooseLocationHandler() {
        //navigate to Map.js
        navigation.push("Map");
    }

    async function locateUserHandler() {
        try {

            const hasPermission = await verifyPermission();
            if (!hasPermission) {
                Alert.alert("You need to give permission to use location services");
                return;
            }
            const result = await Location.getCurrentPositionAsync();

            setLocation({
                latitude: result.coords.latitude,
                longitude: result.coords.longitude,
            });
        } catch (err) {
            console.log("get current position ", err);
        }
    }

    return (
        <View>
            <Button title="Find My Location" onPress={locateUserHandler}/>
            <Button
                title="Let me choose my location"
                onPress={chooseLocationHandler}
            />
            {location && (
                <Image
                    source={{
                        uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${mapsApiKey}`,
                    }}
                    style={styles.image}
                />
            )}
        </View>
    );
};

export default LocationManager;

const styles = StyleSheet.create({
    image: {
        height: 200,
        width: windowWidth,
    },
});