// Import necessary modules from React, React Native, and Expo
import React, { useState } from 'react';
import { SafeAreaView, View, Image, Dimensions, Text, Button, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// Get the screen width and height for styling
const { width, height } = Dimensions.get('window');

// Define the styles for the components
const styles = {
    container: {
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subheader: {
        fontSize: 20,
        marginBottom: 20,
    },
    photoFullView: {
        marginBottom: 20,
    },
    photoEmptyView: {
        borderWidth: 3,
        borderRadius: 10,
        borderColor: '#999',
        borderStyle: 'dashed',
        width: '100%',
        height: height / 2,
        marginBottom: 20,
    },
    photoFullImage: {
        width: '100%',
        height: height / 2,
        borderRadius: 10,
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    inputView: {
        borderColor: '#999',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
};

/**
 * PhotoPicker component
 *
 * @returns {React.Element} A screen allowing user to select an image, change it or remove it.
 */
export default function PhotoPicker() {
    // State to hold the photo details
    const [photoState, setPhotoState] = useState({});
    // State to hold the profile name
    const [nameState, setNameState] = useState('');

    /**
     * Function to handle photo selection using the Image Picker
     */
    async function handleChangePress() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // If the user didn't cancel and an image is selected, update the state
        if (!result.cancelled && result.assets && result.assets.length > 0) {
            setPhotoState(result.assets[0]);
        }
    }

    /**
     * Function to remove the selected photo
     */
    function handleRemovePress() {
        setPhotoState({});
    }

    // Check if a photo has been selected
    const hasPhoto = Boolean(photoState.uri);

    /**
     * Component to display the selected photo or a placeholder
     *
     * @returns {React.Element} Image component or a placeholder.
     */
    function Photo() {
        if (hasPhoto) {
            return (
                <View style={styles.photoFullView}>
                    <Image style={styles.photoFullImage} resizeMode="cover" source={{ uri: photoState.uri }} />
                </View>
            );
        } else {
            return <View style={styles.photoEmptyView} />;
        }
    }

    // Main render of the App component
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.header}>Edit Profile</Text>
                <Text style={styles.subheader}>Mirror Mirror On the Wall..</Text>
                <Photo />
                <View style={styles.buttonView}>
                    <Button onPress={handleChangePress} title={hasPhoto ? 'Change Photo' : 'Add Photo'} />
                    {hasPhoto && <Button onPress={handleRemovePress} title="Remove Photo" />}
                </View>
                <View style={styles.inputView}>
                    <TextInput placeholder="Enter profile name" value={nameState} onChangeText={setNameState} />
                </View>
            </View>
        </SafeAreaView>
    );
}