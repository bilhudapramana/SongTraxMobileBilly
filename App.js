import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Tabs from "./components/Tabs";
import Recipe from "./screens/Recipe";

import { colors } from "./data/theme";

const Stack = createStackNavigator();

function App() {
    const API_KEY = 'a3_demo';
    const API_BASE_URL = 'https://comp2140.uqcloud.net/api/';

    const fetchAllSamples = async () => {
        const requestUrl = `${API_BASE_URL}sample/?api_key=${API_KEY}`;
        const response = await fetch(requestUrl);
        return response.json();
    };

    const [dataSong, setDataSong] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Define and initialize isLoading

    useEffect(() => {
        const allSamples = async () => {
            setIsLoading(true); // Start loading
            const data = await fetchAllSamples();
            setDataSong(data);
            setIsLoading(false); // End loading
        };
        allSamples();
    }, []);

    return (
        <SafeAreaView style={{ backgroundColor: colors.black, flex: 1 }}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                    initialRouteName={"Tabs"}
                >
                    <Stack.Screen
                        name="Tabs"
                        children={props => <Tabs {...props} recipes={dataSong}  />} 
                    />
                    <Stack.Screen
                        name="Recipe"
                        children={props => <Recipe {...props} recipes={dataSong} />}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
}

export default App;
