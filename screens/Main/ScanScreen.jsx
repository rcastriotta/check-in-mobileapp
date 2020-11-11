import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Alert, TouchableOpacity, Vibration, Image } from 'react-native';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

// EXTERNAL
import { BarCodeScanner } from 'expo-barcode-scanner';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// REDUX
import { useSelector, useDispatch } from 'react-redux'

// COMPONENTS
import Signup from '../Auth/Signup';
import Login from '../Auth/Login';
import Popup from '../../components/Main/Popup';
import EnterCode from '../../components/Main/EnterCode';


const ScanScreen = ({ navigation }) => {
    const authenticated = useSelector(state => state.auth.authenticated)
    const [scanned, setScanned] = useState(false);
    const [code, setCode] = useState(null)
    const [showBackdrop, setShowBackdrop] = useState(false)
    const [modals, setModals] = useState({
        showLogin: false,
        showSignup: false,
        showEnterCode: false
    })

    useEffect(() => {
        const showBackdrop = Object.values(modals).filter((value) => value === true).length > 0 || scanned
        setShowBackdrop(showBackdrop)
    }, [modals, scanned])


    useEffect(() => {
        if (authenticated) {
            // set timeout is needed becauses alerts won't show if modal is transitioning
            setTimeout(async () => {
                const { status } = await BarCodeScanner.requestPermissionsAsync();
                if (status === 'denied') {
                    Alert.alert(
                        "Please allow camera access",
                        "Go to Settings>Privacy>Camera",
                        [
                            { text: "Okay" }
                        ],
                        { cancelable: false }
                    );
                }
            }, 1000)
        }
    }, [authenticated]);

    useEffect(() => {
        // check if authenticated
        if (!authenticated) {
            setModals({
                ...modals,
                showSignup: true
            })
        } else if (authenticated) {
            setModals({
                showEnterCode: false,
                showSignup: false,
                showLogin: false
            })
        }
    }, [authenticated])

    const handleBarCodeScanned = ({ type, data }) => {
        if (type === 'org.iso.QRCode' && authenticated) {
            setModals({
                showEnterCode: false,
                showSignup: false,
                showLogin: false
            })
            setCode(data)
            setScanned(true)
            Vibration.vibrate()
        }
    };

    const changeModal = () => {
        if (modals.showSignup) {
            setModals({
                showLogin: true,
                showSignup: false
            })
        } else {
            setModals({
                showSignup: true,
                showLogin: false
            })
        }
    }

    return (
        <SafeAreaView
            style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            <View style={{ height: '100%', width: '100%' }}>
                <Image source={require('../../assets/square.png')} style={styles.square} />
            </View>
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() => navigation.navigate('Settings')}>
                    <Ionicons name={"md-person"} size={wp('7%')} color={"white"} style={{}} />

                </TouchableOpacity>
                <TouchableOpacity style={styles.enterCode} activeOpacity={0.7} onPress={() => setModals({ ...modals, showEnterCode: true })}>
                    <Text style={styles.enterCodeText}>Enter code</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() => navigation.navigate('Recents')}>
                    <Ionicons name={"md-menu"} size={wp('7%')} color={"white"} style={{}} />

                </TouchableOpacity>
            </View>

            <Signup changeModal={changeModal} visible={modals.showSignup} />
            <Login changeModal={changeModal} visible={modals.showLogin} />
            <Popup code={code} visible={scanned} close={() => setScanned(false)} />
            <EnterCode visible={modals.showEnterCode} close={() => setModals({ ...modals, showEnterCode: false })} submitHandler={(text) => handleBarCodeScanned({ type: 'org.iso.QRCode', data: text })} />
            <View style={showBackdrop && styles.backdrop} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    square: {
        height: '40%',
        aspectRatio: 1,
        alignSelf: 'center',
        marginTop: '50%',
        opacity: 0.3
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingBottom: '10%',
        flexDirection: 'row',
        justifyContent: 'space-around'

    },
    enterCode: {
        backgroundColor: 'white',
        width: '40%',
        aspectRatio: 3,
        alignSelf: 'center',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOpacity: .5,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
    },
    enterCodeText: {
        fontWeight: 'bold',
        color: Colors.secondary
    },
    button: {
        width: '15%',
        aspectRatio: 1,
        backgroundColor: 'rgba(0, 0, 0, .3)',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    backdrop: {
        position: 'absolute',
        height: hp('100%'),
        width: wp('100%'),
        backgroundColor: 'rgba(0, 0, 0, .4)'
    }
})

export default ScanScreen;