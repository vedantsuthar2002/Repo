import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PostScreen from '../components/PostScreen';
import ProNavScreen from './ProNavScreen';
import HomeDetailsScreen from './HomeDetails';
import SearchNav from './SearchNav';
import SaveDetailsNav from './SaveDetailsNav';
const Tab = createBottomTabNavigator();

type TabProps = {
    size: number;
    label: string;
    icon: any;
    color: string;
    focused: boolean;
};

const TabNavigatorScreen = () => {
    const homeIcon = require('../../assets/nav/Home.png');
    const searchIcon = require('../../assets/nav/Search.png');
    const postIcon = require('../../assets/nav/Plus.png');
    const saveIcon = require('../../assets/nav/Bookmark.png');
    const profileIcon = require('../../assets/nav/Profile.png');

    const TabButton: React.FC<TabProps> = ({ icon, focused }) => (
        <Image
            source={icon}
            style={{
                tintColor: focused ? '#FB9400' : '#D1D5DB'
            }}
        />
    );

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBarStyle,
            }}
        >
            <Tab.Screen
                name='Home'
                component={HomeDetailsScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabButton icon={homeIcon} focused={focused} label={''} color={''} size={0} />
                    )
                }}
            />
            <Tab.Screen
                name='SearchNav'
                component={SearchNav}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabButton icon={searchIcon} focused={focused} label={''} color={''} size={0} />
                    ),
                }}
            />
            <Tab.Screen
                name='Add'
                component={PostScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabButton icon={postIcon} focused={focused} label={''} color={''} size={0} />
                    ),
                }}
            />
            <Tab.Screen
                name='Save'
                component={SaveDetailsNav}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabButton icon={saveIcon} focused={focused} label={''} color={''} size={0} />
                    ),
                }}
            />
            <Tab.Screen
                name='ProNav'
                component={ProNavScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabButton icon={profileIcon} focused={focused} label={''} color={''} size={0} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBarStyle: {
        height: 80,
        position: 'relative',
        backgroundColor: '#FFF',
        borderTopWidth: 0,
        elevation: 0,
        borderTopColor: 'transparent',
    },
    BlurViewStyle: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
});

export default TabNavigatorScreen;
