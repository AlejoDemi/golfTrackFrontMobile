import * as Facebook from "expo-facebook";
import {Alert, StyleSheet, Text, TouchableOpacity} from "react-native";

import React, {useState} from 'react';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {gql, useMutation} from "@apollo/client";
import {useDispatch} from "react-redux";
import {saveId} from "../screens/Login/UserSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";


const IDP_LOGIN = gql`
mutation Mutation($input: IDPLoginInput!) {
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
            const {type, token} = await Facebook.logInWithReadPermissionsAsync();
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email`)
                    .then(response => response.json())
                    .then(async data => {
                        console.log('Facebook signin success');
                        console.log(data);
                        // Handle back
                        await idpLogin({
                            variables: {
                                "input": {
                                    "service": 'facebook',
                                    "email": data.email,
                                    'fullName': data.name,
                                }
                            },
                        }).then(r => {
                                AsyncStorage.setItem('TOKEN', r.data.idpLogin.token);
                                AsyncStorage.setItem('PLAYER_ID', r.data.idpLogin.id);
                                props.navigation.navigate('Home')
                            }
                        ).catch(e => {
                            console.log(e);
                        })
                    })
            } else {
                // type === 'cancel'
            }
        } catch ({message}) {
            alert(`Facebook Login Error: ${message}`);
        }
    }

    return (
        <TouchableOpacity onPress={logIn} style={styles.facebookButton}>
            <FontAwesome5
                name="facebook"
                color="#fff"
                size={20}/>
            <Text style={styles.googleText}>Sign in with Facebook</Text>
        </TouchableOpacity>
    );
}



const styles = StyleSheet.create({
    facebookButton: {
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


