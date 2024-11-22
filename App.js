import React, {useEffect, useState} from "react";
import {NavigationContainer} from "@react-navigation/native";
import Home from "./Components/Home";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {GoalDetails} from "./Components/GoalDetails";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import {getMultiFactorResolver, onAuthStateChanged} from "firebase/auth";
import {auth} from "./Firebase/firebaseSetup";
import PressableButton from "./Components/PressableButton";
import Profile from "./Components/Profile";
import Ionicons from "@expo/vector-icons/Ionicons";
import {TouchableOpacity} from "react-native";
import Map from "./Components/Map";
import {Linking} from "react-native";
import * as Notifications from "expo-notifications";


const Stack = createNativeStackNavigator();
const AuthStack = (<>
    <Stack.Screen name="Login" component={Login}/>
    <Stack.Screen name="Signup" component={Signup}/>
</>);
const AppStack = (<>
    <Stack.Screen
        name="Home"
        component={Home}
        options={({navigation}) => {
            return {
                title: "All Goals", headerRight: () => {
                    return (<TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Profile");
                        }}
                    >
                        <Ionicons name="person" size={24} color="pink"/>
                    </TouchableOpacity>)
                },
            };

        }}
    />
    <Stack.Screen
        name="Details"
        component={GoalDetails}
        options={({navigation, route}) => {
            const goalText = route.params ? route.params.goal.text : "Details";
            return {
                title: goalText,
            };
        }}
    />
    <Stack.Screen name="Profile" component={Profile}/>
    <Stack.Screen name="Map" component={Map}/>
</>);

Notifications.setNotificationHandler({
    handleNotification: async (notification) => {
        return {shouldShowAlert: true};
    },
});
/* App component */


export default function App() {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
    useEffect(() => {
        /*
        * Observing Firebase User State
        * */
        onAuthStateChanged(auth, (user) => {
            //based on the user variable update the state variable
            if (user) {
                setIsUserAuthenticated(true);
            } else {
                setIsUserAuthenticated(false);
            }
        });
    }, []);

    useEffect(() => {
        const subscription = Notifications.addNotificationReceivedListener(
            (notification) => {
                console.log("notification received ", notification);
            }
        );
        return () => subscription.remove();
    }, []);
    useEffect(() => {
        const subscription = Notifications.addNotificationResponseReceivedListener(
            (notificationResponse) => {
                const url = notificationResponse.notification.request.content.data?.url;
                if (url) {
                    Linking.openURL(url);
                } else {
                    console.log("No valid URL provided in notification data.");
                }
            }
        );
        return () => subscription.remove();
    }, []);

    return (<NavigationContainer>
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#009783',
                }, headerTintColor: '#ffffff',
            }}>
            {isUserAuthenticated ? AppStack : AuthStack}
        </Stack.Navigator>
    </NavigationContainer>)
}