import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity, Pressable } from 'react-native'
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import RNLocation from 'react-native-location';

export default function Home() {

    return(
        <View style={styles.container}
        >
          <Text style={
              {
                  alignSelf:"center",
                  justifyContent: "center",
                  padding:100,
                  fontSize:30,
              }
          }>Home</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#7fffd4",
        flex:1,
    },
});