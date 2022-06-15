import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import {useDispatch, useSelector} from "react-redux";


const Scorecard = (props) => {
    const unit = useSelector(state => state.unit);

    const fullData = () => {
        let multipier = 1;
        if (unit.unit === 'meters'){
            multipier = 0.9144;
        }
        const data = [];
        const holes = [];
        const pars = [];
        const distances = [];
        const handicap = []
        for (const hole of course.holesList) {
            holes.push(hole.num);
            pars.push(hole.par);
            distances.push(Math.round(hole.distance*multipier));
            handicap.push(hole.scoringIndex);
        }
        data.push(holes);
        data.push(pars);
        data.push(distances);
        data.push(handicap);

        return data;
    }

    const widthArr = (width) => {
        const aux = [];
        for (const h of course.holesList) {
            aux.push(width)
        }
        return aux
    }

    const course = props.course;
    const MAIN_COL = ['Hole','Par','Distance', 'Handicap'];
    const data = fullData();


    return (

        <View style={styles.container}>
            <Table style={{flexDirection: 'row'}}>
                {/* Left Wrapper */}
                <TableWrapper style={{width: 80, flexDirection: 'row'}}>
                    <Col data={MAIN_COL} style={styles.title} heightArr={[40, 40, 40,40]} textStyle={styles.titleText}/>
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

export default Scorecard;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 15, backgroundColor: '#fff' },
    title: { backgroundColor: '#f6f8fa' },
    titleText: { textAlign:'center' },
    row: {height: 40},
    text: { textAlign: 'center', fontSize: 15},
});