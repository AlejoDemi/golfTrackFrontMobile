import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

const FeedCard = (props) => {
    return (
        <TouchableOpacity style={styles.card} onPress={() => props.navigation.navigate('FullRound',{roundId: props.roundId})}>
            <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
                <View>
                    <Text style={styles.course}>{props.course}</Text>
                    <Text style={styles.course}>{props.date + "/" + props.month + "/" + props.year }</Text>
                </View>
                <Text style={styles.score}>{props.score}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default FeedCard;

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