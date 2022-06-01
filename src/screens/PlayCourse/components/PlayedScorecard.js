import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';


const PlayedScorecard = (props) => {
    const course = props.course;
    const round = props.round;

    const fullData = () => {
        const data = [];
        const holes = [];
        const pars = [];
        const distances = [];
        const handicap = [];
        const score = [];
        const putts = [];
        const fairways = [];

        for (const hole of course.holesList) {
            holes.push(hole.num);
            pars.push(hole.par);
            distances.push(hole.distance);
            handicap.push(hole.scoringIndex);
            score.push(round.holesScore[hole.num-1].score);
            putts.push(round.holesScore[hole.num-1].putts);
            fairways.push(round.holesScore[hole.num-1].fairway);

            if (hole.num === 9|| hole.num === 18){
                holes.push('');
                pars.push(course.getPar(hole.num));
                distances.push(course.getDistance(hole.num));
                handicap.push('');
                score.push(round.getScore(hole.num));
                putts.push(round.getPutts(hole.num));
                fairways.push(round.getPercentageFairways(hole.num));
            }
        }
        data.push(holes);
        data.push(pars);
        data.push(distances);
        data.push(handicap);
        data.push(score);
        data.push(putts);
        data.push(fairways);
        return data;
    }

    const widthArr = (width) => {
        const aux = [];
        for (const h of data[0]) {
            aux.push(width)
        }
        return aux
    }

    const MAIN_COL = ['Hole','Par','Distance', 'Handicap', 'Score', 'Putts', 'Fairways'];
    const data = fullData();

    return (

        <View style={styles.container}>
            <Table style={{flexDirection: 'row'}}>
                {/* Left Wrapper */}
                <TableWrapper style={{width: 80, flexDirection: 'row'}}>
                    <Col data={MAIN_COL} style={styles.title} heightArr={[40, 40, 40,40,40,40,40]} textStyle={styles.titleText}/>
                </TableWrapper>

                {/* Right Wrapper */}
                <ScrollView horizontal>
                    <View>
                        <TableWrapper>
                            {
                                data.map((rowData, index) => (
                                    <Row
                                        key={index}
                                        data={rowData}
                                        widthArr={widthArr(40)}
                                        style={[styles.row, index%2 && {backgroundColor: '#d0e6cf'}]}
                                        textStyle={styles.text}
                                    />
                                ))
                            }
                        </TableWrapper>
                    </View>
                </ScrollView>
            </Table>
        </View>
    );
}

export default PlayedScorecard;

const styles = StyleSheet.create({
    container: {backgroundColor: '#fff'},
    title: {backgroundColor: '#f6f8fa'},
    titleText: {textAlign:'center'},
    row: {height: 40},
    text: {textAlign: 'center', fontSize: 15},
});