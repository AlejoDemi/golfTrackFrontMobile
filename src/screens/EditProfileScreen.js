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
import AsyncStorage from "@react-native-async-storage/async-storage";
//chala's code


export default function EditProfileScreen({navigation}) {

    const[name , setName] = useState("Alejo");
    const[email , setEmail] = useState("alejo@alejo");
    const[password , setPass] = useState("password");

    const logOut = async() => {
        await AsyncStorage.clear();
        navigation.navigate('FrontScreen');
    }

    return(

        <View style={styles.globalContainer}>
            <ImageBackground
                source={require("../assets/golfer_bg.jpeg")}
                style={styles.image}
                resizeMode="cover">
                <View style={{flex:1}}>
                    <StatusBar backgroundColor="transparent" translucent barStyle='light-content'/>
                </View>
                <Animatable.View style={styles.container} animation='fadeInUpBig'>
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

                    <View style={styles.buttons}>
                        <TouchableOpacity style={[styles.button,{backgroundColor:"firebrick",}]} onPress={logOut}>
                            <Text style={styles.buttonText}>Log Out</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, {backgroundColor:"#4a8a3f"}]}>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
            </ImageBackground>
        </View>

    );
}

const styles = StyleSheet.create({

    globalContainer:{
        flex: 1,
        backgroundColor:"#4a8a3f",
    },

    header:{
        flex: 1,
        display:"flex",
        justifyContent:"center",
        alignItems:"flex-start",
        backgroundColor:"#4a8a3f",
    },

    container:{
        flex: 4,
        height:"60%",
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-around",
        alignItems:"center",
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        backgroundColor:"whitesmoke"
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    label:{
       fontSize:15,
        alignSelf:"flex-start",
        marginLeft:"10%",
        marginBottom: 5,
        fontWeight:"bold",
        color: 'dimgray'
    },

    card:{
        elevation: 3,
        paddingLeft: 10,
        zIndex: 1,
        width:"80%",
        height:"25%",
        backgroundColor:"white",
        borderRadius:15,
        fontSize:15
    },

    buttons: {
        flexDirection: 'row',
        width: "75%",
        height:"10%",
        marginTop:"10%",
        marginBottom: "20%",
    },

    button:{
        flex: 1,
        borderRadius:10,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        margin: 7,
    },

    buttonText:{
       color:"white",
        fontSize:20,
        fontWeight:"bold"
    }


});

