import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Dimensions, ActivityIndicator} from 'react-native';
import PlayedScorecard from "./components/PlayedScorecard";
import {useSelector} from "react-redux";
import {ProgressChart} from "react-native-chart-kit";
import {gql, useMutation} from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ROUND = gql`
mutation Mutation($input: RoundInput) {
  saveRound(input: $input) {
    id
  }
}
`

const FinishRoundScreen = ({navigation}) => {

    const round = useSelector(state => state.round);
    const course = useSelector(state => state.course);
    const playerId = useSelector(state => state.playerId);

    const [savePlayedRound] = useMutation(ROUND);

    const [loading, setLoading] = useState(false);

    const data = {
        labels: ["GIR", "FIR", "2-Putts"],
        data: [round.round.getRoundGIR(round.round.holesScore.length), round.round.getRoundFW(round.round.holesScore.length), round.round.getRoundPutts(round.round.holesScore.length)]
    };

    const goToHome = () => {
        navigation.navigate('Home');
    }

    const saveRound = () => {
        const holes = [];
        setLoading(true);
        round.round.holesScore.map(h => {
            holes.push({
                num: h.num,
                score: h.score,
                putts: h.putts,
                fairway: h.fairway,
            });
        })
        savePlayedRound({
            variables: {
                input: {
                    playerId: playerId.playerId,
                    courseId: course.course.id,
                    playedHoles: holes,
                }
            }
        }).then(r => {
            setLoading(false);
            navigation.navigate('Home');
        }).catch(e => {
            setLoading(false);
        });
    }

    if (loading) return <View style={styles.loadingContainer}>
                            <ActivityIndicator
                                color = '#4a8a3f'
                                size = "large"
                                style = {styles.activityIndicator}/>
                        </View>

    return (
        <View>
            <View style={styles.scorecard}>
                <Text style={styles.label}>Scorecard</Text>
                <PlayedScorecard course = {course.course} round={round.round}/>
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

            <View style={styles.buttons}>
                <TouchableOpacity style={[styles.button,{backgroundColor:"firebrick"}]} onPress={goToHome}>
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, {backgroundColor:"#4a8a3f"}]} onPress={saveRound}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default FinishRoundScreen;

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