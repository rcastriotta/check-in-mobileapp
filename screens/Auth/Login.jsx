import React, { useState, useEffect } from 'react';
import { Modal, Text, View, StyleSheet, Alert, ActivityIndicator, TouchableOpacity } from 'react-native'
import Colors from '../../constants/Colors';

// EXTERNAL
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// COMPONENTS
import Input from '../../components/Auth/Input';
import Button from '../../components/Auth/Button';

// REDUX    
import { useDispatch, useSelector } from 'react-redux';
import * as authActions from '../../store/actions/auth';

const Login = (props) => {
    const dispatch = useDispatch()
    const errorMSG = useSelector(state => state.auth.errorMSG)
    const errorType = useSelector(state => state.auth.errorType)
    const isLoading = useSelector(state => state.auth.isLoading)
    const [formValid, setFormValid] = useState(false)
    const [form, setForm] = useState({
        email: {
            text: '',
            valid: false
        },
        password: {
            text: '',
            valid: false,
            showMSG: false
        }
    })

    const textChangeHandler = (text, id) => {
        let valid;

        if (id === 'email') {
            valid = text.length > 0
        } else if (id === 'password') {
            valid = text.length > 0
        }
        setForm({
            ...form,
            [id]: {
                text,
                valid
            }
        })
    }
    useEffect(() => {
        const inputs = Object.values(form);

        // returns either true or false
        const formValid = inputs.filter(input => input.valid === false).length === 0
        setFormValid(formValid)
    }, [form])

    const submitButtonHandler = () => {
        if (formValid) {
            dispatch(authActions.login(
                form.email.text,
                form.password.text,
            ))
        }
    }

    if (errorMSG !== null && errorType === "login") {
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
                    <Text style={styles.title}>Login to continue</Text>
                    <View style={styles.inputs}>
                        <Input
                            id={'email'}
                            placeholder={"Email"}
                            changeText={textChangeHandler}
                            text={form.email.text}
                            valid={form.email.valid}
                        />

                        <Input
                            id={'password'}
                            placeholder={'Password'}
                            changeText={textChangeHandler}
                            text={form.password.text}
                            valid={form.password.valid}
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button onPress={submitButtonHandler} active={formValid} title="Login" />
                    </View>
                    <View style={{ width: '100%', alignItems: 'center', height: '20%', justifyContent: 'center' }}>
                        {isLoading && <ActivityIndicator color={Colors.secondary} />}
                    </View>
                    <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: '40%' }}>
                        <Text style={styles.text}>Dont't have an account? </Text>
                        <TouchableOpacity onPress={props.changeModal}><Text style={{ color: Colors.secondary }}>Sign up</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
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
        height: '20%',
        justifyContent: 'space-around'
    },
    buttonContainer: {
        marginTop: '20%',
        width: '100%',
        alignItems: 'center'
    },
    text: {
        fontSize: wp('4%'),
    }
})

export default Login;