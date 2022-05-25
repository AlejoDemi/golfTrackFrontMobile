import React, {useState} from 'react';
import {View, StyleSheet, Text, Dimensions, Image, Button, TouchableOpacity,StatusBar,Platform,TextInput, ImageBackground,ActivityIndicator,Keyboard} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import * as Animatable from 'react-native-animatable';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {gql, useMutation} from "@apollo/client";

const LOGIN = gql`
    mutation Mutation($input: LoginPlayerInput) {
  loginPlayer(input: $input) {
    token
  }
}   `

function LogInScreen({navigation}) {


    const [data, setData] = useState({
        email:'',
        password:'',
        check_textInputChange: false,
        secureTextEntry: true,
    });

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [login] = useMutation(LOGIN);

    const textInputChange = (val) => {
        if (/^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/.test(val)){
            setData({
                ...data,
                email:val,
                check_textInputChange:true,
            })
        }else{
            setData({
                ...data,
                email:val,
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

    const loginUser=async () => {
        Keyboard.dismiss();
        setError('');
        setIsLoading(true);
        await login({
            variables:{
                "input": {
                    "email": data.email ,
                    "password": data.password,
                }
            },
        }).then(() => {
            setIsLoading(false)
        navigation.navigate('Home')}).catch(e =>{
            setIsLoading(false);
            setError(e.message);
        });
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../../assets/golfer_bg.jpeg")}
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
                            size={Platform.OS==='ios'? 30: 20}
                        />
                        <TextInput
                        placeholder="Enter your email..."
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                        keyboardType="email-address"
                        />
                        {data.check_textInputChange ?
                            <Animatable.View
                                animation="bounceIn">
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={Platform.OS==='ios'? 30: 20}
                                />
                            </Animatable.View>
                            : null}

                    </View>
                    <Text style={[styles.text_footer,{marginTop:35}]}>Password</Text>
                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color="#05375a"
                            size={Platform.OS==='ios'? 30: 20}
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
                                    size={Platform.OS==='ios'? 30: 20}
                                /> :
                                <Feather
                                    name="eye"
                                    color="grey"
                                    size={Platform.OS==='ios'? 30: 20}
                                />
                            }

                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={loginUser} >
                        <Text style={styles.textSign}>Log In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')} style={[styles.signIn,{
                        borderColor:'#4a8a3f',
                        borderWidth: 1,
                        marginTop: 15,
                    }]}>
                        <Text style={styles.textSignUp}>Sign Up</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.forgotPass} onPress={() => navigation.navigate('ForgotPass')}>
                        <Text style={styles.forgotPassText}>Forgot Password?</Text>

                    </TouchableOpacity>

                    {
                        isLoading &&
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator
                                color = '#4a8a3f'
                                size = "large"
                                style = {styles.activityIndicator}/>
                        </View>
                    }

                    {
                        error === '' ? (isLoading ? <ActivityIndicator /> : null) :
                        <View style={styles.errorMsg}>
                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                    }

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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 70
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
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
        backgroundColor: '#a63721',
        padding: "3%",
        height: 40,
        alignSelf:"flex-end",
        width:"100%",
        borderRadius:20,
        flexDirection:"row",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:35
    },
    errorText: {
        color: 'white',
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
    },

    forgotPass: {
        marginTop:25,
        alignSelf:"flex-end",
    },
    forgotPassText: {
        textDecorationLine: 'underline',
        fontSize:17,
        color:'grey',
    },
});

export default LogInScreen;
