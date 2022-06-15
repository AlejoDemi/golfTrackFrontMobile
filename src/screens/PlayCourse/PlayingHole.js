import React, {createRef, forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {Dimensions, PermissionsAndroid, StyleSheet, Text, View} from "react-native";
import MapView, {AnimatedRegion, Marker, MarkerAnimated, Polyline, PROVIDER_GOOGLE} from "react-native-maps";
import {faCircleDot, faGolfBallTee, faFlag} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import * as Location from "expo-location";
import {useSelector} from "react-redux";

const PlayingHole = forwardRef((props, ref) => {
    const hole = props.hole;
    const mapView = createRef();
    const [myMarker, setMyMarker] = useState(null);
    const unit = useSelector(state => state.unit);


    const restoreValues = () => {
        setDraggableLocation({
            lat: averageLocation({
                lat:geoLocation.latitude,
                lng:geoLocation.latitude
            }, hole.locationMidOfGreen).latitude,
            lng: averageLocation({
                lat:geoLocation.latitude,
                lng:geoLocation.latitude
            }, hole.locationMidOfGreen).longitude
        })
    }

    useImperativeHandle(ref, () => ({
        restoreValues
    }));

    const [geoLocation, setGeoLocation] = useState({
        latitude: hole.locationTeebox.lat,
        longitude: hole.locationTeebox.lng,
    })
/*
    useEffect(async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return;
        }

        setInterval(async () => {
            let loc = await Location.getCurrentPositionAsync();
            await setGeoLocation({
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude
            })
            return () => clearInterval(id);
        }, 1000);
    });*/

    const averageLocation = (loc1, loc2) => {
        return {
            latitude: (loc1.lat + loc2.lat)/2,
            longitude: (loc1.lng + loc2.lng)/2,
        }
    }

    const [draggableLocation, setDraggableLocation] = useState({
        lat: averageLocation({
            lat:geoLocation.latitude,
            lng:geoLocation.latitude
        }, hole.locationMidOfGreen).latitude,
        lng: averageLocation({
            lat:geoLocation.latitude,
            lng:geoLocation.latitude
        }, hole.locationMidOfGreen).longitude
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
        let multiplier = 1;
        if (unit.unit === 'meters'){
            multiplier = 0.9144;
        }
        return Math.round(13928280.2 * multiplier * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
    }

    const angleFromCoordinate = (lat1, long1, lat2, long2) => {

        const dLon = (long2 - long1);

        const y = Math.sin(dLon) * Math.cos(lat2);
        const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

        let brng = Math.atan2(y, x);

        brng = brng*(180/Math.PI);
        brng = (brng + 360) % 360;
        brng = 360 - brng; // count degrees counter-clockwise - remove to make clockwise

        return brng;
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

    const moveMarker = (loc) => {
        setDraggableLocation({
            lat: loc.latitude,
            lng: loc.longitude,
        })
    }

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                moveOnMarkerPress={false}
                ref={mapView}
                style={styles.map}
                mapType="satellite"
                pitchEnabled={false}
                rotateEnabled={false}
                showsCompass={false}
                showsUserLocation={true}
                showsMyLocationButton={false}
                onUserLocationChange={e => {
                    if (distanceBetweenLocations({lat: e.nativeEvent.coordinate.latitude, lng: e.nativeEvent.coordinate.longitude},
                        hole.locationTeebox) > 500){
                        setGeoLocation({latitude: hole.locationTeebox.lat,longitude: hole.locationTeebox.lng})
                    }else{
                        setGeoLocation(e.nativeEvent.coordinate)
                    }
                }}
                onMapReady={() => {
                    setDraggableLocation({
                        lat: averageLocation(hole.locationTeebox, hole.locationMidOfGreen).latitude,
                        lng: averageLocation(hole.locationTeebox, hole.locationMidOfGreen).longitude
                    })
                }}
                minZoomLevel={17.9 + (344-distanceBetweenLocations(hole.locationTeebox, hole.locationMidOfGreen))/172}
                onPress={ev => moveMarker(ev.nativeEvent.coordinate)}
                camera={{
                    center: { latitude: averageLocation(hole.locationTeebox, hole.locationMidOfGreen).latitude, longitude: averageLocation(hole.locationTeebox, hole.locationMidOfGreen).longitude },
                    pitch: 30,
                    zoom:17.9 + (344-distanceBetweenLocations(hole.locationTeebox, hole.locationMidOfGreen))/172,
                    heading: angleFromCoordinate(hole.locationTeebox.lat,hole.locationTeebox.lng, hole.locationMidOfGreen.lat, hole.locationMidOfGreen.lng),
                    altitude: 0,
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
                    coordinate={geoLocation}>
                    <View>
                        <Text> </Text>
                    </View>
                </Marker>
                <Marker
                    tappable={false}
                    identifier={'TeeboxMiddle'}
                    coordinate={averageLocation({
                        lat:geoLocation.latitude,
                        lng: geoLocation.longitude}, draggableLocation)}
                >
                    <View>
                        <Text
                            style={{
                                position: "absolute",
                                color: "white",
                                textAlign: "center",
                                fontWeight: "bold"
                            }}>{distanceBetweenLocations({
                            lat:geoLocation.latitude,
                            lng: geoLocation.longitude,
                        }, draggableLocation)}</Text>
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
                    coordinates={[geoLocation,{latitude: draggableLocation.lat, longitude: draggableLocation.lng}, { latitude : hole.locationMidOfGreen.lat, longitude : hole.locationMidOfGreen.lng}]}
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