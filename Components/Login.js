import {useState} from "react";
import {View, Text, TextInput, Button, StyleSheet, Alert, Pressable, TouchableOpacity} from "react-native";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../Firebase/firebaseSetup";


/**
* Login Components
* */
export default function Login({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const signupHandler = () => {
        navigation.replace("Signup");
    };
    const loginHandler = async () => {
        if (!email.length) {
            Alert.alert("email should not be empty");
            return;
        }
        if (!password.length) {
            Alert.alert("password should not be empty");
            return;
        }
        try {
            const userCred = await signInWithEmailAndPassword(auth, email, password);
            console.log(userCred);
        } catch (err) {
            console.log("sign in ", err);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Email</Text>
            <TextInput
                placeholder="Email"
                style={styles.input}
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
            <TouchableOpacity onPress={loginHandler}>
                <Text style={styles.buttonStyle}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={signupHandler}>
                <Text style={styles.buttonStyle}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "stretch",
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
        backgroundColor: "#faa5a5",
        padding: 10,
        borderRadius: 10,
        width: "60%",
    },
});