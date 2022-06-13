import React, {useEffect, useState} from 'react';
import {StyleSheet} from "react-native";
import {View,Text} from "react-native";
import {Star} from "@mui/icons-material";

const Stars=(props) =>{

    const [stars,setStars] = useState(["","","","",""]);

    useEffect(()=>{
        let starsAux=new Array(5).fill("");
        for (let i = 0; i < props.rate; i++) {
            starsAux[i]="stars"
        }
        setStars(starsAux);
    })

    return (
        <View style={styles.starsContainer}>
            {
                stars.map((star,index)=>
                    stars[index]==="stars"?
                        <Text></Text>
                        :
                        null
                )
            }

        </View>
    );
}


const ReviewCard = (props) => {



    return (
        <View style={styles.body}>
            <View style={styles.card}>
                <Text>{props.user}</Text>
                <Stars rate={props.rate}></Stars>
                <Text>{props.comment}</Text>
            </View>
        </View>
    );
};

export default ReviewCard;


const styles = StyleSheet.create({
    body:{
        height:"100%",
        width:"100%",
       display:"flex",
        alignItems:"center",
        justifyContent:"center"
    },

    card:{
       display:"flex",
        width:"90%",
        height:150,
        backgroundColor:"red"
    },

    starsContainer:{
        display:"flex",
        flexDirection:"row",
    },
})
