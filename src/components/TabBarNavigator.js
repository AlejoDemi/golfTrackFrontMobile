import {
    faAlignLeft,
    faGolfBallTee,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import FeedScreen from "../screens/FeedScreen/FeedScreen";
import PlayScreen from "../screens/HomeScreen/PlayScreen";
import BubbleTabBar from "./react-native-bubble-tabbar/lib";
import EditProfileScreen from "../screens/EditProfileScreen";

const tabs = [
    {
        activeColor: '#4a8a3f',
        activeBackgroundColor: '#fff',
        activeIcon: faAlignLeft,
    },
    {
        activeColor: '#4a8a3f',
        activeBackgroundColor: '#fff',
        activeIcon: faGolfBallTee,
    },
    {
        activeColor: '#4a8a3f',
        activeBackgroundColor: '#fff',
        activeIcon: faUser,
    },
];

const fontAwesomeIconRenderer = ({ icon, color }) =>
    <FontAwesomeIcon
        icon={icon}
        color={color}
        size={18}
    />;

const CustomTabBar = ({state, descriptors, navigation}) => {
    return (
        <BubbleTabBar
            state={state}
            descriptors={descriptors}
            navigation={navigation}
            tabs={tabs}
            iconRenderer={fontAwesomeIconRenderer}
        />
    );
};

const Tab = createBottomTabNavigator();

export const TabBarNavigator= () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false }}
            tabBar={({ state, descriptors, navigation }) =>
                <CustomTabBar
                    state={state}
                    descriptors={descriptors}
                    navigation={navigation}
                />
            }
        >
            <Tab.Screen name="Feed" component={FeedScreen} />
            <Tab.Screen name="Play" component={PlayScreen} />
            <Tab.Screen name="Profile" component={EditProfileScreen} />
        </Tab.Navigator>
    );
};