import React, { useEffect, useState } from 'react';
import { Modal, View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ValidateTotalCheckIns from '../../utils/ValidateTotalCheckIns';
// FIREBASE
import { fs } from '../../firebase/config';
import firebase from 'firebase/app';

// REDUX
import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors';

// EXTERNAL
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// COMPONENTS
import Button from '../../components/Auth/Button';

const Popup = (props) => {
    const userData = useSelector(state => state.auth)
    const [uploaded, setUploaded] = useState(false)
    const [invalidCode, setInvalidCode] = useState(false)
    const [locationData, setLocationData] = useState({
        name: null
    })

    useEffect(() => {
        let name;
        let docId;
        let ownerId;
        let invalidCode = false;
        let lastCheckIn;
        if (props.visible && !uploaded) {
            (async () => {
                try {
                    // query location data with code
                    const query = fs.collection("locations").where("code", "==", props.code);

                    await query.get().then(function (querySnapshot) {
                        if (querySnapshot.size === 0) {
                            invalidCode = true
                            return;
                        }
                        querySnapshot.forEach((doc) => {
                            lastCheckIn = doc.data().lastCheckIn
                            name = doc.data().name
                            docId = doc.id
                            ownerId = doc.data().ownerId
                        })
                    })

                    if (invalidCode) {
                        setInvalidCode(true)
                        setUploaded(true)
                        return
                    }

                    // add checkin
                    const uploadCheckin = fs.collection("checkIns").add({
                        checkedInAt: firebase.firestore.FieldValue.serverTimestamp(),
                        code: props.code,
                        email: userData.email,
                        name: userData.name,
                        ownerId: ownerId,
                        phoneNumber: userData.phone,
                        siteName: name,
                        userId: userData.uid,
                        nameSearchValue: userData.name.toLowerCase().replace(/ /g, '')
                    })

                    // update site info
                    let payload = 1
                    if (ValidateTotalCheckIns(lastCheckIn)) {
                        payload = firebase.firestore.FieldValue.increment(1)
                    }

                    const updateSiteInfo = fs.collection("locations").doc(docId).update({
                        dailyCount: payload,
                        lastCheckIn: firebase.firestore.FieldValue.serverTimestamp()
                    })

                    // check if user is already in organizations user database -- if not add
                    const query2 = fs.collection(`organizations/${ownerId}/users`).where("userId", "==", userData.uid)

                    const addUserToOrgDocs = query2.get().then(querySnapshot => {
                        if (querySnapshot.size === 0) {
                            fs.collection(`organizations/${ownerId}/users`).doc(userData.uid).set({
                                name: userData.name,
                                email: userData.email,
                                phoneNumber: userData.phone,
                                userId: userData.uid,
                                nameSearchValue: userData.name.toLowerCase().replace(/ /g, '')
                            })
                        }
                    })

                    Promise.all([uploadCheckin, updateSiteInfo, addUserToOrgDocs]).then(() => {
                        setLocationData({
                            name: name
                        })
                        setUploaded(true)
                    })
                } catch (err) {
                    console.log(err)
                    Alert.alert(
                        "Error checking in",
                        "Please try again",
                        [
                            { text: "Okay", onPress: () => props.close() }
                        ],
                        { cancelable: false }
                    );
                }
            })();
        }
    }, [props.visible])

    const closeHandler = () => {
        setUploaded(false)
        setLocationData({ name: null })
        setInvalidCode(false)
        props.close()
    }

    return (
        <Modal visible={props.visible} transparent={true} animationType="slide">
            <View style={styles.mainContainer}>
                {uploaded
                    ? <View style={styles.infoContainer}>
                        <View style={invalidCode ? { ...styles.circle, backgroundColor: 'rgba(255, 0, 0, .2)' } : styles.circle}>
                            <Ionicons name={invalidCode ? 'md-close' : 'md-checkmark'} size={wp('25%')} color={invalidCode ? 'red' : Colors.secondary} style={{}} />
                        </View>
                        {!invalidCode ? <Text style={styles.successText}>Success!</Text> : <Text style={styles.errorText}>Error</Text>}
                        {!invalidCode ? <Text>You were checked into <Text style={{ fontWeight: 'bold' }}>{locationData.name}</Text></Text> : <Text>Code doesn't exist</Text>}
                        <Button title="Okay!" active={true} onPress={closeHandler} />
                    </View>
                    : <View style={styles.infoContainer}>
                        <ActivityIndicator color={Colors.secondary} />
                    </View>
                }

            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    infoContainer: {
        width: '85%',
        aspectRatio: .8,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    circle: {
        backgroundColor: 'rgba(46, 101, 253, .2)',
        width: '60%',
        aspectRatio: 1,
        borderRadius: 500,
        alignItems: 'center',
        justifyContent: 'center'
    },
    successText: {
        color: Colors.secondary,
        fontSize: wp('5%'),
        fontWeight: 'bold'
    },
    errorText: {
        color: 'red',
        fontSize: wp('5%'),
        fontWeight: 'bold'
    },
    indicatorContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Popup;