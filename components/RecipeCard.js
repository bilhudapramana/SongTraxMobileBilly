import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

import { colors, sizes, fonts } from "../data/theme";

/**
 * RecipeCard component
 * 
 * @param {Object} props - The properties object.
 * @param {Object} props.recipe - The recipe object containing name and datetime.
 * @param {Function} props.onPress - The function to be called when the card is pressed.
 *
 * @returns {React.Element} A recipe card element.
 */
function RecipeCard({ recipe, onPress }) {
    return (
        <TouchableOpacity
            style={{
                flexDirection: "row",
                alignItems: "center",
                padding: sizes.padding / 2,
                marginBottom: sizes.padding,
                borderRadius: sizes.radius,
                backgroundColor: colors.grayLight,
            }}
            onPress={onPress}
        >
            <View
                style={{
                    width: "65%",
                    paddingHorizontal: sizes.padding / 2,
                }}
            >
                <Text
                    style={{
                        flex: 1,
                        ...fonts.heading,
                        color: colors.darkGreen,
                    }}
                >
                    {/* Recipe Name */}
                    {recipe.name}
                </Text>
                <Text
                    style={{
                        ...fonts.body4,
                        color: colors.gray,
                    }}
                >
                    {/* Recipe Date/Time */}
                    {recipe.datetime}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

export default RecipeCard;