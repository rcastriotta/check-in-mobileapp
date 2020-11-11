import React from 'react';
import Colors from '../constants/Colors';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import { Button, TouchableOpacity } from 'react-native'

// SCREENS
import ScanScreen from '../screens/Main/ScanScreen';
import CheckInsScreen from '../screens/Main/CheckInsScreen'
import SettingsScreen from '../screens/Main/SettingsScreen';

// EXTERNAL
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const MainNavigator = () => {
    return (
        <Stack.Navigator mode="modal">
            <Stack.Screen options={{ headerShown: false }} name="Home" component={ScanScreen} />
            <Stack.Screen options={({ navigation }) => ({
                cardStyle:
                    { backgroundColor: Colors.primary },
                headerLeft: () => (
                    <TouchableOpacity style={{ height: '100%', width: wp('25%'), paddingLeft: '20%', justifyContent: 'center' }} onPress={() => navigation.navigate('Home')}>
                        <Ionicons name={"ios-arrow-down"} size={wp('8%')} color={Colors.secondary} style={{}} />
                    </TouchableOpacity>

                ),
                headerTintColor: Colors.secondary
            })} name="Recents" component={CheckInsScreen} />
            <Stack.Screen options={({ navigation }) => ({
                cardStyle:
                    { backgroundColor: Colors.primary },
                headerLeft: () => (
                    <TouchableOpacity style={{ height: '100%', width: wp('25%'), paddingLeft: '20%', justifyContent: 'center' }} onPress={() => navigation.navigate('Home')}>
                        <Ionicons name={"ios-arrow-down"} size={wp('8%')} color={Colors.secondary} style={{}} />
                    </TouchableOpacity>

                ),
                headerTitle: "My Info",
                headerTintColor: Colors.secondary
            })} name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
    )
}

export default MainNavigator;