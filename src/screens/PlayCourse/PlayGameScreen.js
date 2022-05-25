import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import {useSelector} from "react-redux";
import {createRef, useEffect, useRef, useState} from "react";
import PlayingHole from "./PlayingHole";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faAngleRight, faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import PutScoreScreen from "./PutScoreScreen";

const PlayGameScreen = () => {
    const [counter, setCounter] = useState(0);

    const [holeNum, setHoleNum] = useState(1);
    const course = useSelector(state => state.course);

    const putScore = useRef();
    const playScreen = useRef();

    const forwardPress = () => {
        setCounter(counter+1);
        if (counter % 2 !== 0) {
            setHoleNum(holeNum + 1);
            playScreen.current?.restoreValues();
        } else {
            putScore.current?.restoreValues();
        }
    }

    const backwardPress = () => {
        setCounter(counter-1);
        if (counter % 2 !== 0) {
            playScreen.current?.restoreValues();
        } else {
            setHoleNum(holeNum - 1);
            putScore.current?.restoreValues();
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity disabled={counter === 0 } onPress={backwardPress}>
                    <FontAwesomeIcon
                        icon={faAngleLeft}
                        size={30}
                        style={styles.holeText}
                        color={counter === 0? '#a19f9c' : 'black'}
                    />
                </TouchableOpacity>
                <Text style={styles.holeText}>Hole {holeNum}</Text>
                <TouchableOpacity onPress={forwardPress}>
                    <FontAwesomeIcon
                        icon={faAngleRight}
                        size={30}
                        style={styles.holeText}
                    />
                </TouchableOpacity>

            </View>
            {
                counter % 2 === 0
                    ? <PlayingHole ref={playScreen} hole={course.course.holesList[holeNum-1]}/>
                    : <PutScoreScreen ref={putScore} par={course.course.holesList[holeNum - 1].par}/>
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