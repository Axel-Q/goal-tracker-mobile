import React, {useState, useEffect, useRef} from 'react';
import {TextInput, Text, Button, View, StyleSheet, Modal} from 'react-native';

export default function Input({textInputFocus, inputHandler, visible}) {
    const [text, setText] = useState('');
    const [blur, setBlur] = useState(false);


    const handleConfirm = () => {
        inputHandler(text);
    }


    return (
        <Modal animationType={"slide"} visible={visible}>
            <View style={styles.container}>
                <TextInput
                    autoFocus={textInputFocus}
                    placeholder={"Enter your phone number here"}
                    autoCorrect={true}
                    keyboardType={"default"}
                    style={styles.input}
                    value={text}
                    onChangeText={(text) => setText(text)}
                    onBlur={() => setBlur(true)}
                    onFocus={() => setBlur(false)}/>

                {blur ? (
                    text.length >= 3 ? (
                        <Text>Thank you</Text>
                    ) : (
                        <Text>Please type more than 3 characters</Text>
                    )
                ) : (
                    text && <Text>{text.length}</Text>
                )}
                <Button title={"Confirm"} onPress={() => handleConfirm()}/>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {borderColor: "purple", borderWidth: 2, padding: 5},
});