import {View, Text, StyleSheet, TouchableOpacity, TextInput} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import * as Animatable from 'react-native-animatable';
import {Round} from "../../models/Round";
import {saveRound} from "./RoundSlice";


export default function GameSetUpScreen({navigation}){

    const AnimatableTouchableOpacity = Animatable.createAnimatableComponent(TouchableOpacity);
    const dispatch = useDispatch();
    const unit = useSelector(state => state.unit)
    const course = useSelector(state => state.course);
    const [multiplier, setMultiplier] = useState(1);

    useEffect(() => {
        if (unit.unit === 'meters'){
            setMultiplier(0.9144);
        }
    })

    const [scoring, setScoring] = useState('gross');
    const [options, setOptions] = useState('scoring');
    const [handicap, setHandicap] = useState(0);

    const playButton = () => {
        dispatch(saveRound(new Round('1234',course.course.id,new Date(Date.now()),{mode:scoring, handicap: handicap, options:options})));
        navigation.navigate("PlayGame");
    }


    return(
        <View style={styles.container}>
            <Text style={styles.mainTitle}>Game Options</Text>
            <View style={styles.data}>
                <View>
                    <Text style={styles.dataText}>{course.course.name}</Text>
                    <Text style={styles.dataSubtitle}>{course.course.holesList.length} holes - Par {course.course.getPar(course.course.holesList.length)}</Text>
                    <Text style={styles.dataSubtitle}>{Math.round(course.course.getDistance(course.course.holesList.length)*multiplier) + " " + unit.unit}</Text>
                </View>
            </View>
            <View style={{flex:6}}>
                <View style={styles.input}>
                    <Text style={styles.mainLabel}>Options</Text>
                    <View style={[styles.inputContainer, {flexDirection: 'row'}]}>
                        <TouchableOpacity
                            style={[styles.button, options === 'scoring' ? styles.buttonChecked : null]}
                            onPress={() => setOptions('scoring')}>
                            <Text style={styles.label}>Scoring</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, options === 'gps' ? styles.buttonChecked : null]}
                            onPress={() => setOptions('gps')}>
                            <Text style={ styles.label}>GPS Only</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {
                    options === 'scoring' && <View style={styles.input}>
                        <Text style={styles.mainLabel}>Scoring Mode</Text>
                        <View style={[styles.inputContainer, scoring === 'net' ? styles.withInput: null]}>
                            <View style={{flexDirection: 'row', flex: 2}}>
                                <TouchableOpacity
                                    style={[styles.button, scoring === 'gross' ? styles.buttonChecked : null]}
                                    onPress={() => setScoring('gross')}>
                                    <Text style={styles.label}>Gross</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, scoring === 'net' ? styles.buttonChecked : null]}
                                    onPress={() => setScoring('net')}>
                                    <Text style={ styles.label}>Net</Text>
                                </TouchableOpacity>
                            </View>
                            {
                                scoring === 'net' ? <View style={styles.handicapInputContainer}>
                                    <TextInput
                                        style={styles.handicapInput}
                                        onChangeText={setHandicap}
                                        placeholder="Playing handicap..."
                                        keyboardType="numeric"
                                        maxLength={2}
                                        selectionColor={'#4a8a3f'}
                                    />
                                </View> : null
                            }
                        </View>
                    </View>
                }
            </View>
            <View style={{flex: 1}}>
                <AnimatableTouchableOpacity
                    animation="pulse"
                    iterationCount="infinite"
                    style={styles.playButton}
                    onPress={playButton}
                >
                    <Text style={
                        {
                            color:"white",
                            alignSelf:"center",
                            marginTop:10,
                            fontSize: 25,

                        }
                    }> Play</Text>
                </AnimatableTouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    mainTitle:{
        flex:1,
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        marginTop: 40,
    },
    data: {
        zIndex:1,
        elevation:3,
        flex:2,
        backgroundColor: '#e4e4e4',
        borderRadius: 20,
        margin: 30,
        padding: 20,
        justifyContent: 'space-around'
    },
    dataText: {
        color: '#696969',
        fontWeight: 'bold',
        fontSize: 18,
        alignSelf: 'center',
    },
    dataSubtitle: {
        color: '#888',
        fontWeight: 'bold',
        fontSize: 15,
        alignSelf: 'center',
    },
    input: {
    },
    mainLabel:{
        fontWeight: 'bold',
        fontSize: 20,
        color: '#696969',
        marginLeft: 30,
    },
    inputContainer:{
        zIndex:1,
        elevation:3,
        justifyContent: 'center',
        margin: 30,
        marginTop: 10,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#e4e4e4',
    },
    label:{
        alignSelf: 'center',
        fontWeight: 'bold',
        color: '#696969'
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        margin: 7,
        borderRadius: 5,
    },
    buttonChecked: {
        backgroundColor: 'white',
    },
    withInput: {
        height: 100,
    },
    handicapInputContainer: {
        flex: 3,
    },
    handicapInput: {
        margin: 4,
        padding: 5,
        borderRadius: 5,
        backgroundColor: 'white',
    },
    playButton:{
        width:"75%",
        backgroundColor: '#4a8a3f',
        alignSelf:"center",
        height:50,
        borderRadius:15,
    },

})