import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

export default function FeedScreen({navigation}) {
        return (
            <WebView
                source={{
                    uri: 'https://www.golfdigest.com/'
                }}
                style={{ marginTop: 20 }}
            />
        );
}