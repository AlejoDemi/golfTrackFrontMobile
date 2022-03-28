import React, {useState} from 'react';
import {View, StyleSheet, Text, Dimensions, Image, Button, TouchableOpacity,StatusBar,Platform,TextInput, ImageBackground} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import * as Animatable from 'react-native-animatable';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

function SignUpScreen({navigation}) {
    const [data, setData] = useState({
        username:'',
        email:'',
        password:'',
        confirmpassword:'',
        check_textInputChange: false,
        check_emailInputChange: false,
        secureTextEntry: true,
        secureTextEntryConfirm: true,
    });

    const textInputChange = (val) => {
        if (val.length !== 0){
            setData({
                ...data,
                email:val,
                check_emailInputChange:true,
            })
        }else{
            setData({
                ...data,
                email:val,
                check_emailInputChange:false,
            })
        }

    }

    const userInputChange = (val) => {
        if (val.length !== 0){
            setData({
                ...data,
                username:val,
                check_textInputChange:true,
            })
        }else{
            setData({
                ...data,
                username:val,
                check_textInputChange:false,
            })
        }

    }

    const handlePassword = (val) => {
        setData({
            ...data,
            password:val,
        })
    }

    const toggleSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry:!data.secureTextEntry,
        })
    }

    const handleConfirmPassword = (val) => {
        setData({
            ...data,
            confirmpassword:val,
        })
    }

    const toggleConfirmSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntryConfirm:!data.secureTextEntryConfirm,
        })
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../assets/golfer_bg.jpeg")}
                style={styles.image}
                resizeMode="cover">
                <View style={{flex:1}}>
                    <StatusBar backgroundColor="transparent" translucent barStyle='light-content'/>
                </View>
                <Animatable.View
                    style = {styles.footer}
                    animation="fadeInUpBig"
                >
                    <Text style={[styles.text_footer,{marginTop:10}]}>Email</Text>
                    <View style={styles.action}>
                        <Feather
                            name="mail"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Enter your email..."
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChange(val)}
                        />
                        {data.check_emailInputChange ?
                            <Animatable.View
                                animation="bounceIn">
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}

                    </View>
                    <Text style={[styles.text_footer,{marginTop:35}]}>Username</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Enter your username..."
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => userInputChange(val)}
                        />
                        {data.check_textInputChange ?
                            <Animatable.View
                                animation="bounceIn">
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}

                    </View>
                    <Text style={[styles.text_footer,{marginTop:35}]}>Password</Text>
                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Enter your password..."
                            secureTextEntry={data.secureTextEntry}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => handlePassword(val)}
                        />
                        <TouchableOpacity onPress={toggleSecureTextEntry}>
                            {data.secureTextEntry ?
                                <Feather
                                    name="eye-off"
                                    color="grey"
                                    size={20}
                                /> :
                                <Feather
                                    name="eye"
                                    color="grey"
                                    size={20}
                                />
                            }

                        </TouchableOpacity>
                    </View>

                    <Text style={[styles.text_footer,{marginTop:35}]}>Confirm Password</Text>
                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Enter your password..."
                            secureTextEntry={data.secureConfirmTextEntry}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => handleConfirmPassword(val)}
                        />
                        <TouchableOpacity onPress={toggleConfirmSecureTextEntry}>
                            {data.secureConfirmTextEntry ?
                                <Feather
                                    name="eye-off"
                                    color="grey"
                                    size={20}
                                /> :
                                <Feather
                                    name="eye"
                                    color="grey"
                                    size={20}
                                />
                            }

                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate('LogInScreen')} style={styles.button}>
                        <Text style={styles.textSign}>Log In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.signIn,{
                        borderColor:'#4a8a3f',
                        borderWidth: 1,
                        marginTop: 15,
                    }]}>
                        <Text style={styles.textSignUp}>Sign Up</Text>
                    </TouchableOpacity>
                </Animatable.View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        backgroundColor: '#4a8a3f',
        padding: "3%",
        height: 50,
        alignSelf:"flex-end",
        width:"100%",
        borderRadius:20,
        flexDirection:"row",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:35
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color:'white'
    },
    textSignUp: {
        fontSize: 18,
        fontWeight: 'bold',
        color:'#4a8a3f'
    }
});

export default SignUpScreen;