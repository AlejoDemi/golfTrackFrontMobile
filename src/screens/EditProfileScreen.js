import React, {useEffect, useState} from 'react';
import {Modal,View, StyleSheet, Text, Dimensions, Image, Button, TouchableOpacity,StatusBar,Platform,TextInput, ImageBackground,ScrollView} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import * as Animatable from 'react-native-animatable';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as Haptics from "expo-haptics";
import * as ImagePicker from "expo-image-picker";
import NumericInput from 'react-native-numeric-input'
import {gql} from "@apollo/client";
//chala's code


export default function EditProfileScreen({navigation}) {

    const[name , setName] = useState("");
    const[email , setEmail] = useState("");
    const[password , setPass] = useState("");



    return(
        <View>
            <View style={styles.header}>
            </View>
            <View style={styles.container}>
                <TextInput style={styles.card}></TextInput>
                <TextInput style={styles.card}></TextInput>
                <TextInput style={styles.card}></TextInput>
            </View>

            <View style={styles.footer}>
                    <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>
                                SAVE
                            </Text>
                    </TouchableOpacity>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({

    header:{
        height:"10%",
        display:"flex",
        justifyContent:"center",
        alignItems:"flex-start"
    },

    container:{
        height:"60%",
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-around",
        alignItems:"center"
    },

    footer:{
        height:"30%",
        display:"flex",
        justifyContent:"flex-start",
        alignItems:"center",
    },

    card:{
        width:"80%",
        height:"12%",
        backgroundColor:"white",
        borderRadius:10,
        borderStyle:"solid",
        borderWidth:2,
        borderColor:"#4a8a3f"
    },

    button:{
        backgroundColor:"#4a8a3f",
        height:"20%",
        width:"25%",
        borderRadius:10,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        marginTop:"10%",
    },

    buttonText:{
       color:"white",
        fontSize:20,
        fontWeight:"bold"
    }


});

