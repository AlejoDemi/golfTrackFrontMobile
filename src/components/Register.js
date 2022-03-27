import React, {useState} from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity, Pressable } from 'react-native';

export default function Register() {
    return(
        <View style={styles.container}
        >
            <Text style={
                {
                    alignSelf:"center",
                    justifyContent: "center",
                    padding:100,
                    fontSize:30,
                }
            }>Register</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#6495ed",
        flex:1,
    },
});