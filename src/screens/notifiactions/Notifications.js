/* eslint-disable max-len */
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useAuth} from '../../contexts/auth';
import {subscribeNotifications, createNotification, pressNotification, deletNotification, uppdateNotification} from '../../models/Notification';
import CardHeader from '../../components/CardHeader';
import {SafeAreaView} from 'react-native-safe-area-context';

// renders base notification, same for all types
const NotificationView = (inData) => {
    const item = inData.item;
    const [extend, setExtend] = useState('');
    //console.log(item);
    const fixedDate = (new Date(item.date.seconds*1000 + item.date.nanoseconds/1000000));

    return (
        <TouchableHighlight onPress={() => {
            setExtend(!extend);
        }} >
            <View>
                <View style={styles.nBox} >
                    <View style={{flexDirection: 'row', width: '98%', justifyContent: 'space-around', padding: '1%'}}>
                        <View style={{width: 90}}>
                            <Image
                                style={styles.nPicture}
                                source = {{uri: item.image}}/>
                        </View>
                        <View style={{width: '60%'}}>
                            <Text style={styles.nHeader}>{item.header}</Text>
                            <View style={{marginTop: 10}}>
                                <NotificationDetails enabled={extend} item={item}/>
                                <DeletNotification enabled={extend} item={item}/>
                            </View>
                        </View>
                        <View style={{margin: 10, width: '10%', minWidth: 60}}>
                            <Text style={styles.nText}>{(fixedDate.toDateString())}</Text>
                        </View>
                    </View>
                    <View style={{width: 8, backgroundColor: item.isnew ? '#00CEB4':'#f7f7f7'}}></View>
                </View>
            </View>
        </TouchableHighlight>
    );
};


const DeletNotification = (props) => {
    if (props.enabled) {
        return (
            <View style = {{marginTop: 20}}>
                <TouchableHighlight onPress={() => {
                    deletNotification(props.item.id);
                }}>
                    <Text style={{width: '100%', textAlign: 'center', padding: 10, backgroundColor: '#F67273', borderRadius: 5, color: '#707070', fontWeight: 'bold'}}>Remove</Text>
                </TouchableHighlight>
            </View>
        );
    } else {
        return (
            <View></View>
        );
    }
};


// this shoud be added to depending on the type
const NotificationDetails = (props) => {
    const item = props.item;

    // when notification is expanded
    if (props.enabled) {
        pressNotification(item.id);
        switch (item.type) {
        case 'text':
            return (
                <Text style={styles.nText}>{item.detailText}</Text>
            );
            // to be added to when the relevant page has been made
        case 'matchJoinRequest':
            return (
                matchJoinRequest(item)
            );
            // to be added to when the relevant page has been made
        case 'friend request':
            // to be added to when the relevant page has been made

            // more to be added

        default:
            return (
                <View>
                    <Text style={styles.nText}>
                            If you see this an no specific details were added for this notification
                    </Text>
                </View>
            );
        }
    }

    // when notification is not expanded
    return (
        <Text style={styles.nText}>{item.description}</Text>
    );
};

// måste importera funktionen som låter folk godkänna eller avvisa folk och lägga den istället för console.log
const matchJoinRequest = (item) => {
    return (
        <View>
            <Text style={styles.nText}>{item.detailText}</Text>
            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-around', margin: 20}}>
                <TouchableHighlight onPress={() => {
                    uppdateNotification({description: 'Denied!', detailText: 'You denied the request'}, item.id);
                }} >
                    <Text style={{color: '#707070', fontWeight: 'bold', fontSize: '1.5rem'}}>Deny</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => {
                    uppdateNotification({description: 'Accepted!', detailText: 'You accepted the request'}, item.id);
                }} >
                    <Text style={{color: '#707070', fontWeight: 'bold', fontSize: '1.5rem'}}>Accept</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
};

// collect data from item obdject to send to NotificationView
const RenderNotification = ({item}) => {
    return (
        <NotificationView item={item}/>
    );
};


const Notifications = () => {
    const {currentUser} = useAuth();
    const [notificationData, setNotificationData] = useState();

    useEffect(() => {
        const unsubscribe = subscribeNotifications(currentUser.uid, setNotificationData);
        return () => unsubscribe();
    }, []);

    return (
        <SafeAreaView>
            <CardHeader
                centerHeader='Notifications'
            />
            <View>
                <TouchableHighlight onPress={() => createNotification({
                    owner: currentUser.uid,
                    header: 'Gotta request to join',
                    description: 'A request to join! now?',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Queen_Elizabeth_II_March_2015.jpg/800px-Queen_Elizabeth_II_March_2015.jpg',
                    detailText: 'urban would like to join your match!',
                    type: 'matchJoinRequest',
                    typeDetails: {
                        joinerId: 'temptemp',
                    },
                })}>
                    <Text>Press to add notidication</Text>
                </TouchableHighlight>
                <FlatList
                    data={notificationData}
                    renderItem={RenderNotification}
                    keyExtractor={(item) => item.id}
                />
                <Text style={styles.nEnd}>No more notifications</Text>
            </View>
        </SafeAreaView>
    );
};

export default Notifications;

// TODO make standard styles
const styles = StyleSheet.create({
    nBox: {
        backgroundColor: '#f7f7f7',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        borderColor: '#BFBFBF',
        minWidth: 320,
    },
    nText: {
        color: '#707070',
    },
    nHeader: {
        marginTop: 10,
        fontSize: 20,
        color: '#707070',
    },
    nPicture: {
        height: 60,
        width: 60,
        borderRadius: 30,
        margin: 10,
    },
    nEnd: {
        color: '#707070',
        textAlign: 'center',
        margin: 50,
    },
});
