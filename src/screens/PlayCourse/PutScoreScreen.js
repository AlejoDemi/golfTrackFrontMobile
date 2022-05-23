import React, {useState} from 'react';
import {Text, TextInput, View, StyleSheet, Button, TouchableOpacity} from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {
    faAngleLeft, faArrowCircleLeft, faArrowCircleRight,
    faArrowUpRightDots,
    faArrowUpRightFromSquare, faBullseye,
    faSquareArrowUpRight, faXmark, faXmarkCircle
} from "@fortawesome/free-solid-svg-icons";

const COLORS = {
    selected: '#4a8a3f',
    selectedBad: '#e82a15',
    selectedSide: '#1b8ecc',
    notSelected: '#a19f9c'
}

const PutScoreScreen = (props) => {
    const [score, setScore] = useState(0);
    const [putts, setPutts] = useState(0);
    const [fairway, setFairway] = useState('');

    const increasePutts = () => {
        setPutts(putts+1);
        if (putts >= score){
            setScore(score+1);
        }
    }

    return (
        <View>
            <View style={styles.card}>
                <Text style={styles.label}>Score: </Text>
                <Button title={'-'} style={styles.button} onPress={() => {
                    if(score !== 0){ setScore(score-1)}
                }}/>
                <Text style={styles.input}>{score}</Text>
                <Button title={'+'}  style={styles.button} onPress={() => setScore(score+1)}/>
            </View>

            <View style={styles.card}>
                <Text style={styles.label}>Putts: </Text>
                <Button title={'-'} style={styles.button} onPress={() => {
                    if(putts !== 0){ setPutts(putts-1)}
                }}/>
                <Text style={styles.input}>{putts}</Text>
                <Button title={'+'}  style={styles.button} onPress={() => increasePutts()}/>
            </View>

            <View style={styles.card}>
                <Text style={styles.label}>Fairway: </Text>
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
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <View style={styles.autocard}>
                    <Text>GIR</Text>
                </View>
                <View style={styles.autocard}>
                    <Text>Scramble</Text>
                </View>
                <View style={styles.autocard}>
                    <Text>Sand Save</Text>
                </View>
            </View>
        </View>
    );
}

export default PutScoreScreen;

const styles = StyleSheet.create({
    label:{
        marginLeft:"10%",
        marginBottom:"1%",
        marginTop:"7%",
        fontSize: 18,
        color: 'grey',
        fontWeight:"bold",
    },

    input:{
        color:"#05375a",
        flex:1,
        alignSelf: "center",
        fontSize:20,
        marginLeft:"10%",
        fontWeight: "bold"
    },
    card:{
        marginTop: 20,
        elevation: 3,
        alignSelf:"center",
        flexDirection:"row",
        alignContent:"center",
        borderRadius: 20,
        width:"90%",
        height:"20%",
        backgroundColor: "white",
        shadowColor:"black",
        shadowOpacity:0.35,
        shadowOffset:{
            width:0,
            height:2,
        },
    },

    button: {
        height: '50%',
        alignContent: 'center',
        color: 'red'
    },

    autocard:{
        marginTop: 20,
        elevation: 3,
        alignSelf:"center",
        flexDirection:"row",
        alignContent:"center",
        borderRadius: 20,
        width:"30%",
        height:"20%",
        backgroundColor: "white",
        shadowColor:"black",
        shadowOpacity:0.35,
        shadowOffset:{
            width:0,
            height:2,
        },
    },
})