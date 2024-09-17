    import React, {useState, useEffect, useRef} from 'react';
    import {TextInput, Text, Button, View, StyleSheet, Modal} from 'react-native';

    export default function Input({onFocusChange, autoFocus, inputHandler, visible}) {
        const [text, setText] = useState('');
        const [message, setMessage] = useState('');
        const [isFocused, setIsFocused] = useState(true); // State to track if input is focused
        const inputRef = useRef(null); // Reference for the TextInput
        useEffect(() => {
            if (autoFocus && inputRef.current) {
                inputRef.current.focus();
            }
        }, [autoFocus]);

        const handleBlur = () => {
            setIsFocused(false); // Set focus state to false
            if (text.length >= 3) {
                setMessage("Thank you");
            } else {
                setMessage("Please type more than 3 characters");
            }
        };

        const handleFocus = () => {
            setIsFocused(true); // Set focus state to true
            setMessage(''); // Clear the message when the input is focused
            onFocusChange(true); // Pass the focus state to the parent component
        };

        const handleConfirm = () => {
            inputHandler(text);
        }


        return (
            <Modal animationType={"slide"} visible={visible} transparent={false}>
                <View style={styles.container}>
                    <TextInput placeholder={"Enter your phone number here"}
                               keyboardType={"numeric"}
                               style={{color: "blue"}} value={text}
                               onChangeText={(text) => setText(text)}
                               onFocus={handleFocus}
                               onBlur={handleBlur}
                               ref={inputRef}/>
                    {isFocused && text.length > 0 && (
                        <Text style={{backgroundColor: "lightgray"}}>
                            Character count: {text.length}
                        </Text>
                    )}
                    {/*<Button title={"Clear content"} onPress={() => setText('')}/>*/}
                    <Button title={"Confirm"} onPress={() => handleConfirm()}/>
                    {message !== '' && (
                        <Text style={{marginTop: 10}}>
                            {message}
                        </Text>)}
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
            height: '10%',
        },
    });