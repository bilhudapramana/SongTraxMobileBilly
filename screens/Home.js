import React from "react";
import { SafeAreaView, View, FlatList, Text } from "react-native";

import { colors, fonts, sizes } from "../data/theme";

import RecipeCard from '../components/RecipeCard';

/**
 * Home component
 *
 * @param {Object} props - The properties object.
 * @param {Function} props.navigation - The navigation object.
 * @param {Array<Object>} props.recipes - Array of recipe objects.
 *
 * @returns {React.Element} A screen displaying all recipes.
 */
function Home({ navigation, recipes }) {
    
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: colors.white,
            }}
        >
            <FlatList
                data={recipes}
                keyExtractor={item => item.id}
                ListFooterComponent={
                    <View style={{ marginBottom: sizes.padding * 5 }}>
                        <Text style={{ ...fonts.body4 }}>That's the end of all song.</Text>
                    </View>
                }
                renderItem={({ item }) => {
                    return (
                        <RecipeCard
                            recipe={item}
                            onPress={()=> navigation.navigate("Recipe", { recipe: item })}
                        />
                    );
                }}
                style={{
                    padding: sizes.padding,
                }}
            >
            </FlatList>
        </SafeAreaView>
    );
}

export default Home;