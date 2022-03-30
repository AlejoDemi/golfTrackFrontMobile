import React, {useState} from 'react';
import {View, StyleSheet, Text, Dimensions, Image, Button, TouchableOpacity,StatusBar,Platform,TextInput, ImageBackground} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import * as Animatable from 'react-native-animatable';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function ForgotPasswordScreen({navigation}) {

    return(
        <Animatable.View
            animation="fadeInUpBig" style={styles.container}>
            <View style={styles.horizontal}>
                <Text style={styles.tittle}>GolfTrack</Text>
                  <TouchableOpacity style={styles.edit} onPress={() => navigation.navigate('EditProfile')}>
                       <Feather
                           name="edit"
                           color="#05375a"
                           size={30}
                       />
                  </TouchableOpacity>
            </View>
            <View style={styles.picture}>
                <Feather
                    name="user"
                    color="#05375a"
                    size={100}
                    style={styles.image}
                />
                <View>
                    <Text style={styles.username}>Username</Text>
                    <Text style={styles.data}>country</Text>
                    <Text style={styles.data}>your bio</Text>
                </View>
                <View style={styles.stats}>
                    <View style={styles.statsLeft}>
                        <Text style={styles.username}>83.0</Text>
                        <Text style={styles.chartLabels}>AVG SCORE</Text>
                    </View>
                    <View style={styles.statsCenter}>
                        <Text style={styles.username}>35</Text>
                        <Text style={styles.chartLabels}>ROUNDS</Text>
                    </View>
                    <View style={styles.statsRight}>
                        <Text style={styles.username}>7.2</Text>
                        <Text style={styles.chartLabels}>HANDICAP</Text>
                    </View>
                </View>
            </View>
        </Animatable.View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:20,
    },

    tittle:{
        fontSize:30,
        fontWeight:"bold",
        color: '#05375a',
        marginLeft:10,
    },

    horizontal:{
        marginTop:50,
        flexDirection: 'row',
        //flex:2,
    },
    edit: {
        alignSelf:"flex-end",
        marginLeft:220,
    },

    picture:{
        flex:2,
        alignContent:"center",
        marginTop:50
    },

    image:{
        alignSelf:"center",
        marginTop:10,
    },

    username:{
        alignSelf:"center",
        fontSize:25,
        fontWeight:"bold",
        color: '#05375a',
        marginLeft:10,
        marginTop:10,
    },

    data:{
        alignSelf:"center",
        fontSize:20,
        fontWeight:"300",
        color: '#05375a',
        marginLeft:10,
        marginTop:10,
    },

    stats: {
        flexDirection:"row",
        flex:2,
        flexWrap: 'wrap',
        marginTop:20
    },

    statsLeft:{
        alignSelf:"flex-start",
        flex:1,
        marginLeft:30,
        alignContent:"center",
        marginRight:10
    },

    statsCenter:{
        alignSelf:"center",
        flex:1,
        alignContent:"center",
        marginRight:10
    },

    statsRight:{
        alignSelf:"flex-end",
        flex:1,
        alignContent:"center",
        marginRight:30,
    },

    chartLabels:{
        fontSize:15,
        alignSelf:"center",
    }


});



