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

    const[name , setName] = useState("Alejo");
    const[email , setEmail] = useState("alejo@alejo");
    const[password , setPass] = useState("password");



    return(

        <View style={styles.globalContainer}>
            <View style={styles.header}>
            </View>
            <View style={styles.container}>
                <View style={{height:"33%",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <Text style={styles.label}>USERNAME</Text>
                    <TextInput style={styles.card} >{name}</TextInput>
                </View>
                <View style={{height:"33%",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <Text style={styles.label}>EMAIL</Text>
                    <TextInput style={styles.card}>{email}</TextInput>
                </View>
                <View style={{height:"33%",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <Text style={styles.label}>PASSWORD</Text>
                    <TextInput style={styles.card}  secureTextEntry={true}>{password}</TextInput>
                </View>


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

    globalContainer:{
        height:"100%",
        backgroundColor:"#4a8a3f",
    },

    header:{
        height:"16%",
        display:"flex",
        justifyContent:"center",
        alignItems:"flex-start",
        backgroundColor:"#4a8a3f",
    },

    container:{
        height:"60%",
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-around",
        alignItems:"center",
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        backgroundColor:"white"
    },

    footer:{
        height:"30%",
        display:"flex",
        justifyContent:"flex-start",
        alignItems:"center",
        backgroundColor:"white"
    },

    label:{
       fontSize:20,
        alignSelf:"flex-start",
        marginLeft:"10%",
        fontWeight:"bold"
    },

    card:{
        width:"80%",
        height:"40%",
        backgroundColor:"white",
        borderRadius:10,
        borderStyle:"solid",
        borderWidth:2,
        borderColor:"#4a8a3f",
        fontSize:25
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

