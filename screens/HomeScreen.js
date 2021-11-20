import React, { Component } from "react";
import { View, Text } from "react-native";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    useColorScheme,
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

// Icon.loadFont();

class HomeScreen extends Component {

    render() {
        return (
            <SafeAreaView>
                <View>
                    <Text>HomeScreen</Text>
                    <FontAwesomeIcon icon={faHome} size={50} />
                </View>
            </SafeAreaView>
        );
    }
}

export default HomeScreen;