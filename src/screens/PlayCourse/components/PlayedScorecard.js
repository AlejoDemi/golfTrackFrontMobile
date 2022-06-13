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
        const score = [];
        const putts = [];
        const gir = [];
        const fairways = [];

        for (const hole of course.holesList) {
            holes.push(hole.num);
            pars.push(hole.par);
            score.push(round.holesScore[hole.num-1].score);
            if (round.holesScore[hole.num-1].gir){
                gir.push("\u2713");
            }else{
                gir.push('X');
            }
            putts.push(round.holesScore[hole.num-1].putts);
            if (round.holesScore[hole.num-1].fairway === 'middle'){
                fairways.push("\u2713");
            }else if (round.holesScore[hole.num-1].fairway === 'right'){
                fairways.push('→');
            }else if(round.holesScore[hole.num-1].fairway === 'left'){
                fairways.push('←');
            }else if(round.holesScore[hole.num-1].fairway === 'cross'){
                fairways.push('X');
            }else{
                fairways.push(' ');
            }

            if (hole.num === 9|| hole.num === 18){
                holes.push('');
                pars.push(course.getPar(hole.num));
                score.push(round.getScore(hole.num));
                putts.push(round.getPutts(hole.num));
                gir.push(Math.round(round.getPercentageGIR(hole.num)*100) + "%")
                fairways.push(Math.round(round.getPercentageFairways(hole.num)*100) + "%");
            }
        }
        data.push(holes);
        data.push(pars);
        data.push(score);
        data.push(putts);
        data.push(gir);
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

    const MAIN_COL = ['Hole','Par', 'Score', 'Putts','GIR', 'Fairways'];
    const data = fullData();

    return (

        <View style={styles.container}>
            <Table style={{flexDirection: 'row'}}>
                {/* Left Wrapper */}
                <TableWrapper style={{width: 80, flexDirection: 'row'}}>
                    <Col data={MAIN_COL} style={styles.title} heightArr={[40, 40, 40,40,40,40]} textStyle={styles.titleText}/>
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