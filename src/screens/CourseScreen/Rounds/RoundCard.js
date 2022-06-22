import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const RoundCard = (props) => {
    return (
        <View style={styles.card}>
            <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
                <View>
                    <Text style={styles.course}>{props.player}</Text>
                    <Text style={styles.course}>{props.date + "/" + props.month + "/" + props.year }</Text>
                </View>
                <Text style={styles.score}>{props.score}</Text>
            </View>
        </View>
    );
}

export default RoundCard;

const styles = StyleSheet.create({
    card: {
        elevation: 3,
        paddingLeft: 10,
        zIndex: 1,
        marginTop: 10,
        marginBottom: 10,
        alignSelf: 'center',
        width:"90%",
        height:100,
        backgroundColor:"white",
        borderRadius:10,
        fontSize:15,
        justifyContent: 'center',
    },
    course: {
        fontWeight: 'bold',
        color: '#696969',
        marginTop: 20,
    },
    score: {
        alignSelf: 'center',
        fontSize: 60,
        color: "#5a8c53"
    }
})