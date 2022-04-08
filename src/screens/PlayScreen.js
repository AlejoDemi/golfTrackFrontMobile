import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function PlayScreen({navigation}) {
    return (
        <View style={{flex:1}}>
            <View style={styles.header}>
                <Text style={styles.tittle}> Nearby courses</Text>
            </View>

            <View style={styles.nearbyCourses}>
                <View style={styles.coursesContainer}>
                    <View style={styles.courseBox}>
                        <Text style={styles.tittle}> Nearby courses</Text>
                    </View>
                    <View style={styles.courseBox}>
                        <Text style={styles.tittle}> Nearby courses</Text>
                    </View>
                    <View style={styles.courseBox}>
                        <Text style={styles.tittle}> Nearby courses</Text>
                    </View>
                </View>
            </View>

            <View style={styles.footer}/>
        </View>
    );
}

const styles = StyleSheet.create({
    tittle:{
        fontSize:30,
        color: '#05375a',
        alignSelf: "center",
        marginTop: 40,

    },

    header:{
        flex:2,
        alignContent:"center"
    },

    nearbyCourses:{
        flex:10,
        alignContent:"center",
    },

    footer:{
        flex:3,
    },

    coursesContainer:{
        flex:1,
        flexDirection:"row",
        marginTop:20,

    },

    courseBox:{
        alignContent:"center",
        borderRadius: 20,
        width:"30%",
        height:"10%",
        backgroundColor: "white",
        shadowColor:"black",
        shadowOpacity:0.35,
        shadowOffset:{
            width:0,
            height:2,
        },
    }
});

export default PlayScreen;