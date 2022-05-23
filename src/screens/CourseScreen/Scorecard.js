import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';


const Scorecard = (props) => {
    const fullData = () => {
        const data = [];
        const holes = [];
        const distances = [];
        const handicap = []
        for (const hole of course.holesList) {
            holes.push(hole.num);
            distances.push(hole.distance);
            handicap.push(hole.scoringIndex);
        }
        data.push(holes);
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
    const MAIN_COL = ['Hole','Distance', 'Handicap'];
    const data = fullData();


    return (

        <View style={styles.container}>
            <Table style={{flexDirection: 'row'}}>
                {/* Left Wrapper */}
                <TableWrapper style={{width: 80, flexDirection: 'row'}}>
                    <Col data={MAIN_COL} style={styles.title} heightArr={[40, 40, 40]} textStyle={styles.titleText}/>
                </TableWrapper>

                {/* Right Wrapper */}
                <ScrollView horizontal>
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