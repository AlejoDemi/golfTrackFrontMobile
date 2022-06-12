import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';
import PlayedScorecard from "./components/PlayedScorecard";
import {useSelector} from "react-redux";
import {ProgressChart} from "react-native-chart-kit";

const FinishRoundScreen = (props) => {

    const round = useSelector(state => state.round);
    const course = useSelector(state => state.course);

    const data = {
        labels: ["GIR", "FIR", "2-Putts"],
        data: [0.4, 0.2, 0.9]
    };

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
                <TouchableOpacity style={[styles.button,{backgroundColor:"firebrick",}]}>
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, {backgroundColor:"#4a8a3f"}]}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default FinishRoundScreen;

const chartConfig = {
    backgroundColor: 'white',
    backgroundGradientFrom: 'white',
    backgroundGradientTo: 'white',
    color: (opacity = 1) => `rgba(74, 138, 63, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};

const styles = StyleSheet.create({
    scorecard: {
        marginTop: 5,
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