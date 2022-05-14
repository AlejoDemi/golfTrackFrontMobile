import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import { Searchbar } from 'react-native-paper';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as Location from 'expo-location';

function PlayScreen({navigation}) {


    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const[searchCourse,setSearchCourse]=useState('');
    const[selectedCourse,setSelectedCourse]=useState("Pacheco");

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            console.log(location);
            setLocation(location);
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = location.coords.latitude + " " + location.coords.longitude;
    }

    let onChangeSearch=(value)=>{
        setSearchCourse(value)
    };

    const startPlay=()=>{
        navigation.navigate("Course");
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <ImageBackground
                    source={require("../assets/fondo.jpg")}
                    style={styles.image}
                    resizeMode="cover"/>
            </View>

                <TouchableOpacity style={styles.coursesContainer}
                        onPress={startPlay}>
                        <Text style={styles.tittle}>Quick Play</Text>

                        <View style={styles.courseBox}>
                            <MaterialIcons
                            name="golf-course"
                            color="#05375a"
                            size={30}
                            style={styles.icon}/>
                            <Text style={styles.cardText}>{text}</Text>
                        </View>
                </TouchableOpacity>
            <Searchbar style={styles.searchBar}
                       placeholder="Search course..."
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
        marginTop:100,
        width:"90%",
        height:"8%",
        alignSelf:"center",
        borderRadius: 20,
    },

    cardText:{
        color: '#05375a',
        alignSelf: "center",
        fontSize:25,
        marginLeft: 5,
    },

    header:{
        flex:2,
        alignContent:"center",
    },

    footer:{
        flex:5,
        alignContent:"center",
    },


    coursesContainer:{
        zIndex:1,
        elevation:3,
        alignContent:"center",
        marginTop:120,
        borderRadius: 20,
        width:"80%",
        height:"15%",
        alignSelf:"center",
        position:"absolute",
        backgroundColor:"white",
        shadowColor:"black",
        shadowOpacity:0.5,
        shadowOffset:{
            width:0,
            height:-2,
        },
    },

    courseBox:{
        flexDirection:"row",
        backgroundColor: 'white',
        marginTop:10,
        alignSelf: "center",
        alignContent:"center",
    },

    icon:{
        alignSelf:"center",
    }
});

export default PlayScreen;
