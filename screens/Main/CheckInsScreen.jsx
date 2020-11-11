import React, { useEffect, useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import CheckIn from '../../models/checkIn';
import Colors from '../../constants/Colors';

// FIREBASE
import { fs } from '../../firebase/config';

// REDUX
import { useSelector } from 'react-redux'

// EXTERNAL
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import dateFormat from 'dateformat';


const CheckInsScreen = () => {
    const uid = useSelector(state => state.auth.uid)
    const [checkIns, setCheckIns] = useState([])
    const [lastVisible, setLastVisible] = useState(null)

    const getCheckIns = async () => {

        const query = fs.collection("checkIns").where("userId", "==", uid).orderBy("checkedInAt", "desc").limit(10)

        query.get().then((querySnapshot) => {
            const newCheckins = []
            setLastVisible(querySnapshot.docs[querySnapshot.size - 1])
            querySnapshot.forEach((doc) => {
                newCheckins.push(new CheckIn(
                    dateFormat(doc.data().checkedInAt.toDate().toString()),
                    doc.data().siteName,
                    doc.data().code,
                    doc.id
                ))

            })

            setCheckIns(newCheckins)
            if (querySnapshot.size < 10) {
                setLastVisible(null)
            }
        })
    }

    const getMore = async () => {
        if (lastVisible) {
            const query = fs.collection("checkIns").where("userId", "==", uid).orderBy("checkedInAt", "desc").startAfter(lastVisible).limit(10)

            query.get().then((querySnapshot) => {
                let newCheckins = checkIns;
                setLastVisible(querySnapshot.docs[querySnapshot.size - 1])
                querySnapshot.forEach((doc) => {
                    newCheckins.push(new CheckIn(
                        dateFormat(doc.data().checkedInAt.toDate().toString()),
                        doc.data().siteName,
                        doc.data().code,
                        doc.id
                    ))
                })
                setCheckIns(newCheckins)
                if (querySnapshot.size < 10) {
                    setLastVisible(null)
                }
            })
        }
    }

    useEffect(() => {
        getCheckIns()
    }, [])

    const renderCheckIn = (itemData) => {

        return (
            <View key={itemData.item.id} style={styles.checkIn}>
                <Text style={styles.name}>{itemData.item.name}</Text>
                <Text style={styles.date}>{itemData.item.checkedInAt}</Text>
            </View>
        )
    }

    return (
        <View>
            <FlatList data={checkIns} renderItem={renderCheckIn} style={{ paddingTop: '5%', height: '100%' }} contentContainerStyle={{ paddingBottom: 100 }} onEndReachedThreshold={0} onEndReached={() => getMore()} />
        </View>
    )
}

const styles = StyleSheet.create({
    checkIn: {
        width: '95%',
        aspectRatio: 6,
        backgroundColor: 'white',
        alignSelf: 'center',
        marginBottom: '5%',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '5%',
        shadowColor: Colors.secondary,
        shadowOpacity: .1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 5 },
        justifyContent: 'space-between'
    },
    name: {
        fontWeight: 'bold'
    },
    date: {
        fontSize: wp('3%'),
        color: Colors.secondary
    }
})

export default CheckInsScreen;