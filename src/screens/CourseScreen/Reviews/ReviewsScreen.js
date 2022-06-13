import React, {useState} from 'react';
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View,TextInput} from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Leaderboard from 'react-native-leaderboard';
import Feather from "react-native-vector-icons/Feather";
import ReviewCard from "./ReviewCard";
import {ScrollView} from "react-native";
import StarRating from 'react-native-star-rating';


export default function ReviewsScreen({navigation}) {

    const [starCount,setStarCount]=useState(2.5);
    const [comment,setComment]=useState("");
    const [reviews,setReviews]=useState([{user:"Alejo",rate:2,comment:"hola hola hola"},
                                                    {user:"Fede",rate:5,comment: "cacacacaca"} ,
                                                    {user:"Fede",rate:5,comment: "cacacacaca"} ,
                                                    {user:"Fede",rate:5,comment: "cacacacaca"} ,
                                                    {user:"Fede",rate:5,comment: "cacacacaca"} ])


    const submitRate=()=>{
        //mutation para review
    }


    return(
        <ScrollView style={styles.body}>
            <View style={styles.header}/>
            <View style={styles.rate}>
                <View style={styles.stars}>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={starCount}
                        selectedStar={setStarCount}
                        fullStarColor={"gold"}
                        halfStarEnabled
                    />
                    <Text style={styles.number}>{starCount}</Text>
                </View>
                <View style={styles.comment}>
                    <TextInput
                        placeholder="Give your opinion ..."
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={setComment}
                        keyboardType="email-address"
                        placeholderStyle={styles.textInput}
                        placeholderTextColor={"grey"}
                        multiline
                    />
                </View>
                <View style={styles.rateButtonContainer}>
                    <TouchableOpacity style={styles.rateButton} onClick={submitRate}>
                        <Text style={styles.buttonText}>RATE</Text>
                    </TouchableOpacity>
                </View>


            </View>
            <View style={styles.reviews}>
                <Text style={styles.reviewsTitle}>Other players opinions</Text>
                {reviews.map((review,index)=>
                <ReviewCard user={review.user} rate={review.rate} comment={review.comment}></ReviewCard>)}
            </View>
        </ScrollView>

    );
}

const styles=StyleSheet.create({
    body:{
        display:"flex",
        color:"white"
    },

    header:{
        height:100,
        backgroundColor:"green"
    },

    rate:{
        height:400,
        backgroundColor:"white"
    },

    reviews:{
        display:"flex"
    },

    reviewsTitle:{
        height:60,
        alignSelf:"center",
        fontSize:20,
    },

    stars:{
        width:"80%",
        marginTop:10,
        alignSelf:"center",
        height:"30%"
    },

    number:{
        fontWeight:"bold",
        fontSize:40,
        alignSelf:"center",
        marginTop:15
    },

    comment:{
        height:"40%"
    },

    textInput:{
        width:"90%",
        color:"grey",
        borderWidth:2,
        alignSelf:"center",
        height:"100%",
        fontSize:20,
        borderColor:"grey",
        borderRadius:15
    },

    rateButtonContainer:{
        height:"20%",
        display:"flex",
        justifyContent:"center"
    },


    rateButton:{
        height:"70%",
        width:"30%",
        alignSelf:"center",
        backgroundColor:"green",
        borderRadius:15,
        display:"flex",
        justifyContent:"center"
    },

    buttonText:{
        fontWeight:"bold",
        color:"white",
        alignSelf:"center",
        fontSize:20,

    }


})