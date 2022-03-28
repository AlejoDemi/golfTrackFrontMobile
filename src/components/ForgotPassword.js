import React, {useState} from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity, Pressable ,Image} from 'react-native';

export default function ForgotPassword() {
    return(
        <View style={styles.container}
        >
            <View style={styles.topView}/>
            <Image source={require('../assets/forgotPass.png')}
                   style={styles.image}/>
            <Text style={styles.tittle}>Forgot your password? </Text>
            <Text style={styles.subtitle}>Press "send" to reciebe an email and recover your password.</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.send}>SEND</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#fff",
        flex:1,
    },

    send:{
        fontSize:20,
        justifyContent:"center",
        alignSelf:"center",
    },

    topView:{
        flex:0.2
    },

    tittle:{
        fontSize:30,
        fontWeight:"bold",
        justifyContent:"center",
        alignSelf:"center",
        marginTop:30,

    },

    subtitle:{
        fontSize:25,
        fontWeight:"300",
        justifyContent:"center",
        alignSelf:"center",
        marginTop:30,
    },

    image:{
        height:100,
        width:100,
        marginTop:70,
        alignSelf:"center",
        flex:0.24,
    },

    button:{
        alignItems: "center",
        backgroundColor: "#9acd32",
        padding: "5%",
        alignSelf:"center",
        width:"40%",
        marginTop:50,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
    }
});
