import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import { Searchbar } from 'react-native-paper';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";


function PlayScreen({navigation}) {
    const[searchCourse,setSearchCourse]=useState('');

    let onChangeSearch=(value)=>{
        setSearchCourse(value)
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <ImageBackground
                    source={require("../assets/fondo.jpg")}
                    style={styles.image}
                    resizeMode="cover"/>
            </View>

                <View style={styles.coursesContainer}>
                    <View style={{flex:1}}>

                        <Text style={styles.tittle}>Nearby courses</Text>

                    </View>

                    <View style={{flex:3,flexDirection:"row"}}>

                        <TouchableOpacity style={styles.courseBox}>
                            <MaterialIcons
                            name="golf-course"
                            color="#05375a"
                            size={20}
                            style={styles.icon}/>
                            <Text style={styles.cardText}> Pacheco Golf</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.courseBox}>
                            <MaterialIcons
                                name="golf-course"
                                color="#05375a"
                                size={20}
                                style={styles.icon}/>
                            <Text style={styles.cardText}> Pilar Golf</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.courseBox}>
                            <MaterialIcons
                                name="golf-course"
                                color="#05375a"
                                size={20}
                                style={styles.icon}/>
                            <Text style={styles.cardText}> Nordelta Golf Club</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            <Searchbar style={styles.searchBar}
                       placeholder="Search course"
                       onChangeText={(value) =>onChangeSearch(value)}
                       value={searchCourse}
            />
            <View style={styles.footer}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "white",
    },

    image: {
        flex: 1,
        justifyContent: "center"
    },

    tittle:{
        fontSize:25,
        color: '#05375a',
        alignSelf: "center",
        fontWeight:"bold",
        marginTop:5
    },

    searchBar:{
        marginTop:110,
        width:"90%",
        height:"8%",
        alignSelf:"center",
        borderRadius: 20,
    },

    cardText:{
        color: '#05375a',
        alignSelf: "center",
        fontSize:20,
        marginLeft: 5,
    },

    header:{
        flex:2,
        alignContent:"center",
    },

    footer:{
        flex:3,
        alignContent:"center",
    },


    coursesContainer:{
        zIndex:1,
        elevation:1,
        alignContent:"center",
        marginTop:200,
        borderRadius: 20,
        width:"95%",
        height:"18%",
        alignSelf:"center",
        position:"absolute",
        backgroundColor:"white",
        shadowColor:"black",
        shadowOpacity:0.35,
        shadowOffset:{
            width:0,
            height:2,
        },
    },

    courseBox:{
        flexDirection:"row",
        backgroundColor: 'white',
        marginTop:10,
        marginLeft:10,
        marginBottom:10,
        alignSelf: "center",
        alignContent:"center",
        borderRadius: 20,
        width:"30%",
        height:"70%",
        shadowColor:"black",
        shadowOpacity:0.35,
        shadowOffset:{
            width:0,
            height:2,
        },
    },

    icon:{
        alignSelf:"center",
    }
});

export default PlayScreen;
