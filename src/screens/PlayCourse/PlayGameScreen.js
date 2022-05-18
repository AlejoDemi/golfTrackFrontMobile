import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import {useSelector} from "react-redux";
import {createRef, useEffect, useState} from "react";
import PlayingHole from "./PlayingHole";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faAngleRight, faAngleLeft} from "@fortawesome/free-solid-svg-icons";

const PlayGameScreen = () => {
    const [holeNum, setHoleNum] = useState(1);
    const course = useSelector(state => state.course);

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => setHoleNum(holeNum - 1)}>
                    <FontAwesomeIcon
                        icon={faAngleLeft}
                        size={30}
                    />
                </TouchableOpacity>
                <Text style={styles.holeText}>Hole {holeNum}</Text>
                <TouchableOpacity onPress={() => setHoleNum(holeNum + 1)}>
                    <FontAwesomeIcon
                        icon={faAngleRight}
                        size={30}
                    />
                </TouchableOpacity>
            </View>
            <PlayingHole hole={course.course.holesList[holeNum-1]}/>
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
        height: '15%',
        backgroundColor: '#fff',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },

    holeText: {
        fontSize: 30,
        fontWeight: 'bold',
    }
})