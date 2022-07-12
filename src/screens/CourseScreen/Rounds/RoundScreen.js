import React, {Component, useCallback, useEffect, useState} from 'react';
import { WebView } from 'react-native-webview';
import {
    ActivityIndicator,
    Platform,
    View,
    StyleSheet,
    StatusBar,
    Text,
    ScrollView,
    RefreshControl,
    BackHandler
} from "react-native";
import {gql, useLazyQuery, useQuery} from "@apollo/client";
import {useDispatch, useSelector} from "react-redux";
import RoundCard from "./RoundCard";

const ROUNDS_DATA = gql`
query Query($id: String!){
    getRoundsByCourse(id: $id){
        id
        playerId
        playDate
        playedHoles {
            score
        }
    }
}
`

const PLAYER_DATA = gql`
query QueryC($id: String!){
    getPlayerInfo(id: $id){
        fullname
    }
}
`

export default function RoundScreen({navigation}) {

    const course = useSelector(state => state.course);

    const [rounds, setRounds] = useState([]);
    const [playerName] = useLazyQuery(PLAYER_DATA);
    const [loading, setLoading] = useState(true);

    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
       get();
    },[loading]);

    const onRefresh = useCallback(() => {
        setLoading(true);
    },[]);

    const fullScore = (holes) => {
        let counter = 0;
        for (const hole of holes) {
            counter += hole.score;
        }
        return counter;
    }

    const [get,{error, data}] = useLazyQuery(ROUNDS_DATA,{
        variables: {
            id: course.course.id,
        },
        onCompleted: r => {
            let roundList = [];
            r.getRoundsByCourse.map(round => {
                roundList.push({
                    id: round.id,
                    playerId: round.playerId,
                    date: round.playDate,
                    playerName : "",
                    score: fullScore(round.playedHoles),
                });
            });

            const promises = [];
            roundList.forEach((r,i) => {
                promises.push(
                    playerName({
                        variables: {
                            id: r.playerId,
                        },
                    }).then(res => {
                        roundList[i] = {
                            ...roundList[i],
                            playerName: res.data.getPlayerInfo.fullname,
                        }
                    })
                )
            })
            Promise.all(promises).then(() => {
                setRounds(roundList);
                setLoading(false);
            });

        },
        onError: e => console.log(e.message),
    });

    if (loading) return <View style={styles.loadingContainer}>
                            <ActivityIndicator
                                color = '#4a8a3f'
                                size = "large"
                                style = {styles.activityIndicator}/>
                        </View>

    return (
        <View>
            <ScrollView
                style={{marginTop: 20}}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <Text style = {styles.title}>Course Rounds</Text>
                {
                    rounds.sort((a,b) => {
                        return b.date - a.date;
                    }).map((r,i) => {
                        return (
                            <RoundCard key={i} player={r.playerName} date={new Date(parseInt(r.date)).getDate()}
                                       month = {new Date(parseInt(r.date)).getMonth()}
                                       year={new Date(parseInt(r.date)).getFullYear()} score={r.score} navigation={navigation} roundId={r.id}/>
                        )
                    })
                }
            </ScrollView>
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
    title: {
        marginTop: 40,
        marginLeft: 20,
        color: '#787878',
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
    }
})