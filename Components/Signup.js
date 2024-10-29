import {useState} from "react";
import {View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity} from "react-native";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../Firebase/firebaseSetup";

/**
* Signup Components
* */
export default function Signup({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const loginHandler = () => {
        // navigate to Login page with no back button
        navigation.replace("Login");
    };
    const signupHandler = async () => {
        if (!email.length) {
            Alert.alert("email should not be empty");
            return;
        }
        if (!password.length) {
            Alert.alert("password should not be empty");
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert("password and confirm password should be the same");
            return;
        }
        /*
        * Create a New User
        * */
        try {
            const userCred = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log(userCred);
        } catch (err) {
            console.log("create user ", err);
            // alert user based on the error message
            if (err.code === "auth/invalid-email") {
                Alert.alert("Email is invalid");
            } else if (err.code === "auth/missing-password") {
                Alert.alert("Password is missing");
            } else if (err.code === "auth/weak-password") {
                Alert.alert("Password should be at least 6 characters");
            } else if (err.code === "auth/email-already-in-use") {
                Alert.alert("Email is already in use");}
            else if (err.code === "auth/network-request-failed") {
                Alert.alert("Network error, please try again later");
            } else if (err.code === "auth/too-many-requests") {
                Alert.alert("Too many requests, please try again later");
            } else if (err.code === "auth/user-disabled") {
                Alert.alert("User is disabled, please contact support");
            } else {
                Alert.alert(err);}
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={(changedText) => {
                    setEmail(changedText);
                }}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="Password"
                value={password}
                onChangeText={(changedText) => {
                    setPassword(changedText);
                }}
            />
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={(changedText) => {
                    setConfirmPassword(changedText);
                }}
            />
            <TouchableOpacity onPress={signupHandler}>
                <Text style={styles.buttonStyle}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={loginHandler}>
                <Text style={styles.buttonStyle}>Already Registered? Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        // alignItems: "stretch",
        justifyContent: "center",
        paddingBottom: 250,
    },
    input: {
        borderColor: "#552055",
        borderWidth: 2,
        width: "90%",
        marginBottom: 25,
        padding: 5,
        alignSelf: "center",
    },
    label: {
        marginLeft: 25,
    },
    buttonStyle: {
        color: "white",
        alignSelf: "center",
        textAlign: "center",
        marginBottom: 10,
        backgroundColor: "#9302aa",
        padding: 10,
        borderRadius: 10,
        width: "60%",
    },
});