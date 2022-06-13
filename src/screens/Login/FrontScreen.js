import React, {useEffect} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    Image,
    Button,
    TouchableOpacity,
    ImageBackground,
    StatusBar
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as Animatable from 'react-native-animatable';
import AsyncStorage from "@react-native-async-storage/async-storage";

function FrontScreen({navigation}) {

    useEffect(async () => {
            if (await AsyncStorage.getItem('TOKEN')) {
                navigation.navigate('Home');
            }
        }
    )

        const goToLogin = async () => {
            navigation.navigate('LogInScreen');
        }

        return (
            <View style={styles.container}>
                <ImageBackground
                    source={require("../../assets/golfer_bg.jpeg")}
                    style={styles.image}
                    resizeMode="cover">
                    <View style={{flex: 3}}>
                        <StatusBar backgroundColor="transparent" translucent barStyle='light-content'/>
                    </View>
                    <Animatable.View
                        style={styles.footer}
                        animation="fadeInUpBig"
                    >
                        <Text style={styles.title}>Sign in with your account</Text>
                        <TouchableOpacity onPress={goToLogin} style={styles.button}>
                            <Text style={styles.textSign}>Login</Text>
                            <MaterialIcons
                                name="navigate-next"
                                color="#fff"
                                size={20}/>
                        </TouchableOpacity>
                    </Animatable.View>
                </ImageBackground>
            </View>
        );
    }

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    footer: {
        height:'35%',
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom:50
    },
    text: {
        color: 'grey',
        marginTop:5
    },
    button: {
        backgroundColor: '#4a8a3f',
        padding: "3%",
        alignSelf:"flex-end",
        width:"100%",
        height: 50,
        borderRadius:20,
        flexDirection:"row",
        justifyContent: 'center',
        alignItems: 'center',

    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    }
});

export default FrontScreen;
