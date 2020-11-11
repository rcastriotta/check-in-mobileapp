import React, { useRef, useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

// EXTERNAL
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



const Input = (props) => {
    const inputRef = useRef(null)
    const [focused, setFocused] = useState(false)
    let inputStyles;
    let keyboardType = 'default'

    if (focused) {
        inputStyles = { ...styles.input, borderBottomWidth: 2 }
    } else {
        inputStyles = styles.input
    }

    if (props.phoneNumber) {
        inputStyles = { ...inputStyles, width: '100%' }
    }

    if (props.id === 'phone') {
        keyboardType = 'number-pad'
    } else if (props.id === 'email') {
        keyboardType = 'email-address'
    }

    if (!props.valid && props.text.length > 0) {
        inputStyles = { ...inputStyles, borderBottomColor: 'red' }
    }

    return (
        <View>
            <TextInput
                ref={inputRef}
                style={inputStyles}
                onChangeText={(text) => props.changeText(text, props.id)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder={props.placeholder}
                autoCorrect={false}
                value={props.text}
                keyboardType={keyboardType}
                maxLength={props.id === 'phone' ? 10 : null}

            />
            {props.showMSG && <Text style={styles.message}>Must be longer than 6 characters</Text>}

        </View>

    )
}

const styles = StyleSheet.create({
    input: {
        borderBottomColor: Colors.secondary,
        width: '100%',
        borderBottomWidth: 1,
        fontSize: wp('4.2%'),
        paddingVertical: 10
    },
    message: {
        color: Colors.secondary,
        marginTop: 2,
        fontSize: 11
    }
})

export default Input;