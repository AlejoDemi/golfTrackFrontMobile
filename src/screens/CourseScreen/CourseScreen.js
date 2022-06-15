import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ImageBackground, StyleSheet, Text, TouchableOpacity, View, ScrollView} from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import {gql, useLazyQuery, useQuery} from '@apollo/client';
import {Course, Hole, Review} from "../../models/Course";
import {useDispatch, useSelector} from "react-redux";
import {saveCourse} from "./courseSlice";
import Scorecard from "./Scorecard";

const FULL_COURSE = gql`
    query Query($id: String!) {
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


const GET_REVIEWS = gql`
query Query($id: String!) {
        getReviewsByCourse(id: $id) {
            ratingNumber
            ratingText
            userId
        }
}
`


function CourseScreen({navigation}) {

    //Hooks
    const dispatch = useDispatch();
    const courseId = useSelector(state => state.courseId);

    const [course, setCourse] = useState({});
    const [loadingGolfCourse, setLoadigGolfCourse] = useState(true);
    const [average, setAverage] = useState(0);

    const setFullCourse = (c) => {
        const fullCourse = new Course(c.id,c.name, c.description, {lat: parseFloat(c.location.lat), lng: parseFloat(c.location.long)});
        for (let i = 0; i < c.holes.length; i++) {
            let auxHolesList = [...c.holes];
            auxHolesList = auxHolesList.sort((a,b) => {return a.num - b.num});
            const newHole = new Hole(auxHolesList[i].id, auxHolesList[i].num, auxHolesList[i].par, auxHolesList[i].scoringIndex, auxHolesList[i].distance, {lat: parseFloat(auxHolesList[i].locationMiddleOfGreen.lat), lng: parseFloat(auxHolesList[i].locationMiddleOfGreen.long)}, {lat: parseFloat(auxHolesList[i].locationTeebox.lat), lng: parseFloat(auxHolesList[i].locationTeebox.long)});
            fullCourse.addHole(i+1,newHole);
        }
        setCourse(fullCourse);
    }

    const {error, data} = useQuery(FULL_COURSE,{
        variables: {
            id: courseId.id,
        },
        onCompleted: c => {
            setFullCourse(c.getCourse);
            reviews();
        },
        onError: e => console.log(e)
    });

    const [reviews] = useLazyQuery(GET_REVIEWS, {
        variables: {
            id: courseId.id,
        },
        onCompleted: r=> {
            let counter = 0;
            r.getReviewsByCourse.map(re => {
                counter += re.ratingNumber;
                course.addReview(new Review(re.ratingNumber, re.ratingText, re.userId));
            });

            setAverage(counter/course.reviews.length);
            setLoadigGolfCourse(false);
        }
    })


    //Navigation Methods
    const goBack = () => {
        navigation.goBack();
    }

    let goToReviews = () =>{
        dispatch(saveCourse(course));
        navigation.navigate("Reviews");
    }

    let goToSetUp = () =>{
        dispatch(saveCourse(course));
        navigation.navigate("SetUp");
    }

    if (loadingGolfCourse) return <View style={styles.loadingContainer}>
                                    <ActivityIndicator
                                        color = '#4a8a3f'
                                        size = "large"
                                        style = {styles.activityIndicator}/>
                                    </View>

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <ImageBackground style={styles.image}
                source={require("../../assets/course.jpg")}
                >
                    <View style={styles.horizontal}>
                        <TouchableOpacity style={styles.back} onPress={goBack}>
                            <Feather
                                name="arrow-left"
                                color="white"
                                size={40}
                            />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
            <View style={styles.footer}>
                <ScrollView vertical={true}>
                    <Text style={styles.tittle}>{course.name}</Text>

                    <View style={styles.rate}>
                        <MaterialIcons style={styles.star}
                                       name="star"
                                       color='#ffd700'
                                       size={35}/>
                        <Text style={
                            {
                                fontSize: 30,
                                marginLeft:10,
                                color: '#05375a',
                            }
                        }>{average.toFixed(1)}</Text>
                    </View>
                    <Text style={styles.description}>{course.description}</Text>
                    <TouchableOpacity style={styles.playButton} onPress={goToSetUp}>
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
                        fontSize:20,
                        alignSelf:"flex-start",
                        marginLeft: 30,
                        marginTop:20,
                        color: '#05375a',
                    }}>Scorecard</Text>
                    <Scorecard course = {course}/>
                    <TouchableOpacity style={{flexDirection:"row",alignSelf: "center"}} onPress={goToReviews}>
                        <Text
                            style={styles.reviews}>Reviews</Text>
                        <Feather name="chevrons-right"
                                 size={25}
                                 style={{marginTop:20}}
                        />
                    </TouchableOpacity>
                </ScrollView>

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

    reviews:{
        textDecorationLine: 'underline',
        alignSelf:"center",
        marginTop:20,
        fontSize: 20
    },
    description: {
        color: '#696969',
         marginTop: 20,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 20,
    },
    tittle:{
        fontWeight:"bold",
        fontSize:25,
        alignSelf:"center",
        marginTop:20,
        color: '#05375a',
        textAlign:'center'
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
        height:50,
        borderRadius:20,
        marginTop: 10,
    },

    image:{
        flex: 1,
        justifyContent: "center"
    }
});

export default CourseScreen;
