import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'
import Colors from '../../constants/Colors';

// EXTERNAL
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Button = (props) => {
    let buttonStyles;
    if (props.active) {
        buttonStyles = styles.button
    } else {
        buttonStyles = { ...styles.button, opacity: 0.2 }
    }
    return (
        <TouchableOpacity activeOpacity={props.active ? 0.7 : 1} onPress={props.onPress}>
            <View style={buttonStyles}>
                <Text style={styles.text}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '60%',
        aspectRatio: 3.8,
        backgroundColor: Colors.secondary,
        borderRadius: 100
    },
    text: {
        fontSize: wp('5%'),
        color: 'white',
        fontWeight: 'bold'
    }
})

export default Button;