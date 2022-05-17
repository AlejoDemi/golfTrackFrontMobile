import * as React from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {useSelector} from "react-redux";
import {createRef, useEffect, useState} from "react";

const PlayGameScreen = () => {
    const mapView = createRef();
    const course = useSelector(state => state.course);
    console.log(course);

    useEffect(() => {
        mapView.current.fitToSuppliedMarkers(['Teebox','Green'])
    },[])

    return (
        <View style={styles.container}>
            <MapView
                ref={mapView}
                scrollEnabled={false}
                rotateEnabled={false}
                style={styles.map}
                mapType="satellite"
            >
                <Marker
                    identifier={'Teebox'}
                    centerOffset={{x: 0.5, y: 5}}
                    coordinate={{ latitude : course.course.holesList[0].locationTeebox.lat, longitude : course.course.holesList[0].locationTeebox.lng }}
                />
                <Marker
                    identifier={'Green'}
                    coordinate={{ latitude : course.course.holesList[0].locationMidOfGreen.lat, longitude : course.course.holesList[0].locationMidOfGreen.lng }}
                />
            </MapView>
        </View>
    );
}

export default PlayGameScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});