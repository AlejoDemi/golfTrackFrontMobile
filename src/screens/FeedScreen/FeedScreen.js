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
import FeedCard from "./FeedCard";

const ROUNDS_DATA = gql`
query Query($id: String!){
    getRoundsByPlayer(id: $id){
        id
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

    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
       get();
    },[loading]);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, [])

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
            id: playerId.playerId,
        },
        onCompleted: r => {
            let roundList = [];
            r.getRoundsByPlayer.map(round => {
                roundList.push({
                    id: round.id,
                    courseId: round.courseId,
                    date: round.playDate,
                    courseName : "",
                    score: fullScore(round.playedHoles),
                });
            });

            const promises = [];
            roundList.forEach((r,i) => {
                promises.push(
                    courseName({
                        variables: {
                            id: r.courseId,
                        },
                    }).then(res => {
                        roundList[i] = {
                            ...roundList[i],
                            courseName: res.data.getCourse.name,
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
            <StatusBar backgroundColor="transparent" translucent barStyle='dark-content'/>
            <ScrollView
                style={{marginTop: 20}}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <Text style = {styles.title}>My Rounds</Text>
                {
                    rounds.sort((a,b) => {
                        return b.date - a.date;
                    }).map((r,i) => {
                        return (
                            <FeedCard key={i} course={r.courseName} date={new Date(parseInt(r.date)).getDate()}
                                      month = {new Date(parseInt(r.date)).getMonth()}
                                      year={new Date(parseInt(r.date)).getFullYear()} score={r.score}
                                      navigation={navigation} roundId={r.id}
                            />
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