import React, { useEffect, useState } from 'react';
import { Modal, Text, View, StyleSheet, Alert, ActivityIndicator, TouchableOpacity } from 'react-native'
import Colors from '../../constants/Colors';

// EXTERNAL
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Validator from 'email-validator';

// COMPONENTS
import Input from '../../components/Auth/Input';
import Button from '../../components/Auth/Button';

// REDUX    
import { useDispatch, useSelector } from 'react-redux';
import * as authActions from '../../store/actions/auth';

const Signup = (props) => {
    const dispatch = useDispatch()
    const errorMSG = useSelector(state => state.auth.errorMSG)
    const errorType = useSelector(state => state.auth.errorType)
    const isLoading = useSelector(state => state.auth.isLoading)
    const [formValid, setFormValid] = useState(false)
    const [form, setForm] = useState({
        name: {
            text: '',
            valid: false
        },
        email: {
            text: '',
            valid: false
        },
        phone: {
            text: '',
            valid: false,
            phoneNumber: true
        },
        password: {
            text: '',
            valid: false,
            showMSG: true
        }
    })

    useEffect(() => {
        const inputs = Object.values(form);

        // returns either true or false
        const formValid = inputs.filter(input => input.valid === false).length === 0
        setFormValid(formValid)
    }, [form])


    const textChangeHandler = (text, id) => {
        let valid;

        if (id === 'phone') {
            valid = text.length === 10
        } else if (id === 'name') {
            valid = text.length > 4 && text.length < 30
        } else if (id === 'password') {
            valid = text.length > 6
        } else if (id === 'email') {
            valid = Validator.validate(text)
        }
        setForm({
            ...form,
            [id]: {
                text,
                valid
            }
        })
    }

    const submitButtonHandler = () => {
        if (formValid) {
            dispatch(authActions.signup(
                form.email.text,
                form.password.text,
                form.name.text,
                form.phone.text,
            ))
        }
    }

    if (errorMSG !== null && errorType === "signup") {
        Alert.alert(
            "Error",
            errorMSG,
            [
                { text: "Okay", onPress: () => dispatch(authActions.error(null, null)) }
            ],
            { cancelable: false }
        );
    }

    return (
        <Modal visible={props.visible} transparent={true} animationType={"slide"}>
            <View style={styles.mainContainer}>
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>Sign up to continue</Text>
                    <View style={styles.inputs}>
                        <Input
                            id={'name'}
                            placeholder={"Full Name"}
                            changeText={textChangeHandler}
                            text={form.name.text}
                            valid={form.name.valid}
                        />

                        <Input
                            id={'email'}
                            placeholder={'Email'}
                            changeText={textChangeHandler}
                            text={form.email.text}
                            valid={form.email.valid}
                        />

                        <View style={styles.phoneContainer}>
                            <Text style={{ marginRight: 10, fontSize: wp('5%') }}>+1</Text>
                            <Input
                                id={'phone'}
                                placeholder={"Phone Number"}
                                changeText={textChangeHandler}
                                text={form.phone.text}
                                valid={form.phone.valid}
                            />
                        </View>

                        <Input
                            id={'password'}
                            placeholder={"Password"}
                            changeText={textChangeHandler}
                            text={form.password.text}
                            showMSG
                            valid={form.password.valid}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button onPress={submitButtonHandler} active={formValid} title="Sign up" />
                    </View>
                    <View style={{ width: '100%', alignItems: 'center', height: '20%', justifyContent: 'center' }}>
                        {isLoading && <ActivityIndicator color={Colors.secondary} />}
                    </View>
                    <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={styles.text}>Already have an account? </Text>
                        <TouchableOpacity onPress={props.changeModal}><Text style={{ color: Colors.secondary }}>Login</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal >
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    infoContainer: {
        backgroundColor: 'white',
        height: '90%',
        width: '100%',
        borderRadius: 30,
        paddingTop: '10%',
        paddingHorizontal: '8%',

    },
    title: {
        color: Colors.secondary,
        fontSize: wp('6%'),
        fontWeight: 'bold'
    },
    inputs: {
        marginTop: '10%',
        height: '40%',
        justifyContent: 'space-around'
    },
    buttonContainer: {
        marginTop: '20%',
        width: '100%',
        alignItems: 'center'
    },
    phoneContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center'
    },
    text: {
        fontSize: wp('4%'),
    }
})

export default Signup