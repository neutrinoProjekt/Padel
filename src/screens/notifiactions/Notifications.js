import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useAuth} from '../../contexts/auth';
import {subscribeNotifications, createNotification} from '../../models/Notification';

// renders base notification, same for all types
const NotificationView = (inData) => {
    const item = inData.item;
    const [extend, setExtend] = useState('');

    return (
        <TouchableHighlight onPress={() => {
            setExtend(!extend);
        }} >
            <View style={{borderRightWidth: 8, borderColor: item.isnew ? '#00CEB4':'#f7f7f7'}}>
                <View style={styles.nBox} >
                    <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-evenly'}}>
                        <View style={{width: 90}}>
                            <Image
                                style={styles.nPicture}
                                source = {{uri: item.image}}/>
                        </View>
                        <View style={{width: '60%'}}>
                            <Text style={styles.nHeader}>{item.header}</Text>
                            <View style={{marginTop: 10}}>
                                <NotificationDetails enabled={extend} item={item}/>
                            </View>
                        </View>
                        <View style={{margin: 10, width: '10%', minWidth: 60}}>
                            <Text style={styles.nText}>{item.date}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    );
};

// this shoud be added to depending on the type
const NotificationDetails = (props) => {
    const item = props.item;

    // when notification is expanded
    if (props.enabled) {
        console.log(item.type);
        switch (item.type) {
        case 'text':
            return(
                <Text style={styles.nText}>{item.detailText}</Text>
            );
            // to be added to when the relevant page has been made
        case 'matchJoinRequest':
            return(
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

//måste importera funktionen som låter folk godkänna eller avvisa folk och lägga den istället för console.log
const matchJoinRequest = (item) => {
    console.log(item);
    return(
        <View>
            <Text style={styles.nText}>{item.detailText}</Text>
            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-around', margin:20}}>
                <TouchableHighlight onPress={() => {console.log('denied!')}} >
                    <Text style={{color:'#707070', fontWeight:'bold', fontSize:'1.5rem'}}>Deny</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => {console.log('Aproved!')}} >
                    <Text style={{color:'#707070', fontWeight:'bold', fontSize:'1.5rem'}}>Accept</Text>
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
        <View>
            <TouchableHighlight onPress={() => createNotification({
                owner: currentUser.uid,
                header: 'Gotta request to join',
                description: 'A request to join! now?',
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Queen_Elizabeth_II_March_2015.jpg/800px-Queen_Elizabeth_II_March_2015.jpg',
                date: '2014-02-02-14.44',
                isnew: false,
                detailText: 'urban would like to join your match!',
                type: 'matchJoinRequest',
                typeDetails:{
                    joinerId:'temptemp'
                }
            })}>
                <Text>Press to add notidication</Text>
            </TouchableHighlight>
            <FlatList
                data={notificationData}
                renderItem={RenderNotification}
                keyExtractor={item => item.id}
            />
            <Text style={styles.nEnd}>No more notifications</Text>
        </View>
    );
};

export default Notifications;

// TODO make standard styles
const styles = StyleSheet.create({
    nBox: {
        backgroundColor: '#f7f7f7',
        padding: '1%',
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
