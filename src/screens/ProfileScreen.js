import React, {useState} from 'react';
import {View, StyleSheet, Text, Dimensions, Image, Button, TouchableOpacity,StatusBar,Platform,TextInput, ImageBackground} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import * as Animatable from 'react-native-animatable';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function ForgotPasswordScreen() {

    const [activate, setActivate]= useState(true);

    const toggleBell = ()=>{
        setActivate(!activate);
    }
    return(
        <Animatable.View
            animation="fadeInUpBig" style={styles.container}>
            <View style={styles.horizontal}>
                <Text style={styles.tittle}>GolfTrack</Text>
                  <TouchableOpacity style={styles.bell} onPress={toggleBell}>
                      {activate?
                       <Feather
                           name="bell"
                           color="#05375a"
                           size={30}
                       />:
                          <Feather
                              name="bell-off"
                              color="#05375a"
                              size={30}
                          />}
                  </TouchableOpacity>
            </View>
            <View style={styles.picture}>
                <Feather
                    name="user"
                    color="#05375a"
                    size={100}
                    style={styles.image}
                />
                <Text style={styles.username}>Username</Text>
            </View>
        </Animatable.View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },

    tittle:{
        fontSize:30,
        fontWeight:"bold",
        color: '#05375a',
        marginLeft:10,
    },

    horizontal:{
        marginTop:10,
        flexDirection: 'row',
    },
    bell: {
        alignSelf:"flex-end",
        marginLeft:220,
    },

    picture:{
        flex:2,
        alignContent:"center",
    },

    image:{
        alignSelf:"center",
        marginTop:10,
    },

    username:{
        alignSelf:"center",
        fontSize:25,
        fontWeight:"bold",
        color: '#05375a',
        marginLeft:10,
    }


});

