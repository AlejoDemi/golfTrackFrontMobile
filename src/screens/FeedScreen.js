import React, {Component, useEffect, useState} from 'react';
import { WebView } from 'react-native-webview';
import {ActivityIndicator, Platform, View, StyleSheet, StatusBar, Text} from "react-native";
import {gql, useLazyQuery, useQuery} from "@apollo/client";
import {useDispatch, useSelector} from "react-redux";

const ROUNDS_DATA = gql`
query Query($id: String!){
    getRoundsByPlayer(id: $id){
        courseId
        playDate
        playedHoles {
            score
        }
    }
}
`

const COURSE_DATA = gql`
query QueryC($id: String!){
    getCourse(id: $id){
        name
    }
}
`

export default function FeedScreen({navigation}) {

    const playerId = useSelector(state => state.playerId);

    const [rounds, setRounds] = useState([]);
    const [courseName] = useLazyQuery(COURSE_DATA);

    const [loading, setLoading] = useState(true);


    const fullScore = (holes) => {
        let counter = 0;
        for (const hole of holes) {
            counter += hole.score;
        }
        return counter;
    }

    useEffect(() => {
        get();
    },[rounds, loading])

    const [get,{error, data}] = useLazyQuery(ROUNDS_DATA,{
        variables: {
            id: playerId.playerId,
        },
        onCompleted: r => {
            let roundList = [];
            r.getRoundsByPlayer.map(round => {
                courseName({
                    variables: {
                        id: round.courseId,
                    },
                }).then(r => {
                    roundList.push({
                        courseName: r.data.getCourse.name,
                        date: new Date(parseInt(round.playDate)),
                        score: fullScore(round.playedHoles),
                    });
                }).catch(e => console.log(e));
            });
            setRounds(roundList);
            setLoading(false);
        },
        onError: e => console.log(""),
    });

    if (loading) return <View style={styles.loadingContainer}>
                            <ActivityIndicator
                                color = '#4a8a3f'
                                size = "large"
                                style = {styles.activityIndicator}/>
                        </View>

    return (
        <View>
            {
                rounds.map((r,i) => {
                    return (
                        <Text key={i}>{r.score}</Text>
                    )
                })
            }
        </View>
    );
}

const styles = StyleSheet.create({
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
})