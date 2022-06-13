import React, {useEffect, useState} from 'react';
import {StyleSheet} from "react-native";
import {View,Text} from "react-native";
import StarRating from "react-native-star-rating";




const ReviewCard = (props) => {



    return (
        <View style={styles.body}>
            <View style={styles.card}>
                <Text>{props.user}</Text>
                <View style={styles.stars}>
                    <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={props.rate}
                        fullStarColor={"gold"}
                        halfStarEnabled
                    />
                </View>

                <Text>{props.comment}</Text>
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
        marginBottom:10
    },

    card:{
       display:"flex",
        width:"90%",
        height:"100%",
        borderBottomWidth:2,
        borderBottomColor:"grey"
    },


    stars:{
        width:"40%",
    }
})
