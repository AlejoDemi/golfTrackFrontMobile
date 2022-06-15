import React, {useState} from 'react';
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View,TextInput} from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Leaderboard from 'react-native-leaderboard';
import Feather from "react-native-vector-icons/Feather";
import ReviewCard from "./ReviewCard";
import {ScrollView} from "react-native";
import StarRating from 'react-native-star-rating';
import {gql, useMutation} from "@apollo/client";
import {useSelector} from "react-redux";

const SAVE_REVIEW = gql`
mutation Mutation($input: ReviewInput) {
    addReview(input: $input){
        id
    }
}
`

export default function ReviewsScreen({navigation}) {


    const course = useSelector(state => state.course);
    const playerId = useSelector(state => state.playerId);

    const [starCount,setStarCount]=useState(5);
    const [comment,setComment]=useState("");
    const [reviews,setReviews]=useState(course.course.reviews);

    const [saveReview] = useMutation(SAVE_REVIEW,{
        onCompleted: r => navigation.navigate('Home'),
        onError: e => console.log(e),
    });

    const submitRate = () => {
        saveReview({
            variables: {
                    input: {
                        ratingNumber: starCount,
                        ratingText: comment,
                        courseId: course.course.id,
                        userId: playerId.playerId,
                    }
            }
        })
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
                    />
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
                    <TouchableOpacity style={styles.rateButton} onPress={submitRate}>
                        <Text style={styles.buttonText}>Rate</Text>
                    </TouchableOpacity>
                </View>


            </View>
            <View style={styles.reviews}>
                {reviews.map((review,index)=>
                    <ReviewCard rate={review.rating} comment={review.description}/>)}
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
    },

    rate:{
        height:300,
        backgroundColor:"white",
        width:"95%",
        alignSelf:"center",
        borderRadius:20,
        marginBottom:15,
    },

    reviews:{
        display:"flex",
        width:"100%",
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
        height:"20%"
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
        height:"80%",
        fontSize:20,
        borderColor:"grey",
        borderRadius:15
    },

    rateButtonContainer:{
        height:"30%",
        display:"flex",
        justifyContent:"center"
    },


    rateButton:{
        height:"50%",
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