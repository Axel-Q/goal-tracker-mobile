import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import Home from "./Components/Home";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {GoalDetails} from "./Components/GoalDetails";
import {Button} from "react-native";

const Stack = createNativeStackNavigator();

/* App component */
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home}
                              options={{
                                  title: 'All goals',
                                  headerStyle: {
                                      backgroundColor: '#009783',
                                  },
                                  headerTintColor: '#ffffff',
                              }}/>
                <Stack.Screen
                    name="Details"
                    component={GoalDetails}
                    options={({navigation, route}) => {
                        const goalText = route.params?.goal?.text || 'Details';
                        return {
                            title: goalText,
                            headerRight: () => {
                                return (
                                    <Button
                                        title="Warning"
                                        onPress={() => {
                                            console.log("Warning");
                                            console.log("routr", route.params);
                                        }}
                                    />
                                );
                            },
                        };
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>)
}