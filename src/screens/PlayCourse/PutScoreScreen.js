import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {Text, TextInput, View, StyleSheet, Button, TouchableOpacity} from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {
    faAngleLeft, faArrowCircleLeft, faArrowCircleRight,
    faArrowUpRightDots,
    faArrowUpRightFromSquare, faBullseye,
    faSquareArrowUpRight, faXmark, faXmarkCircle
} from "@fortawesome/free-solid-svg-icons";
import {useSelector} from "react-redux";

const COLORS = {
    selected: '#4a8a3f',
    selectedBad: '#e82a15',
    selectedSide: '#1b8ecc',
    notSelected: '#a19f9c'
}

const PutScoreScreen = forwardRef((props, ref) => {
    const holeNumber = props.num;
    const par = props.par;
    const si = props.si;
    const [score, setScore] = useState(0);
    const [putts, setPutts] = useState(0);
    const [fairway, setFairway] = useState('');

    const course = useSelector(state => state.course);
    const round = useSelector(state => state.round);

    const restoreValues = () => {
        setScore(0);
        setPutts(0);
        setFairway(' ');
    }


    useEffect(() => {
        let index = -1;
        for (let i = 0; i < round.round.holesScore.length; i++) {
            if (holeNumber === round.round.holesScore[i].num){
                index = i;
            }
        }
        if (index !== -1){
            setScore(round.round.holesScore[index].score);
            setPutts(round.round.holesScore[index].putts);
            setFairway(round.round.holesScore[index].fairway);
        }
    },[])

    const addPlayedHole = (num) => {
        round.round.addPlayedHole(num,netScore(score),putts,score - putts  <= (par - 2),fairway);
    }

    const netScore = (score) => {
        if (round.round.options.mode === 'gross'){
            return score;
        }
        let handicap = 0;
        if (course.course.holesList.length === 18){
            const someStrokes = Math.floor(round.round.options.handicap/18);
            handicap += Math.floor(round.round.options.handicap/18);
            if (handicap - someStrokes*18 <= si){
                handicap += 1;
            }
        }else{
            const someStrokes = Math.floor(round.round.options.handicap/9);
            console.log(si)
            handicap += someStrokes
            if (round.round.options.handicap - someStrokes*9 >= si){
                handicap += 1;
            }
            console.log(handicap)
        }
        return score - handicap;
    }

    useImperativeHandle(ref, () => ({
        restoreValues,
        addPlayedHole,
    }));

    return (
        <View style={styles.container}>
            <View style={styles.headerCards}>
                <View style={styles.card}>
                    <Text style={styles.label}>Score: </Text>
                    <View style={styles.inputCard}>
                        <TouchableOpacity title={'-'} style={styles.button} onPress={() => {
                            if(score !== 0){ setScore(score-1)}
                            if (score <= putts) {
                                setPutts(putts -1);
                            }
                        }}>
                            <Text style={{fontWeight: 'bold'}}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.input}>{score}</Text>
                        <TouchableOpacity title={'+'}  style={styles.button} onPress={() => setScore(score+1)}>
                            <Text style={{fontWeight: 'bold'}}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.label}>Putts: </Text>
                    <View style={styles.inputCard}>
                        <TouchableOpacity title={'-'} style={styles.button} onPress={() => {
                            if(putts !== 0){ setPutts(putts-1)}
                        }}>
                            <Text style={{fontWeight: 'bold'}}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.input}>{putts}</Text>
                        <TouchableOpacity title={'+'}  style={styles.button} onPress={() => {
                            if (putts === score){
                                setScore(score+1);
                            }
                            setPutts(putts+1)
                        }}>
                            <Text style={{fontWeight: 'bold'}}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {
                    par !== 3 ?
                    <View style={styles.card}>
                        <Text style={styles.label}>Fairway: </Text>
                        <View style={styles.fairwayOptions}>
                            <TouchableOpacity onPress={() => setFairway('left')}>
                                <FontAwesomeIcon
                                    color={fairway === 'left' ? COLORS.selectedSide : COLORS.notSelected}
                                    icon={faArrowCircleLeft}
                                    size={40}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setFairway('middle')}>
                                <FontAwesomeIcon
                                    color={fairway === 'middle' ? COLORS.selected : COLORS.notSelected}
                                    icon={faBullseye}
                                    size={40}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setFairway('right')}>
                                <FontAwesomeIcon
                                    color={fairway === 'right' ? COLORS.selectedSide : COLORS.notSelected}
                                    icon={faArrowCircleRight}
                                    size={40}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setFairway('cross')}>
                                <FontAwesomeIcon
                                    color={fairway === 'cross' ? COLORS.selectedBad : COLORS.notSelected}
                                    icon={faXmarkCircle}
                                    size={40}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                        : <View style={{flex: 1}}/>
                }
            </View>
            <View style={styles.footerCards}>
                <View style={(score - putts) <=  (par-2) && score > 0 ? styles.autocardSuccess : styles.autocard}>
                    <Text style={(score - putts) <=  (par-2) && score > 0 ? {color:'white'} : {color: 'black'}}>GIR</Text>
                </View>
                <View style={putts <= 1 && score - putts > 2 && score > 0 ? styles.autocardSuccess : styles.autocard}>
                    <Text style={putts <= 1 && score - putts > 2 && score > 0 ? {color:'white'} : {color: 'black'}}>Scramble</Text>
                </View>
            </View>
        </View>
    );
});

export default PutScoreScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    label:{
        flex: 1,
        marginLeft:"10%",
        marginBottom:"1%",
        marginTop:"7%",
        fontSize: 18,
        color: 'gray',
        fontWeight:"bold",
    },

    input:{
        color: '#000',
        alignSelf: "center",
        fontSize:20,
        fontWeight: "bold",
    },
    inputCard: {
        flex:1,
        flexDirection:'row',
        paddingTop: 20,
        marginRight: 20,
        justifyContent: 'space-around'
    },
    card:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },

    button: {
        justifyContent: 'center',
        backgroundColor: '#a19f9c',
        width: 40,
        height: 40,
        alignItems:'center',
        borderRadius: 5,
    },

    autocard:{
        flex: 1,
        margin: 10,
        height: '20%',
        elevation: 3,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: "white",
        shadowColor:"black",
        shadowOpacity:0.35,
        shadowOffset:{
            width:0,
            height:2,
        },
    },

    autocardSuccess: {
        flex: 1,
        backgroundColor: '#69a85e',
        margin: 10,
        height: '20%',
        elevation: 3,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        shadowColor:"black",
        shadowOpacity:0.35,
        shadowOffset:{
            width:0,
            height:2,
        },
    },

    headerCards: {
        flex: 2,
    },

    footerCards: {
        flex: 1,
        flexDirection: 'row',
    },
    fairwayOptions:{
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 20,
    }
})