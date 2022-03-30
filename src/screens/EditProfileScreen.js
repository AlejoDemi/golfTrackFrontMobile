import React, {useState} from 'react';
import {View, StyleSheet, Text, Dimensions, Image, Button, TouchableOpacity,StatusBar,Platform,TextInput, ImageBackground} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import * as Animatable from 'react-native-animatable';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";


export default function ForgotPasswordScreen({navigation}) {
    return(
      <Animatable.View animation="fadeInRightBig" style={styles.container}>
              <View style={styles.card}>
                  <Text style={{color:"black"}}>Hola</Text>
              </View>

              <View style={styles.card}>
                  <Text style={{color:"black"}}>Hola</Text>
              </View>

              <View style={styles.card}>
                  <Text style={{color:"black"}}>chala</Text>
              </View>
      </Animatable.View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "white"
    },

    card:{
        flexDirection:"row",
        alignContent:"center",
        marginTop:30,
        borderRadius: 20,
        width:"90%",
        height:"10%",
        alignSelf:"center",
        backgroundColor: "white",
        shadowColor:"black",
        shadowOpacity:0.35,
        shadowOffset:{
            width:0,
            height:2,
        },
    }
});
