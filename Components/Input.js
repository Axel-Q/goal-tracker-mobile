import React, {useState, useEffect, useRef} from 'react';
import {TextInput, Text, Button, View} from 'react-native';

export default function Input({onFocusChange, autoFocus}) {
const [text, setText] = useState('');
const [message, setMessage] = useState('');
const [isFocused, setIsFocused] = useState(false); // State to track if input is focused
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


    return (
        <View>

        </View>
    );
}