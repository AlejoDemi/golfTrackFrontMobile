import React from 'react';
import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FrontScreen from "./FrontScreen";
import LogInScreen from "./LogInScreen";
import SignUpScreen from "./SignUpScreen";
import ForgotPasswordScreen from "./ForgotPasswordScreen";

const RootStack = createNativeStackNavigator();

const RootStackScreen = () => (
    <RootStack.Navigator screenOptions={{
        headerShown: false,
        animation:'slide_from_right'}}>
        <RootStack.Screen name="FrontScreen" component={FrontScreen}/>
        <RootStack.Screen name="LogInScreen" component={LogInScreen}/>
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/>
        <RootStack.Screen name="ForgotPass" component={ForgotPasswordScreen}/>
    </RootStack.Navigator>
)

export default RootStackScreen
