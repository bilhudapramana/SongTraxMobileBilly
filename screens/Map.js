import React, { useState, useEffect } from "react";
import { StyleSheet, Appearance, View, SafeAreaView, Text, Image, Platform } from "react-native";
import MapView, { Circle, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from 'expo-location';
import { getDistance } from "geolib";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    nearbyLocationSafeAreaView: {
        backgroundColor: "black",
    },
    nearbyLocationView: {
        padding: 20,
    },
    nearbyLocationText: {
        color: "white",
        lineHeight: 25
    }
});

const colorScheme = Appearance.getColorScheme();

/**
 * ShowMap is a React component that displays a map 
 * with user's location and other locations fetched from 
 * a remote API. It also displays the nearest location 
 * within 100 meters from the user's location.
 *
 * @returns {JSX.Element} The rendered React component.
 */
export default function ShowMap() {
    const API_KEY = 'a3_demo';
    const API_BASE_URL = 'https://comp2140.uqcloud.net/api/';

    /**
     * Fetches location data from a remote API.
     *
     * @returns {Promise<Object[]>} A promise that resolves to an array of location objects.
     */
    const fetchLocations = async () => {
        const url = `${API_BASE_URL}location/?api_key=${API_KEY}`;
        const response = await fetch(url);
        return await response.json();
    };

    const [locations, setLocations] = useState([]);
    const [transformedLocations, setTransformedLocations] = useState([]);

    useEffect(() => {
        // Fetch remote locations
        const fetchAndSetLocations = async () => {
            try {
                const fetchedLocations = await fetchLocations();
                setLocations(fetchedLocations);
            } catch (error) {
                console.error("Error fetching locations:", error);
            }
        };
        fetchAndSetLocations();
    }, []);

    useEffect(() => {
        // Transform location data to include coordinates
        const updatedLocations = locations.map(location => {
            location.coordinates = {
                latitude: parseFloat(location.latitude),
                longitude: parseFloat(location.longitude),
            };
            return location;
        });
        setTransformedLocations(updatedLocations);
    }, [locations]);

    const initialMapState = {
        hasLocationPermission: true,
        userLocation: {
            latitude: -27.5263381,
            longitude: 153.0954163,
        },
        nearbyLocation: {},
        locations: transformedLocations,
    };

    const [mapState, setMapState] = useState(initialMapState);

    /**
     * Displays the nearest location to the user.
     *
     * @param {Object} props The properties passed to this component.
     * @param {string} props.id The id of the location.
     * @param {string} props.name The name of the location.
     * @param {Object} props.distance An object containing distance details.
     * @param {boolean} props.distance.isNearby True if the location is within 100 meters.
     *
     * @returns {JSX.Element|null} The rendered React component, or null if id is undefined.
     */
    function NearbyLocationDisplay(props) {
        if (typeof props.id !== "undefined") {
            return (
                <SafeAreaView style={styles.nearbyLocationSafeAreaView}>
                    <View style={styles.nearbyLocationView}>
                        <Text style={styles.nearbyLocationText}>
                            {props.name}
                        </Text>
                        {props.distance.isNearby &&
                            <Text style={{
                                ...styles.nearbyLocationText,
                                fontWeight: "bold"
                            }}>
                                Within 100 Metres!
                            </Text>
                        }
                    </View>
                </SafeAreaView>
            );
        }
    }

    /**
     * Calculates the nearest location to the user.
     *
     * @param {Object} userLocation The user's location.
     * @param {number} userLocation.latitude The latitude of the user's location.
     * @param {number} userLocation.longitude The longitude of the user's location.
     *
     * @returns {Object} The nearest location object.
     */
    function calculateNearestLocation(userLocation) {
        // Calculate the nearest location to the user
        const nearestLocations = mapState.locations.map(location => {
            const distance = getDistance(userLocation, location.coordinates);
            location.distance = {
                meters: distance,
                isNearby: distance <= 100,
            };
            return location;
        }).sort((previousLocation, thisLocation) => {
            return previousLocation.distance.meters - thisLocation.distance.meters;
        });
        return nearestLocations.shift();
    }
    
    useEffect(() => {
        // Update map state with transformed locations
        setMapState(prevState => ({
            ...prevState,
            locations: transformedLocations,
        }));
    }, [transformedLocations]);

    useEffect(() => {
        // Request location permission
        async function requestLocationPermission() {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                setMapState(prevState => ({
                    ...prevState,
                    hasLocationPermission: true
                }));
            }
        }
        requestLocationPermission();
    }, []);

    const [nearbyLocation, setNearbyLocation] = useState(null);

    useEffect(() => {
        // Update nearby location when available
        if (mapState.nearbyLocation) {
            setNearbyLocation(mapState.nearbyLocation);
        }
    }, [mapState.nearbyLocation]);

    useEffect(() => {
        // Watch user's location and find nearest location
        if (mapState.hasLocationPermission && transformedLocations.length > 0) {
            const subscription = Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    distanceInterval: 10,
                },
                location => {
                    const userLocation = {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    };
                    const nearest = calculateNearestLocation(userLocation);
                    setNearbyLocation(nearest);
                    setMapState(prevState => ({
                        ...prevState,
                        userLocation,
                        nearbyLocation: nearest,
                    }));
                }
            );

            return () => {
                if (subscription && subscription.remove) {
                    subscription.remove();
                }
            };
        }
    }, [mapState.hasLocationPermission, transformedLocations, mapState.nearbyLocation, nearbyLocation]);

    return (
        <>
            <MapView
                camera={{
                    center: mapState.userLocation,
                    pitch: 0,
                    heading: 0,
                    altitude: 3000,
                    zoom: 15
                }}
                showsUserLocation={mapState.hasLocationPermission}
                style={styles.container}
                provider={PROVIDER_GOOGLE}
            >
                {mapState.locations.map(location => (
                    <Circle
                        key={location.id}
                        center={location.coordinates}
                        radius={100}
                        strokeWidth={3}
                        strokeColor="#A42DE8"
                        fillColor={colorScheme === "dark" ? "rgba(128,0,128,0.5)" : "rgba(210,169,210,0.5)"}
                    />
                ))}
            </MapView>

            <NearbyLocationDisplay {...mapState.nearbyLocation} />
        </>
    );
}
