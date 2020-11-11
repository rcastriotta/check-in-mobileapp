import React, { useState } from 'react';
import { Modal, Button, Text, View, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

// EXTERNAL
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const EnterCode = (props) => {
    const [text, setText] = useState('')

    const submitHandler = () => {
        if (text.length > 0) {
            props.submitHandler(text)
            setText('')
            props.close()
        }

    }
    return (
        <Modal visible={props.visible} transparent={true} animationType="slide">
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={{ flex: 1, width: '100%' }} onPress={props.close} />
                <View style={styles.container}>
                    <Text style={styles.label}>Enter Code:</Text>
                    <View style={styles.inputContainer}>
                        <TextInput autoFocus={true} value={text} onChangeText={text => setText(text)} style={styles.input} autoCorrect={false} />
                        <TouchableOpacity style={styles.enterCode} onPress={submitHandler}>
                            <Ionicons name={"md-arrow-forward"} size={wp('6.5%')} color={"white"} style={{}} />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={{ flex: 1, width: '100%' }} onPress={props.close} />

            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '25%',
        width: '90%',
        borderRadius: 10,
        backgroundColor: 'white',
        paddingHorizontal: '8%',
        paddingTop: '10%',
        flex: .4
    },
    label: {
        color: Colors.secondary,
        fontWeight: 'bold',
        fontSize: wp('5%')
    },
    inputContainer: {
        marginTop: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    input: {
        width: '80%',
        aspectRatio: 6,
        backgroundColor: 'rgba(0, 0, 0, .15)',
        borderRadius: 100,
        paddingHorizontal: '5%',
        fontSize: wp('5%'),
        color: Colors.secondary
    },
    enterCode: {
        width: '13%',
        aspectRatio: 1,
        backgroundColor: Colors.secondary,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default EnterCode; 