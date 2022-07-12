import * as Facebook from "expo-facebook";
import {Alert, StyleSheet, Text} from "react-native";

import React, {useState} from 'react';
import {View} from "react-native";
import {TouchableOpacity} from "react-native-web";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {gql, useMutation} from "@apollo/client";
import {useDispatch} from "react-redux";
import {saveId} from "../screens/Login/UserSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";


const IDP_LOGIN = gql`
mutation Mutation($input: IDPLoginInput) {
  idpLogin(input: $input){
      id
      token
  }
}`
export const FacebookLogin = () => {
    const dispatch = useDispatch();
    const [idpLogin, {data,loading}] = useMutation(IDP_LOGIN, {
        onCompleted: r => {
            dispatch(saveId(r.idpLogin.id));
        }
    });

    const logIn =async () => {
        try {
            await Facebook.initializeAsync({
                appId: '1758858884454657',
            });
            const {type, token} =
                await Facebook.logInWithReadPermissionsAsync({
                    permissions: ['public_profile'],
                });
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                fetch(`https://graph.facebook.com/me?access_token=${token}`)
                    .then(response => response.json())
                    .then(data => {
                        AsyncStorage.setItem('TOKEN', data.data.loginPlayer.token);
                        AsyncStorage.setItem('PLAYER_ID', data.data.loginPlayer.id);
                        navigation.navigate('Home')
                    })
                Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
            } else {
                // type === 'cancel'
            }
        } catch ({message}) {
            alert(`Facebook Login Error: ${message}`);
        }
    }

    return (
        <TouchableOpacity onPress={logIn} style={styles.googleButton}>
            <FontAwesome5
                name="facebook"
                color="#fff"
                size={20}/>
            <Text style={styles.googleText}>Sign in with Facebook</Text>
        </TouchableOpacity>
    );
}



const styles = StyleSheet.create({
    googleButton: {
        backgroundColor: '#4a8a3f',
        padding: "3%",
        alignSelf:"center",
        width:"100%",
        height: 50,
        borderRadius:20,
        flexDirection:"row",
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    googleText: {
        color: 'white',
        marginLeft: 20,
        fontWeight: 'bold'
    }
})


