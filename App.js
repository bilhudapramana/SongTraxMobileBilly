import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Tabs from "./components/Tabs";
import Recipe from "./screens/Recipe";

import { colors } from "./data/theme";

const Stack = createStackNavigator();

function App() {
    const APIKEY = 'a3_demo';
    const BASE_URL = 'https://comp2140.uqcloud.net/api/';
    const getAllSamples = async () => {
        const url = `${BASE_URL}sample/?api_key=${APIKEY}`;
        const response = await fetch(url);
        return response.json();
    };

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Define and initialize isLoading

    useEffect(() => {
        const fetchSamples = async () => {
            setIsLoading(true); // Start loading
            const data = await getAllSamples();
            setData(data);
            setIsLoading(false); // End loading
        };
        fetchSamples();
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
                        children={props => <Tabs {...props} recipes={data}  />} 
                    />
                    <Stack.Screen
                        name="Recipe"
                        children={props => <Recipe {...props} recipes={data} />}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
}

export default App;
