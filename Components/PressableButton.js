import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const PressableButton = ({ children, onPressHandler, customStyle  }) => {
  return (
    <Pressable
      onPress={onPressHandler}
      style={({ pressed }) => {
        return [
          buttonStyles.defaultAppearance,
          customStyle,
          pressed && buttonStyles.pressedAppearance,
        ];
      }}
    >
      <View>{children}</View>
    </Pressable>
  );
};

export default PressableButton;

const buttonStyles = StyleSheet.create({
  pressedAppearance: { opacity: 0.5, backgroundColor: "yellow" },
  defaultAppearance: {
    backgroundColor: "skyblue",
    margin: 10,
    padding: 5,
  },
});