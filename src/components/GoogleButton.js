import React from 'react';
import * as Google from "expo-google-app-auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {saveId} from "../screens/Login/UserSlice";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {Text, TouchableOpacity, StyleSheet} from "react-native";
import {gql, useMutation} from "@apollo/client";
import {useDispatch} from "react-redux";

const IDP_LOGIN = gql`
mutation Mutation($input: IDPLoginInput) {
  idpLogin(input: $input){
      id
      token
  }
}`

const GoogleButton = (props) => {

    const dispatch = useDispatch();
    const [idpLogin, {data,loading}] = useMutation(IDP_LOGIN, {
        onCompleted: r => {
            dispatch(saveId(r.idpLogin.id));
        }
    });

    const handleGoogleSignIn = async () => {

        const config = {
            androidClientId: "718565700367-6gthmjbhrostj71uln11lnh2cjvjr8fr.apps.googleusercontent.com",
            iosClientId: "718565700367-o2hntq7frv29ukk5h8d1avt6afean9b2.apps.googleusercontent.com",
            scopes: ['profile', 'email'],
        }
        Google.logInAsync(config)
            .then(async (res) => {
                const {type, user} = res;
                if (type === 'success') {
                    console.log('Google signin success');
                    console.log(user);
                    // Handle back
                    await idpLogin({
                        variables: {
                            "input": {
                                "service": 'google',
                                "email": user.email,
                                'fullName': user.name,
                            }
                        },
                    }).then(r => {
                            AsyncStorage.setItem('TOKEN', r.data.loginPlayer.token);
                            AsyncStorage.setItem('PLAYER_ID', r.data.loginPlayer.id);
                            navigation.navigate('Home')
                        }
                    ).catch(e => {
                        console.log(e);
                    })
                } else {
                    console.log('Google signIn cancelled');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <TouchableOpacity onPress={handleGoogleSignIn} style={styles.googleButton}>
            <FontAwesome5
                name="google"
                color="#fff"
                size={20}/>
            <Text style={styles.googleText}>Sign in with Google</Text>
        </TouchableOpacity>
    );
}

export default GoogleButton;

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