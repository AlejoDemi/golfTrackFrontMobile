import React from 'react';
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Leaderboard from 'react-native-leaderboard';
import Feather from "react-native-vector-icons/Feather";

//chala

function GameSetUpScreen({navigation}) {
    const state = {
        data: [
            {userName: 'Fede', highScore: 52},
            {userName: 'TigerWoods', highScore: 120},
            {userName:  'AlejoDemi' , highScore: 67},
            {userName: 'Chala', highScore:40},

        ]
    }

    const sort = (data) => {
        return data && data.sort((item1, item2) => {
            return item1.highScore - item2.highScore;
        });
    }

    const goBack = () => {
        navigation.goBack();
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <ImageBackground style={styles.image}
                source={require("../assets/course.jpg")}
                >
                    <View style={styles.horizontal}>
                        <TouchableOpacity style={styles.back} onPress={goBack}>
                            <Feather
                                name="arrow-left"
                                color="white"
                                size={30}
                            />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
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
                            marginTop:5,
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
                             labelBy='userName'
                             sort={sort}
                    />
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
        flex:1,
    },

    footer:{
        flex:4,
    },

    tittle:{
        fontWeight:"bold",
        fontSize:30,
        alignSelf:"center",
        marginTop:20,
        color: '#05375a',
    },

    horizontal:{
        marginTop:0,
        flexDirection: 'row',
        //flex:2,
    },
    back: {
        marginLeft: 20,
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
