import React, {useState} from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity, Pressable ,Image} from 'react-native';

export default function ForgotPassword() {

    const [showIcon, setShowIcon] =useState(false);
    const toggleIcon=()=>{
        setShowIcon(true);
    }

    return(
        <View style={styles.container}>
            <View style={styles.topView}>
            <Image source={require('../assets/forgotPass.png')}
                   style={styles.image}/>
            </View>
            <View style={styles.midView}>

                <Text style={styles.tittle}>Forgot your password? </Text>
                <Text style={styles.subtitle}>Press "send" to recieve an email and recover your password.</Text>
                <TouchableOpacity style={styles.button}
                                  onPress={toggleIcon}>
                    <Text style={styles.send}>SEND</Text>
                </TouchableOpacity>

            </View>
            <View style={styles.bottomView}>
                {showIcon? (<Image source={require('../assets/confirm.png')}
                                   style={styles.confirmImage}/>):null}
                {showIcon? (<Text style={styles.subtitle}>Check your mailbox</Text>):null}
            </View>
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
        flex:0.3
    },

    midView:{
        flex:0.4
    },

    bottomView:{
        flex:0.3
    },

    tittle:{
        fontSize:30,
        fontWeight:"bold",
        justifyContent:"center",
        alignSelf:"center",
        marginTop:10,

    },

    subtitle:{
        fontSize:25,
        fontWeight:"300",
        justifyContent:"center",
        alignSelf:"center",
        marginTop:30,
    },

    image:{
        width:100,
        marginTop:90,
        alignSelf:"center",
        flex:0.78
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
    },
    confirmImage: {
        height:"100%",
        width:"27%",
        marginTop:10,
        alignSelf:"center",
        flex:0.57,
    }
});
