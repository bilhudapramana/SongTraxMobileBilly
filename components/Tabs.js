import React from "react";
import { View, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";

import Home from "../screens/Home";
import Bookmark from "../screens/Bookmark";
import PhotoPicker from "../screens/PhotoPicker";

import { colors, sizes } from "../data/theme";
import icons from "../data/icons";
import ShowMap from "../screens/Map";
/**
 * TabIcon component
 * 
 * @param {Object} props - The properties object.
 * @param {boolean} props.focused - Whether the tab icon is currently focused.
 * @param {any} props.icon - The icon to be displayed.
 *
 * @returns {React.Element} An icon for a tab.
 */
function TabIcon({ focused, icon }) {
    return (
        <View
            style={{
                alignItems: "center",
                justifyContent: "center",
                height: 80,
                width: 50,
            }}
        >
            <Image
                source={icon}
                resizeMode="contain"
                style={{
                    width: 30,
                    height: 30,
                    tintColor: focused ? colors.white : colors.lightLime,
                }}
            />
        </View>
    );
}

const Tab = createBottomTabNavigator();

/**
 * tabOptions function
 * 
 * @param {any} icon - The icon to be displayed.
 *
 * @returns {Object} Tab options configuration object.
 */
function tabOptions(icon) {
    return {
        tabBarBackground: () => (
            <LinearGradient
                colors={[colors.purpleColorLighter, colors.blueColorDarker]}
                style={{
                    flex: 1,
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                }}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
            />
        ),
        tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icon} />,
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.lightLime,
        tabBarStyle: {
            height: 70,
            padding: sizes.padding,
            backgroundColor: colors.darkGreen,
        },
        tabBarLabelStyle: {
            padding: sizes.padding / 2,
        },
    };
}

/**
 * Tabs component
 * 
 * @param {Object} props - The properties object.
 * @param {Function} props.navigation - The navigation object.
 * @param {Array<Object>} props.recipes - Array of recipe objects.
 * @param {Function} props.setRecipes - Function to set the recipes.
 *
 * @returns {React.Element} A tab navigator component.
 */
function Tabs({ navigation, recipes, setRecipes }) {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                children={() => <Home navigation={navigation} recipes={recipes} />}
                options={() => tabOptions(icons.tabmapdarkpurple)}
            />
            <Tab.Screen
                name="ShowMap"
                children={() => <ShowMap />}
                options={() => tabOptions(icons.tabmapdarkpurple)}
            />
            <Tab.Screen
                name="Profile"
                children={() => <PhotoPicker navigation={navigation} />}
                options={() => tabOptions(icons.tabprofiledarkpurple)}
            />
        </Tab.Navigator>
    );
}

export default Tabs;