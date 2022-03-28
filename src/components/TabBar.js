import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AnimatedTabBar, {TabsConfig, BubbleTabConfig} from '@gorhom/animated-tabbar';

const tabs = {
    Home: {
        labelStyle: {
            color: '#5B37B7',
        },
        icon: {
            component: FeedSVG,
            activeColor: 'rgba(91,55,183,1)',
            inactiveColor: 'rgba(0,0,0,1)',
        },
        background: {
            activeColor: 'rgba(223,215,243,1)',
            inactiveColor: 'rgba(223,215,243,0)',
        },
    },
    Play: {
        labelStyle: {
            color: '#1194AA',
        },
        icon: {
            component:PlaySVG ,
            activeColor: 'rgba(17,148,170,1)',
            inactiveColor: 'rgba(0,0,0,1)',
        },
        background: {
            activeColor: 'rgba(207,235,239,1)',
            inactiveColor: 'rgba(207,235,239,0)',
        },
    },

    Profile: {
        labelStyle: {
            color: '#5B37B7',
        },
        icon: {
            component: ProfileSVG,
            activeColor: 'rgba(91,55,183,1)',
            inactiveColor: 'rgba(0,0,0,1)',
        },
        background: {
            activeColor: 'rgba(223,215,243,1)',
            inactiveColor: 'rgba(223,215,243,0)',
        },
    },
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#999',
    },
    tabBarContainer: {
        borderRadius: 25,
    },
});

export default function TabBar() {
    const [index, setIndex] = useState(0);
    return (
        <View style={styles.container}>
            <Text>{index}</Text>
            <AnimatedTabBarView
                tabs={tabs}
                itemOuterSpace={{
                    horizontal: 6,
                    vertical: 12,
                }}
                itemInnerSpace={12}
                iconSize={20}
                style={styles.tabBarContainer}
                index={index}
                onIndexChange={setIndex}
            />
        </View>
    )
}
