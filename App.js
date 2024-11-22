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
                    return (
                        <TouchableOpacity
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