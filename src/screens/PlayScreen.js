import React, {useState} from 'react';
import {View, Text, StyleSheet,TouchableOpacity} from 'react-native';
import { Searchbar } from 'react-native-paper';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";


function PlayScreen({navigation}) {
    const[searchCourse,setSearchCourse]=useState('');

    let onChangeSearch=(value)=>{
        setSearchCourse(value)
    };

    return (
        <View style={styles.container}>
        <View style={{flex:1}}>
            <View style={styles.header}>
                <Text style={styles.tittle}> Nearby courses</Text>
            </View>

            <View style={styles.nearbyCourses}>
                <View style={styles.coursesContainer}>

                    <TouchableOpacity style={styles.courseBox}>
                        <MaterialIcons
                        name="golf-course"
                        color="#05375a"
                        size={30}
                        style={styles.icon}/>
                        <Text style={styles.cardText}> Pacheco Golf</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.courseBox}>
                        <MaterialIcons
                            name="golf-course"
                            color="#05375a"
                            size={30}
                            style={styles.icon}/>
                        <Text style={styles.cardText}> Pilar Golf</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.courseBox}>
                        <MaterialIcons
                            name="golf-course"
                            color="#05375a"
                            size={30}
                            style={styles.icon}/>
                        <Text style={styles.cardText}> Nordelta Golf Club</Text>
                    </TouchableOpacity>

                    <Searchbar style={styles.searchBar}
                        placeholder="Search course"
                        onChangeText={(value) =>onChangeSearch(value)}
                        value={searchCourse}
                    />
                </View>
            </View>

            <View style={styles.footer}/>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "white",
    },

    tittle:{
        fontSize:30,
        color: '#05375a',
        alignSelf: "center",
        marginTop: 50,
        fontWeight:"bold",
    },

    searchBar:{
        marginTop:40,
        width:"90%",
        height:"12%",
        alignSelf:"center",
        borderRadius: 20,
    },

    cardText:{
        color: '#05375a',
        alignSelf: "center",
        fontSize:25,
        marginLeft:10,
    },

    header:{
        flex:2,
        alignContent:"center",
    },

    nearbyCourses:{
        flex:10,
        alignContent:"center",
    },

    footer:{
        flex:3,
    },

    coursesContainer:{
        flex:1,
        alignContent:"center",

    },

    courseBox:{
        flexDirection:"row",
        backgroundColor: 'white',
        marginTop:15,
        alignSelf: "center",
        alignContent:"center",
        borderRadius: 20,
        width:"90%",
        height:"15%",
        shadowColor:"black",
        shadowOpacity:0.35,
        shadowOffset:{
            width:0,
            height:2,
        },
    },

    icon:{
        alignSelf:"center",
        marginLeft:10,
    }
});

export default PlayScreen;
