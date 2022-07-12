import * as Facebook from "expo-facebook";
import {ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View} from "react-native";

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
    const [clicked, setClicked] = useState(false);
    const dispatch = useDispatch();
    const [idpLogin, {data,loading}] = useMutation(IDP_LOGIN, {
        onCompleted: r => {
            dispatch(saveId(r.idpLogin.id));
        }
    });

    const logIn =async () => {
        setClicked(!clicked);
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
            setClicked(!clicked);
        }
    }

    if(clicked){
        return(
            <View style={styles.loadingContainer}>
                <ActivityIndicator
                    color = '#4a8a3f'
                    size = "small"
                    style = {styles.activityIndicator}/>
            </View>
        );


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
    },

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    },
})


