import React, {useEffect, useState} from 'react';
import {Keyboard, ActivityIndicator, ImageBackground, StyleSheet, Text, TouchableOpacity, View,KeyboardAvoidingView, Modal, Pressable} from 'react-native';
import {Searchbar} from 'react-native-paper';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as Location from 'expo-location';
import {gql, useLazyQuery, useMutation, useQuery} from "@apollo/client";
import {useDispatch, useSelector} from "react-redux";
import {setCourseId} from "./PlayScreenSlice";
import {saveRound} from "../PlayCourse/RoundSlice";
import {Round} from "../../models/Round";
import {Course, Hole} from "../../models/Course";
import {saveCourse} from "../CourseScreen/courseSlice";

const COURSES_DEMO = gql`
    query GetAllCoursesDemo {
        getAllCoursesDemo {
            id
            name
            locationLat
            locationLong
        }
}   `

const FULL_COURSE = gql`
    query Quer($id: String!) {
        getCourse(id: $id) {
            id
            name
            creator
            description
            location {
                lat
                long
            }
            holes {
                id
                num
                par
                distance
                scoringIndex
                locationTeebox {
                    lat
                    long
                }
                locationMiddleOfGreen {
                    lat
                    long
                }
            }
        }
    }
`;


const ONGOING_ROUND = gql`
query Query($id: String!){
    getOngoingRound(id: $id){
        id
        courseId
        playDate
        playedHoles{
            num
            score
            putts
            fairway
        }
    }
}
`


const DELETE_ROUND = gql`
mutation Mutation($playerId: String!){
    deleteRound(playerId: $playerId){
        id
    }
}
`


function PlayScreen({navigation}) {


    //Hooks
    const dispatch = useDispatch();

    const playerId = useSelector(state => state.playerId);

    const [location, setLocation] = useState({
        lat: 0,
        lng: 0
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [ongoingRound, setOngoingRound] = useState({});
    const [loadingOngoing, setLoadingOngoing] = useState(true);
    const [course, setCourse] = useState({});
    const [errorMsg, setErrorMsg] = useState(null);
    const [courses,setCourses] = useState([]);
    const [closestCourse, setClosestCourse] = useState({
        course: null,
        distance: 100000000,
    });

    const { loading, error } = useQuery(COURSES_DEMO, {
        onCompleted: r => {
            setCourses(r.getAllCoursesDemo);
        },
    });

    const [getCourse] = useLazyQuery(FULL_COURSE,{
        variables: {
            id: ongoingRound.courseId,
        },
        onCompleted: c => {
            setFullCourse(c.getCourse);
        },
        onError: e => console.log(e)
    });

    const {data} = useQuery(ONGOING_ROUND,{
        variables: {
            id: playerId.playerId,
        },
        onCompleted: r => {
            setLoadingOngoing(false)
            setModalVisible(true);
            setOngoingRound(r.getOngoingRound);
        },
        onError: e => {
            setLoadingOngoing(false)
            console.log(e)
        },
    });

    const [deleteR] = useMutation(DELETE_ROUND);

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

    const setFullCourse = (c) => {
        const fullCourse = new Course(c.id,c.name, c.description, {lat: parseFloat(c.location.lat), lng: parseFloat(c.location.long)});
        for (let i = 0; i < c.holes.length; i++) {
            let auxHolesList = [...c.holes];
            auxHolesList = auxHolesList.sort((a,b) => {return a.num - b.num});
            const newHole = new Hole(auxHolesList[i].id, auxHolesList[i].num, auxHolesList[i].par, auxHolesList[i].scoringIndex, auxHolesList[i].distance, {lat: parseFloat(auxHolesList[i].locationMiddleOfGreen.lat), lng: parseFloat(auxHolesList[i].locationMiddleOfGreen.long)}, {lat: parseFloat(auxHolesList[i].locationTeebox.lat), lng: parseFloat(auxHolesList[i].locationTeebox.long)});
            fullCourse.addHole(i+1,newHole);
        }
        setCourse(fullCourse);
        dispatch(saveCourse(fullCourse));
        //Navigate to playscreen
        navigation.navigate('PlayGame');
        setLoadingOngoing(false);

    }

    const loadOngoingRound = () => {
        const round = new Round(playerId.playerId, ongoingRound.courseId,ongoingRound.playDate, {mode: 'gross',handicap: 0,options:'scoring'});
        ongoingRound.playedHoles.map(hole => {
            round.addPlayedHole(hole.num,hole.score,hole.putts,hole.fairway);
        });
        dispatch(saveRound(round));

        setLoadingOngoing(true);
        getCourse();
    }

    const deleteRound = () =>{
        setModalVisible(false)
        deleteR({
            variables: {
                playerId: playerId.playerId,
            },
        })
    }

    useEffect(async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
        }
    }, []);

    //Methods
/*


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
    if (loading || loadingOngoing) return <View style={styles.loadingContainer}>
        <ActivityIndicator
            color = '#4a8a3f'
            size = "large"
            style = {styles.activityIndicator}/>
    </View>
    return (
        <View
            style={styles.container}
        >
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>You have an ongoing round. Would you like to continue?</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Pressable
                                style={[styles.buttonModal, styles.buttonClose, {backgroundColor: '#4a8a3f'}]}
                                onPress={loadOngoingRound}
                            >
                                    <Text style={styles.textButton}>Yes</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.buttonModal, styles.buttonClose, {backgroundColor: 'firebrick'}]}
                                onPress={deleteRound}
                            >
                                <Text style={styles.textButton}>No</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
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
    },


    coursesContainer:{
        zIndex:1,
        elevation:3,
        alignContent:"center",
        paddingHorizontal: 20,
        marginTop:120,
        borderRadius: 20,
        width:"80%",
        height:"15%",
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
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    buttonModal: {
        margin: 20,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textButton: {
        margin: 5,
        marginLeft: 10,
        marginRight: 10,
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: 'bold',
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
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 25,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 6
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 12,
        zIndex: 10
    },
});

export default PlayScreen;
