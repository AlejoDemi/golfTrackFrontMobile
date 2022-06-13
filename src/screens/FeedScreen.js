import React, {Component, useEffect, useState} from 'react';
import { WebView } from 'react-native-webview';
import {ActivityIndicator, Platform, View, StyleSheet, StatusBar, Text} from "react-native";

export default function FeedScreen({navigation}) {

    return (
        <>
            <StatusBar backgroundColor="transparent" translucent barStyle='dark-content'/>
            <WebView
                source={{
                    uri: 'https://noestadada.com/'
                }}
                style={Platform.OS === 'ios' ? { marginTop: 20 }: {marginTop:30}}
            />
        </>
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