import React, {useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FrontScreen from "./Login/FrontScreen";
import LogInScreen from "./Login/LogInScreen";
import SignUpScreen from "./Login/SignUpScreen";
import {TabBarNavigator} from "../components/TabBarNavigator";
import EditProfileScreen from "./EditProfileScreen";
import CourseScreen from "./CourseScreen/CourseScreen";
import GameSetUpScreen from "./PlayCourse/GameSetUpScreen";
import PlayGameScreen from "./PlayCourse/PlayGameScreen";
import ReviewsScreen from "./CourseScreen/Reviews/ReviewsScreen";
import {useDispatch} from "react-redux";
import apolloClient from "../../apollo";
import {ApolloProvider} from "@apollo/client";
import RoundScreen from "./CourseScreen/Rounds/RoundScreen";
import FullRoundScreen from "./FeedScreen/FullRoundScreen";

const RootStack = createNativeStackNavigator();

const RootStackScreen = () => (
            <RootStack.Navigator screenOptions={{
                    headerShown: false,
                    animation:'slide_from_right'}}
                                 initialRouteName={'FrontScreen'}>
                    <RootStack.Screen name="FrontScreen" component={FrontScreen}/>
                    <RootStack.Screen name="LogInScreen" component={LogInScreen}/>
                    <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/>
                    <RootStack.Screen name="Home" component={TabBarNavigator}/>
                    <RootStack.Screen name="EditProfile" component={EditProfileScreen}/>
                    <RootStack.Screen name="Course" component={CourseScreen}/>
                    <RootStack.Screen name="Reviews" component={ReviewsScreen}/>
                    <RootStack.Screen name="Rounds" component={RoundScreen}/>
                    <RootStack.Screen name="FullRound" component={FullRoundScreen}/>
                    <RootStack.Screen name="SetUp" component={GameSetUpScreen}/>
                    <RootStack.Screen name="PlayGame" component={PlayGameScreen} />
            </RootStack.Navigator>
)

export default RootStackScreen
