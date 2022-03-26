import { StyleSheet, Text, View,TextInput,TouchableOpacity, Pressable } from 'react-native';
import React, {useState} from 'react';



export default function LogIn() {
    const [user, setUser] =useState("");
    const [pass,setPass] =useState("");

    return (
        <View style={styles.container}>
            <View style={styles.top}>
            <Text style={styles.tittle}> GOLF TRACK </Text>
            </View>

            <View style={styles.middle}>
                <Text style={styles.label}> Username</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setUser}
                    value={user}
                    placeholder="Username"/>

                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setPass}
                    value={pass}
                    placeholder="Password"
                    autoCapitalize='none'
                    autoCorrect={false}
                    textContentType='newPassword'
                    enablesReturnKeyAutomatically/>
                <TouchableOpacity style={styles.submitButton}>
                    <Text style={styles.login}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.forgotPassButton}>
                    <Text style={
                        {
                            fontSize: 20,
                        }
                    }>Forgot your password?</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.newAccountButton}>
                <TouchableOpacity style={styles.button}>
                    <Text style={
                        {
                            fontSize: 20,
                            textDecorationLine: 'underline'
                        }
                    }>Create a new account</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        width: 400,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        alignSelf:"center",

    },

    label:{
        fontSize: 20,
        fontWeight: "300",
        alignSelf:"center",

    },

    submitButton: {
        alignItems: "center",
        backgroundColor: "#9acd32",
        padding: "3%",
        alignSelf:"center",
        width:"40%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
    },

    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#fff",
        padding: 10,

    },
    top: {
        flex: 0.2,
        backgroundColor: "#fff",

    },
    middle: {
        flex: 0.5,
        backgroundColor: "#fff",

    },
    bottom: {
        flex: 0.1,
        backgroundColor: "#fff",

    },
    tittle: {
        alignSelf:"center",
        fontSize: 30,
        fontWeight: "bold",
        marginTop:50,
    },

    forgotPassButton: {
        alignItems: "center",
        padding: 10,
        alignSelf:"center",
        width:300,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        marginTop:5,
    },
    newAccountButton: {
        alignItems: "center",
        padding: 10,
        alignSelf:"center",
        width:300,
        marginTop:100,
    },
    login: {
        fontSize:20,
    }


});
