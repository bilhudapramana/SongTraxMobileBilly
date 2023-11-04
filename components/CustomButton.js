import React from "react";
import { TouchableOpacity, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { colors, fonts } from "../data/theme";

/**
 * Custom button component
 * 
 * @param {Object} props - The properties object.
 * @param {string} props.buttonText - The text to be displayed on the button.
 * @param {Object} props.buttonContainerStyle - The style object for the button container.
 * @param {Array<string>} props.buttonColors - The colors to be used for button gradient.
 * @param {Function} props.onPress - The function to be called when the button is pressed.
 *
 * @returns {React.Element} A custom button element.
 */
function CustomButton({ buttonText, buttonContainerStyle, buttonColors, onPress }) {
    // Check if buttonColors array is not empty
    if (buttonColors.length > 0) {
        return (
            <TouchableOpacity onPress={onPress}>
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{x: 1, y: 1}}
                    colors={buttonColors}
                    style={buttonContainerStyle}
                >
                    <Text
                        style={{
                            textAlign: 'center',
                            color: colors.white,
                            ...fonts.h3
                        }}
                    >
                        {buttonText}
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        );
    } else {
        return (
            <TouchableOpacity onPress={onPress}>
                <Text
                    style={{
                        textAlign: 'center',
                        color: colors.lightGreen,
                        ...fonts.h3
                    }}
                >
                    {buttonText}
                </Text>
            </TouchableOpacity>
        );
    }
}

export default CustomButton;