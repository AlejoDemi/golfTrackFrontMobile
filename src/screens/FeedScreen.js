import React, {Component, useEffect, useState} from 'react';
import { WebView } from 'react-native-webview';
import {ActivityIndicator, Platform, View, StyleSheet, StatusBar} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FeedScreen({navigation}) {

    const [spinner, setSpinner] = useState(true);
/*
    if (spinner){
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator
                    color = '#4a8a3f'
                    size = "large"
                    style = {styles.activityIndicator}/>
            </View>
        )
    }*/
    return (
        <View>
            <StatusBar backgroundColor="transparent" translucent barStyle='dark-content'/>
            <WebView
                source={{
                    uri: 'https://noestadada.com/'
                }}
                onLoad={(nativeEvent) => console.log('Hola')}
                style={Platform.OS === 'ios' ? { marginTop: 20 }: {marginTop:30}}
            />
        </View>
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