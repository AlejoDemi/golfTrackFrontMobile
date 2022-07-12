import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Dimensions, ActivityIndicator, StatusBar} from 'react-native';
import {useSelector} from "react-redux";
import {ProgressChart} from "react-native-chart-kit";
import {gql, useLazyQuery, useMutation, useQuery} from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PlayedScorecard from "../PlayCourse/components/PlayedScorecard";
import {Round} from "../../models/Round";
import {saveRound} from "../PlayCourse/RoundSlice";
import {Course, Hole} from "../../models/Course";
import {saveCourse} from "../CourseScreen/courseSlice";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";


const ROUND = gql`
query Query($id: String!) {
  getRoundById(id: $id) {
    id
    playerId
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

const FullRoundScreen = ({route, navigation}) => {

    //const round = useSelector(state => state.round);
    //const course = useSelector(state => state.course);
    const playerId = useSelector(state => state.playerId);


    const {roundId} = route.params;

    const [round, setFullRound] = useState({});
    const [course, setCourse] = useState({});
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});

    const {} = useQuery(ROUND,{
        variables: {
            id: roundId,
        },
        onCompleted: r => {
            setRound(r.getRoundById);
        },
        onError: e => console.log(e),
     });

    const [getCourse] = useLazyQuery(FULL_COURSE,{
        variables: {
            id: round.courseId,
        },
        onCompleted: r => {
            setFullCourse(r.getCourse);
        }
    });

    const setRound = (round) => {
        const newRound = new Round(playerId.playerId, round.courseId,round.playDate, {mode: 'gross',handicap: 0,options:'scoring'});
        round.playedHoles.map(hole => {
            newRound.addPlayedHole(hole.num,hole.score,hole.putts,hole.fairway);
        });
        setFullRound(newRound);
        getCourse();
        setData({
            labels: ["GIR", "FIR", "2-Putts"],
            data: [newRound.getRoundGIR(newRound.holesScore.length), newRound.getRoundFW(newRound.holesScore.length), newRound.getRoundPutts(newRound.holesScore.length)]
        });
    }

    const setFullCourse = (c) => {
        const fullCourse = new Course(c.id,c.name, c.description, {lat: parseFloat(c.location.lat), lng: parseFloat(c.location.long)});
        for (let i = 0; i < c.holes.length; i++) {
            let auxHolesList = [...c.holes];
            auxHolesList = auxHolesList.sort((a,b) => {return a.num - b.num});
            const newHole = new Hole(auxHolesList[i].id, auxHolesList[i].num, auxHolesList[i].par, auxHolesList[i].scoringIndex, auxHolesList[i].distance, {lat: parseFloat(auxHolesList[i].locationMiddleOfGreen.lat), lng: parseFloat(auxHolesList[i].locationMiddleOfGreen.long)}, {lat: parseFloat(auxHolesList[i].locationTeebox.lat), lng: parseFloat(auxHolesList[i].locationTeebox.long)});
            fullCourse.addHole(i+1,newHole);
        }
        setCourse(fullCourse);
        setLoading(false);
    }

    if (loading) return <View style={styles.loadingContainer}>
                            <ActivityIndicator
                                color = '#4a8a3f'
                                size = "large"
                                style = {styles.activityIndicator}/>
                        </View>

    return (
        <View>
            <View style={styles.header}>
                <StatusBar backgroundColor="transparent" translucent barStyle='dark-content'/>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesomeIcon
                        icon={faAngleLeft}
                        size={30}
                        style={styles.holeText}
                        color='black'
                    />
                </TouchableOpacity>
                <Text style={styles.holeText}>Round</Text>
                <View/>

            </View>
            <View style={styles.scorecard}>
                <Text style={styles.label}>Scorecard</Text>
                <PlayedScorecard course = {course} round={round}/>
            </View>

            <ProgressChart
                data={data}
                height={220}
                width={Dimensions.get("window").width}
                strokeWidth={16}
                radius={32}
                chartConfig={chartConfig}
                hideLegend={false}
            />
        </View>
    );
}

export default FullRoundScreen;

const chartConfig = {
    backgroundColor: '#F2F2F2',
    backgroundGradientFrom: '#F2F2F2',
    backgroundGradientTo: '#F2F2F2',
    color: (opacity = 1) => `rgba(74, 138, 63, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};

const styles = StyleSheet.create({
    scorecard: {
        marginTop: 5,
        marginBottom: 20,
    },
    label: {
        fontWeight: "bold",
        fontSize: 20,
        alignSelf: "flex-start",
        margin: 10,
        color: '#05375a',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        height:"8%",
        marginTop:"10%",
        marginBottom: "30%",
    },
    header: {
        flexDirection:'row',
        elevation: 1,
        alignItems: 'center',
        zIndex: 1,
        justifyContent: 'space-around',
        height: '12%',
        backgroundColor: '#fff',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },

    holeText: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 30
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

    button:{
        flex: 1,
        borderRadius:10,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        margin: 7,
    },

    buttonText:{
        color:"white",
        fontSize:20,
        fontWeight:"bold"
    }
})