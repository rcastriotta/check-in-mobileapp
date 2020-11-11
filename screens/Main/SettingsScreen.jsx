import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import * as authActions from '../../store/actions/auth';

// EXTERNAL
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const SettingsScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const userData = useSelector(state => state.auth)

    const signout = () => {
        dispatch(authActions.signOut())
        navigation.navigate('Home')
    }

    return (
        <View style={styles.screen}>
            <View style={styles.topContainer}>
                <View>
                    <Text style={styles.label}>Name</Text>
                    <Text style={styles.info}>{userData.name}</Text>
                </View>

                <View>
                    <Text style={styles.label}>Email</Text>
                    <Text style={styles.info}>{userData.email}</Text>
                </View>

                <View>
                    <Text style={styles.label}>Phone Number</Text>
                    <Text style={styles.info}>{userData.phone}</Text>
                </View>

                <View>
                    <Text style={styles.label}>ID</Text>
                    <Text style={styles.info}>{userData.uid}</Text>
                </View>
            </View>
            <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={signout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1
    },
    topContainer: {
        width: '100%',
        height: '60%',
        paddingHorizontal: '5%',
        paddingVertical: '10%',
        justifyContent: 'space-between'
    },
    button: {
        marginBottom: '20%'
    },
    buttonText: {
        color: Colors.secondary,
        fontWeight: 'bold'
    },
    label: {
        color: 'gray',
        fontSize: wp('4.5%'),
        marginBottom: '5%'
    },
    info: {
        fontSize: wp('4.5%'),
        color: Colors.secondary,
        fontWeight: 'bold'
    }
})

export default SettingsScreen;