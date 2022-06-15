import React, {useEffect, useState} from 'react';
import {StyleSheet} from "react-native";
import {View,Text} from "react-native";
import StarRating from "react-native-star-rating";

const ReviewCard = (props) => {

    return (
        <View style={styles.body}>
            <View style={styles.card}>
                <View style={styles.stars}>
                    <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={props.rate}
                        fullStarColor={"gold"}
                        halfStarEnabled
                        starSize={30}
                    />
                </View>

                <Text style={styles.text}>{props.comment}</Text>
            </View>
        </View>
    );
};

export default ReviewCard;


const styles = StyleSheet.create({
    body:{
        height:90,
        width:"100%",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        marginBottom:10,

    },

    card:{
        marginTop:10,
        backgroundColor:"white",
        display:"flex",
        width:"90%",
        height:"100%",
        borderRadius:10,
        padding:10,
        zIndex:2,
        elevation:2,

    },


    stars:{
        width:"20%",
        marginLeft:10,
        marginBottom:10,
    },

    text:{
        marginLeft:10,
        justifyContent:"center",
    }
})
