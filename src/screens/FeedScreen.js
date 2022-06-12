import React, {Component, useState} from 'react';
import { WebView } from 'react-native-webview';
import {ActivityIndicator, Platform, View, StyleSheet} from "react-native";

export default function FeedScreen({navigation}) {

    const [spinner, setSpinner] = useState(true);

    if (spinner){
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator
                    color = '#4a8a3f'
                    size = "large"
                    style = {styles.activityIndicator}/>
            </View>
        )
    }
        return (
            <WebView
                source={{
                    uri: 'https://www.austral.edu.ar/es/'
                }}
                onLoadEnd={() => setSpinner(false)}
                style={Platform.OS === 'ios' ? { marginTop: 20 }: {marginTop:30}}
            />
        );
}
const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 70
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    },
})