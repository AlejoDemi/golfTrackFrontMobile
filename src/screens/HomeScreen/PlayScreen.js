import React, {useEffect, useState} from 'react';
import {Keyboard, ActivityIndicator, ImageBackground, StyleSheet, Text, TouchableOpacity, View,KeyboardAvoidingView} from 'react-native';
import {Searchbar} from 'react-native-paper';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as Location from 'expo-location';
import {gql, useQuery} from "@apollo/client";
import {useDispatch} from "react-redux";
import {setCourseId} from "./PlayScreenSlice";

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


    //Hooks
    const dispatch = useDispatch();

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

    //Handles searchbar
    let onChangeSearch=(value)=>{
        setSearchCourse(value)
    };

    //When a button is clicked redirect
    const startPlay=(id)=>{
        dispatch(setCourseId(id));
        navigation.navigate("Course");
    };
/*
    useEffect(() => {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let loc = await Location.getCurrentPositionAsync();
            console.log(loc);
            await setLocation({
                lat: loc.coords.latitude,
                lng: loc.coords.longitude
            })
        })();
    }, []);

    //Methods



    //Gets distance between 2 coords in yards
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


    //Set which is the closest course to geolocation
    const setTheClosestCourse = () => {
        let auxClosestCourse = {
            course: null,
            distance: 10000000000000,
        };
        for (const course of courses) {
            const distance = distanceBetweenCourse(location.lat, location.lng, course.locationLat, course.locationLong);
            if (auxClosestCourse.name === null ||  auxClosestCourse.distance > distance) {
                auxClosestCourse = {
                    course: course,
                    distance: distance,
                }
            }
        }
        setClosestCourse(auxClosestCourse);
        setLoadingCC(false);
    }

    if (location.lat !== 0 && location.lng !== 0 && courses !== []  && closestCourse.course === null) {
        setTheClosestCourse();
    }
*/
    if (loading) return <View style={styles.loadingContainer}>
        <ActivityIndicator
            color = '#4a8a3f'
            size = "large"
            style = {styles.activityIndicator}/>
    </View>
    return (
        <View
            style={styles.container}
        >
            <View style={styles.header}>
                <ImageBackground
                    source={require("../../assets/fondo.jpg")}
                    style={styles.image}
                    resizeMode="cover"/>
            </View>
            <View style={styles.footer}>
                <View style={styles.coursesContainer}>
                    <Text style={styles.tittle}>Play Golf</Text>
                </View>
                {
                    /*
                    <TouchableOpacity style={styles.coursesContainer}
                        onPress={() => startPlay(closestCourse.course.id)}>
                        <Text style={styles.tittle}>Quick Play</Text>

                        <View style={styles.courseBox}>
                            <MaterialIcons
                                name="sports-golf"
                                color="#05375a"
                                size={30}
                                style={styles.icon}/>
                            {
                                closestCourse.course === null ? <Text style={styles.cardText}>Couldn't load closest course</Text>
                                : <Text style={styles.cardText}>{closestCourse.course.name.length < 48 ? closestCourse.course.name : closestCourse.course.name.substring(0, 45) + "..."}</Text>
                            }
                        </View>
                </TouchableOpacity>
                     */
                }
            <Searchbar style={styles.searchBar}
                       placeholder="Search course..."
                       onChangeText={(value) =>onChangeSearch(value)}
                       value={searchCourse}
            />
            {
                courses.filter(c=>c.name.toLowerCase().includes(searchCourse.toLowerCase())).map((c,i) => {
                        return(
                            <TouchableOpacity style={styles.courseCard} key={i} onPress={() => startPlay(c.id)}>
                                <MaterialIcons
                                    name="golf-course"
                                    color="#05375a"
                                    size={30}
                                    style={styles.icon}/>
                                <Text style={{
                                    alignSelf:"center",
                                    fontWeight: 'bold',
                                    marginLeft: 10,
                                }
                                }>{c.name}</Text>
                            </TouchableOpacity>
                        )
                    })
            }
            </View>
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
        fontSize:40,
        color: '#05375a',
        alignSelf: "center",
        fontWeight:"bold",
        //marginTop:5
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
        fontSize:20,
        marginLeft: 5,
    },

    header:{
        flex:1,
        alignContent:"center",
    },

    footer:{
        flex:4,
        alignContent:"center",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

    },


    coursesContainer:{
        zIndex:1,
        elevation:3,
        alignContent:"center",
        paddingHorizontal: 20,
        marginTop:120,
        borderRadius: 20,
        width:"80%",
        height:"20%",
        top: '-30%',
        alignSelf:"center",
        position:"absolute",
        backgroundColor:"white",
        shadowColor:"black",
        shadowOpacity:0.5,
        shadowOffset:{
            width:0,
            height:-2,
        },
        justifyContent: 'center'
    },

    courseBox:{
        flexDirection:"row",
        backgroundColor: 'white',
        marginTop:10,
        alignSelf: "center",
        alignContent:"center",
    },

    courseCard:{
        flexDirection:"row",
        backgroundColor: 'white',
        zIndex:1,
        elevation:3,
        width: '90%',
        height: 40,
        borderRadius: 10,
        marginTop:30,
        alignSelf: "center",
        alignContent:"center",
        shadowColor:"black",
        shadowOpacity:0.5,
        shadowOffset:{
            width:0,
            height:-2,
        },
    },

    icon:{
        alignSelf:"center",
    }
});

export default PlayScreen;
