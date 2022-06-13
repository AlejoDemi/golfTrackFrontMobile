import React, {createRef, forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from "react-native";
import MapView, {AnimatedRegion, Marker, MarkerAnimated, Polyline, PROVIDER_GOOGLE} from "react-native-maps";
import {faCircleDot, faGolfBallTee, faFlag} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import * as Location from "expo-location";

const PlayingHole = forwardRef((props, ref) => {
    const hole = props.hole;
    const mapView = createRef();
    const [myMarker, setMyMarker] = useState(null);

    const restoreValues = () => {
        setDraggableLocation({
            lat: averageLocation(hole.locationTeebox, hole.locationMidOfGreen).latitude,
            lng: averageLocation(hole.locationTeebox, hole.locationMidOfGreen).longitude
        })
    }

    useImperativeHandle(ref, () => ({
        restoreValues
    }));

    const averageLocation = (loc1, loc2) => {
        return {
            latitude: (loc1.lat + loc2.lat)/2,
            longitude: (loc1.lng + loc2.lng)/2,
        }
    }

    const [draggableLocation, setDraggableLocation] = useState({
        lat: averageLocation(hole.locationTeebox, hole.locationMidOfGreen).latitude,
        lng: averageLocation(hole.locationTeebox, hole.locationMidOfGreen).longitude
    })

    const [movable, setMovable] = useState({
        latitude: averageLocation(hole.locationTeebox, hole.locationMidOfGreen).latitude,
        longitude: averageLocation(hole.locationTeebox, hole.locationMidOfGreen).longitude,
    });

    const distanceBetweenLocations = (loc1, loc2) => {
        const dLat = toRad(parseFloat(loc1.lat) - parseFloat(loc2.lat));
        const dLon = toRad(parseFloat(loc1.lng) - parseFloat(loc2.lng));

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(parseFloat(loc2.lat))) *
            Math.cos(toRad(parseFloat(loc1.lat))) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        return Math.round(13928280.2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
    }

    const toRad = (x) => {
        return x * Math.PI / 180;
    }

    const getDirection = (loc1, loc2) => {
        const dLat = loc2.lat - loc1.lat;
        const dLong = loc2.lng - loc1.lng;

        const dir = Math.atan(dLong/dLat)*180;
        return -dir;
    }

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                ref={mapView}
                style={styles.map}
                mapType="satellite"
                scrollEnabled={false}
                showsCompass={false}
                //onPress={ev => moveMarker(ev.nativeEvent.coordinate)}
                camera={{
                    center: { latitude: averageLocation(hole.locationTeebox, hole.locationMidOfGreen).latitude, longitude: averageLocation(hole.locationTeebox, hole.locationMidOfGreen).longitude },
                    pitch: 30,
                    zoom: 17.9,
                    heading: getDirection(hole.locationTeebox, hole.locationMidOfGreen),
                    altitude:0,
                }}

            >
                <Marker
                    ref={marker => {
                        setMyMarker(marker);
                    }}
                    tappable={false}
                    identifier={'Movable'}
                    //onDrag={(e) => setDraggableLocation({lat: e.nativeEvent.coordinate.latitude, lng: e.nativeEvent.coordinate.longitude})}
                    coordinate={{latitude: draggableLocation.lat, longitude: draggableLocation.lng}}
                    anchor={{x: 0.5, y: 0.5}}
                >
                    <View>
                        <FontAwesomeIcon
                            icon={faCircleDot}
                            color={'white'}
                            size={30}
                        />
                    </View>
                </Marker>
                <Marker
                    identifier={'Teebox'}
                    tappable={false}
                    coordinate={{ latitude : hole.locationTeebox.lat, longitude : hole.locationTeebox.lng }}>
                    <View>
                        <FontAwesomeIcon
                            icon={faGolfBallTee}
                            color={'white'}
                            size={30}
                        />
                    </View>
                </Marker>
                <Marker
                    tappable={false}
                    identifier={'TeeboxMiddle'}
                    coordinate={{ latitude: averageLocation(hole.locationTeebox, draggableLocation).latitude, longitude: averageLocation(hole.locationTeebox, draggableLocation).longitude}}
                >
                    <View>
                        <Text
                            style={{
                                position: "absolute",
                                color: "white",
                                textAlign: "center",
                                fontWeight: "bold"
                            }}>{distanceBetweenLocations(hole.locationTeebox, draggableLocation)}</Text>
                    </View>
                </Marker>
                <Marker
                    tappable={false}
                    identifier={'Green'}
                    coordinate={{ latitude : hole.locationMidOfGreen.lat, longitude : hole.locationMidOfGreen.lng }}
                    anchor={{x: 0, y: 1}}
                >
                    <View>
                        <FontAwesomeIcon
                            icon={faFlag}
                            color={'white'}
                            size={30}
                        />
                    </View>
                </Marker>
                <Marker
                    tappable={false}
                    identifier={'MiddleGreen'}
                    coordinate={{ latitude: averageLocation(hole.locationMidOfGreen, draggableLocation).latitude, longitude: averageLocation(hole.locationMidOfGreen, draggableLocation).longitude}}
                >
                    <View>
                        <Text
                            style={{
                                position: "absolute",
                                color: "white",
                                textAlign: "center",
                                fontWeight: 'bold'
                            }}>{distanceBetweenLocations(hole.locationMidOfGreen, draggableLocation)}</Text>
                    </View>
                </Marker>
                <Polyline
                    coordinates={[{ latitude : hole.locationTeebox.lat, longitude : hole.locationTeebox.lng},{latitude: draggableLocation.lat, longitude: draggableLocation.lng}, { latitude : hole.locationMidOfGreen.lat, longitude : hole.locationMidOfGreen.lng}]}
                    strokeColor={'white'}
                    strokeWidth={3}
                />
            </MapView>
        </View>
    );
});

export default PlayingHole;

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