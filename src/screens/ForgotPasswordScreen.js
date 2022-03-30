import React, {useState} from 'react';
import {View, StyleSheet, Text, Dimensions, Image, Button, TouchableOpacity,StatusBar,Platform,TextInput, ImageBackground} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import * as Animatable from 'react-native-animatable';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as Haptics from "expo-haptics";

export default function ForgotPasswordScreen() {

    const [sent, setSent] = useState(false);
    const [email,setEmail] =useState('');


    const toggleSentMessage = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        setSent(true);
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
                  <View style={styles.initialView}>
                    <Text style={[styles.text_tittle,{marginTop:10}]}>Forgot your password?</Text>

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
                          onChangeText={(val) => setEmail(val)}
                      />
                      </View>
                    <View>
                        <Text style={styles.subtitle}>Press "Send" to recieve an email and recover it!</Text>

                    </View>


                    <TouchableOpacity style={styles.button} onPress={toggleSentMessage}>
                        <Text style={styles.textSign}>Send</Text>
                    </TouchableOpacity>
                  </View>

                    <View
                        style = {styles.initialView}
                        animation="fadeInUpBig">

                        {sent?
                        <Animatable.View
                            animation="rotate" style={styles.checkIcon}>
                            <Feather
                                name="check-circle"
                                color="#05375a"
                                size={100}
                                />
                        </Animatable.View> :null
                        }
                        {sent?
                            <Animatable.Text
                                animation="bounceIn" style={styles.text_tittle}>
                                Check your mailbox!
                            </Animatable.Text> :null
                        }
                    </View>

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

    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },

    action: {
        flexDirection: 'row',
        marginTop: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
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
    text_tittle: {
        marginTop: 10,
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf:"center",
    },
    subtitle: {
        marginTop: 30,
        fontSize:20,
        alignSelf:"center",
        justifyContent:"center",
    },
    initialView: {
        flex:1,
    },
    checkIcon: {
        alignSelf:"center",
    }


});


