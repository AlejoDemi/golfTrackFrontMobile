import React, {useState} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    Image,
    Button,
    TouchableOpacity,
    StatusBar,
    Platform,
    TextInput,
    ImageBackground,
    ActivityIndicator
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import * as Animatable from 'react-native-animatable';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {useMutation} from "@apollo/client";
import {gql, UseMutation} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SIGN_UP=gql`
mutation Mutation($input: AddPlayerInput) {
  addPlayer(input: $input) {
    id
    email
    fullname
  }
}

`

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

    const [id, setId] = useState('');
    const [signUp] = useMutation(SIGN_UP);

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const textInputChange = (val) => {
        if (/^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/.test(val)){
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

    const signUpPlayer = () => {
        setError('');
        setIsLoading(true);
        signUp({
            variables: {
                "input": {
                    "email": data.email,
                    "fullname": data.username,
                    "password": data.password,
                }
            },
            onCompleted: r => {
                setId(r.addPlayer.id);
                _storeUser();
                navigation.navigate('Home');
            },
        }).then(r => setIsLoading(false)).catch(e => {
            setIsLoading(false);
            setError(e.message);
        });
    }

    const _storeUser = async () => {
        try {
            await AsyncStorage.setItem('@user_id', id);
            await AsyncStorage.setItem('@user_name', data.username);
        } catch (e) {
            // saving error
            console.log("Couldn't save id")
        }
    };

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
                    <Text style={[styles.text_footer,{marginTop:35}]}>Full Name</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Enter your username..."
                            style={styles.textInput}
                            autoCapitalize="words"
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
                            secureTextEntry={data.secureTextEntryConfirm}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => handleConfirmPassword(val)}
                        />
                        <TouchableOpacity onPress={toggleConfirmSecureTextEntry}>
                            {data.secureTextEntryConfirm ?
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

                    <TouchableOpacity onPress={signUpPlayer} style={styles.button}>
                        <Text style={styles.textSign}>Sign Up</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.signIn,{
                        borderColor:'#4a8a3f',
                        borderWidth: 1,
                        marginTop: 15,
                    }]} onPress={() => navigation.navigate('LogInScreen')}>
                        <Text style={styles.textSignUp} >Log in</Text>
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
        flex: 7,
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

    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
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
