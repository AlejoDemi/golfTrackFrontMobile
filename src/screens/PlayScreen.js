import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Searchbar} from 'react-native-paper';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as Location from 'expo-location';
import {gql, useQuery} from "@apollo/client";

const COURSES_DEMO = gql`
    query GetAllCoursesDemo {
        getAllCoursesDemo {
            id
            name
            locationLat
            locationLong
        }
}   `


function PlayScreen({navigation}) {


    const [location, setLocation] = useState({
        lat: 0,
        lng: 0
    });
    const [loadingCC, setLoadingCC] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);
    const [courses,setCourses] = useState([]);
    const [closestCourse, setClosestCourse] = useState({
        course: null,
        distance: 100000000,
    });

    const { loading, error, data } = useQuery(COURSES_DEMO, {
        onCompleted: r => {
            setCourses(r.getAllCoursesDemo);
        },
    });

    const[searchCourse,setSearchCourse]=useState('');

    useEffect(async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        const loc = await Location.getCurrentPositionAsync();
        await setLocation({
            lat: loc.coords.latitude,
            lng: loc.coords.longitude,
        })
    }, []);

    let onChangeSearch=(value)=>{
        setSearchCourse(value)
    };

    const startPlay=()=>{
        navigation.navigate("Course");
    };

    const distanceBetweenCourse = (lat1, lon1, lat2, lon2) => {
        const dLat = toRad(parseFloat(lat1) - parseFloat(lat2));
        const dLon = toRad(parseFloat(lon1) - parseFloat(lon2));

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(parseFloat(lat2))) *
            Math.cos(toRad(parseFloat(lat1))) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        return 12742 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }

    const toRad = (x) => {
        return x * Math.PI / 180;
    }


    const setTheClosestCourse = () => {
        for (const course of courses) {
            const distance = distanceBetweenCourse(location.lat, location.lng, course.locationLat, course.locationLong);
            if (closestCourse.course === null ||  closestCourse.distance > distance) {
                setClosestCourse({
                    course: course,
                    distance: distance,
                })
            }
        }
        setLoadingCC(false);
    }

    if (location.lat !== 0 && location.lng !== 0 && courses !== []  && closestCourse.course === null) {
        console.log(location);
        console.log(courses)
        setTheClosestCourse();
    }

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
                            {
                                !loadingCC ? <>
                                        <MaterialIcons
                                            name="golf-course"
                                            color="#05375a"
                                            size={30}
                                            style={styles.icon}/>
                                        <Text style={styles.cardText}>{closestCourse.course!==null?closestCourse.course.name:null}</Text>
                                    </>
                                :
                                    <View style={styles.loadingContainer}>
                                        <ActivityIndicator
                                            color = '#4a8a3f'
                                            size = "large"
                                            style = {styles.activityIndicator}/>
                                    </View>
                            }
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

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
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
