import React from 'react';
import {View} from 'react-native';
import PlayedScorecard from "./components/PlayedScorecard";
import {useSelector} from "react-redux";

const FinishRoundScreen = (props) => {

    const round = useSelector(state => state.round);
    const course = useSelector(state => state.course);

    return (
        <View>
            <PlayedScorecard course = {course.course} round={round.round}/>
        </View>
    );
}

export default FinishRoundScreen;