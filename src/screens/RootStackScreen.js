import React, {useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FrontScreen from "./Login/FrontScreen";
import LogInScreen from "./Login/LogInScreen";
import SignUpScreen from "./Login/SignUpScreen";
import ForgotPasswordScreen from "./Login/ForgotPasswordScreen";
import {TabBarNavigator} from "../components/TabBarNavigator";
import EditProfileScreen from "./EditProfileScreen";
import CourseScreen from "./CourseScreen/CourseScreen";
import ReviewsScreen from "./ReviewsScreen";
import GameSetUpScreen from "./PlayCourse/GameSetUpScreen";
import PlayGameScreen from "./PlayCourse/PlayGameScreen";

const RootStack = createNativeStackNavigator();

const RootStackScreen = () => (

    <RootStack.Navigator screenOptions={{
        headerShown: false,
        animation:'slide_from_right'}}
        initialRouteName={'FrontScreen'}>
        <RootStack.Screen name="FrontScreen" component={FrontScreen}/>
        <RootStack.Screen name="LogInScreen" component={LogInScreen}/>
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/>
        <RootStack.Screen name="ForgotPass" component={ForgotPasswordScreen}/>
        <RootStack.Screen name="Home" component={TabBarNavigator}/>
        <RootStack.Screen name="EditProfile" component={EditProfileScreen}/>
        <RootStack.Screen name="Course" component={CourseScreen}/>
        <RootStack.Screen name="Reviews" component={ReviewsScreen}/>
        <RootStack.Screen name="SetUp" component={GameSetUpScreen}/>
            <RootStack.Screen name="PlayGame" component={PlayGameScreen} />
    </RootStack.Navigator>
)

export default RootStackScreen
