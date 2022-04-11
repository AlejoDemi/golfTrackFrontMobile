import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import { Searchbar } from 'react-native-paper';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import Leaderboard from 'react-native-leaderboard';
//hola

function GameSetUpScreen({navigation}) {
    state = {
        data: [
            {userName: 'Fede', highScore: 52},
            {userName: 'TigerWoods', highScore: 120},
            {userName:  'AlejoDemi' , highScore: 67},
        ]
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <ImageBackground style={styles.image}
                source={require("../assets/course.jpg")}
                />
            </View>
            <View style={styles.footer}>
                <Text style={styles.tittle}>Pacheco Golf</Text>
                <View style={styles.rate}>
                    <MaterialIcons style={styles.star}
                             name="star"
                             color='#ffd700'
                             size={35}/>
                    <Text style={
                        {
                            fontSize: 30,
                            marginLeft:20,
                            color: '#05375a',
                        }
                    }>3.5</Text>
                </View>
                <TouchableOpacity style={styles.playButton}>
                    <Text style={
                        {
                           color:"white",
                           alignSelf:"center",
                            marginTop:10,
                            fontSize: 25,

                        }
                    }> Play</Text>
                </TouchableOpacity>

                <Text style={{
                    fontWeight:"bold",
                    fontSize:25,
                    alignSelf:"center",
                    marginTop:20,
                    color: '#05375a',
                }}>Leaderboard</Text>
                <View style={{flex:1,width:"90%",alignSelf:"center",marginTop:10}}>
                <Leaderboard style={{alignSelf:"center"}}
                    data={state.data}
                    sortBy='highScore'
                    labelBy='userName'/>
                </View>
            </View>

        </View>
    );
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
    },

    header:{
        flex:2,
    },

    footer:{
        flex:7,
    },

    tittle:{
        fontWeight:"bold",
        fontSize:30,
        alignSelf:"center",
        marginTop:20,
        color: '#05375a',
    },

    star:{
        alignSelf: "center",
    },

    rate:{
        flexDirection:"row",
        alignContent:"center",
        width:"30%",
        alignSelf:"center",
        marginTop:10,
    },

    playButton:{
        width:"40%",
        backgroundColor: '#4a8a3f',
        alignSelf:"center",
        height:"8%",
        borderRadius:20,
        marginTop: 10,
    },

    image:{
        flex: 1,
        justifyContent: "center"
    }
});

export default GameSetUpScreen;
