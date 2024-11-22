import {StyleSheet, Button} from "react-native";
import React, {useState} from "react";
import MapView, {Marker} from "react-native-maps";
import {useNavigation} from "@react-navigation/native";


const Map = () => {
    const navigation = useNavigation();
    const [selectedLocation, setSelectedLocation] = useState(null);
    return (
        <>
            <MapView
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                style={styles.map}
                onPress={(e) => {
                    setSelectedLocation({
                        latitude: e.nativeEvent.coordinate.latitude,
                        longitude: e.nativeEvent.coordinate.longitude,
                    });
                }}
            >
                {selectedLocation && (
                    <Marker coordinate={selectedLocation}/>
                )}
            </MapView>
            <Button
                title="Confirm Selected Location"
                onPress={() => {
                    //navigate back to profile and pass the selected location
                    navigation.navigate("Profile", {selectedLocation});
                }}
                disabled={!selectedLocation}
            />
        </>
    );
};


export default Map;

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
});