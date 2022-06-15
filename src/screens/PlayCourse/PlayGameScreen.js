import {StyleSheet, Text, View, Dimensions, TouchableOpacity, StatusBar} from 'react-native';
import {useSelector} from "react-redux";
import React, {createRef, useEffect, useRef, useState} from "react";
import PlayingHole from "./PlayingHole";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faAngleRight, faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import PutScoreScreen from "./PutScoreScreen";
import FinishRoundScreen from "./FinishRoundScreen";

const PlayGameScreen = ({navigation}) => {
    const [counter, setCounter] = useState(0);

    const [holeNum, setHoleNum] = useState(1);
    const course = useSelector(state => state.course);
    const round = useSelector(state => state.round);

    const putScore = useRef();
    const playScreen = useRef();

    const forwardPress = () => {
        if (round.round.options.options === 'scoring'){
            setCounter(counter+1);
            if (counter % 2 !== 0) {
                putScore.current?.addPlayedHole(holeNum);
                setHoleNum(holeNum + 1);
                playScreen.current?.restoreValues();
            } else {
                putScore.current?.restoreValues();
            }
        }else{
            setHoleNum(holeNum + 1);
        }
    }

    const backwardPress = () => {
        if (round.round.options.options === 'scoring'){
            setCounter(counter-1);
            if (counter % 2 !== 0) {
                playScreen.current?.restoreValues();
            } else {
                //putScore.current?.restoreValues();
                putScore.current?.addPlayedHole(holeNum);
                setHoleNum(holeNum - 1);
                //console.log(round.round)
            }
        }else{
            setHoleNum(holeNum - 1);
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <StatusBar backgroundColor="transparent" translucent barStyle='dark-content'/>
                <TouchableOpacity disabled={counter === 0 } onPress={backwardPress}>
                    <FontAwesomeIcon
                        icon={faAngleLeft}
                        size={30}
                        style={styles.holeText}
                        color={counter === 0? '#a19f9c' : 'black'}
                    />
                </TouchableOpacity>
                <Text style={styles.holeText}>{counter >= course.course.holesList.length*2 ? 'Finish Round' : 'Hole ' + holeNum}</Text>

                {
                    counter >= course.course.holesList.length*2 ? <View></View> :
                        <TouchableOpacity onPress={forwardPress}>
                            <FontAwesomeIcon
                                icon={faAngleRight}
                                size={30}
                                style={styles.holeText}
                            />
                        </TouchableOpacity>
                }

            </View>
            {
                round.round.options.options === 'gps' && holeNum > course.course.holesList.length ?
                    navigation.navigate('Home') :

                counter >= course.course.holesList.length*2 ? <FinishRoundScreen navigation={navigation}/>
                    : counter % 2 === 0
                        ? <PlayingHole ref={playScreen} hole={course.course.holesList[holeNum-1]}/>
                        : <PutScoreScreen ref={putScore} num = {holeNum} si = {course.course.holesList[holeNum-1].scoringIndex} par={course.course.holesList[holeNum - 1].par}/>
            }
        </View>
    )
}

export default PlayGameScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    }
})