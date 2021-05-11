/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useAuth} from '../../contexts/auth';
import {getUser} from '../../models/User';
import {
    subscribeNotifications,
    createNotification,
    pressNotification,
    deletNotification,
} from '../../models/Notification';
import {joinMatch, createMatch} from '../../models/Match';
//import registerForPushNotifications from '../../models/PushNotifications';


// todo
// implementera notis för match join
// implementera notis för tournament join

// refactora

// renders base notification section of the list, same for all types
const Notifications = () => {
    const {currentUser} = useAuth();
    const [notificationData, setNotificationData] = useState();
    const [userobject, setUserobject] = useState({});

    const updateUserobject = async () => {
        const user = await getUser(currentUser.uid);
        setUserobject(user);
    };

    useEffect(()=> {
        updateUserobject();
    }, []);

    useEffect(() => {
        const unsubscribe = subscribeNotifications(currentUser.uid, setNotificationData);
        return () => unsubscribe();
    }, []);

    const NotificationView = (inData) => {
        const item = inData.item;
        const [extend, setExtend] = useState('');
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
                                </View>
                            </View>
                            <View style={{margin: 10, width: '10%', minWidth: 60}}>
                                <Text style={{color: '#bfbfbf'}}>{(fixedDate.toDateString())}</Text>
                            </View>
                        </View>
                        <View style={{width: 8, backgroundColor: item.isnew ? '#00CEB4':'#f7f7f7'}}></View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    };

    // renders the detaild view shown when the notification is pressed
    const NotificationDetails = (props) => {
        const item = props.item;

        // when notification is expanded
        if (props.enabled) {
            pressNotification(item.id);
            switch (item.type) {
            case 'text':
                return (
                    <View>
                        <Text style={styles.nText}>{item.detailText}</Text>
                        <View style = {{marginTop: 20}}>
                            <TouchableHighlight onPress={() => {
                                deletNotification(props.item.id);
                            }}>
                                <Text style={{width: '100%', textAlign: 'center', padding: 10, backgroundColor: '#F67273', borderRadius: 5, color: '#707070', fontWeight: 'bold'}}>Remove</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                );
            case 'matchJoinRequest':
                return (
                    joinRequest({item: item, function: (()=>(joinMatch(item.detailData.id, currentUser.uid)))}) // owner = receiver of the notification
                );
            case 'tournamentJoinRequest':
                return (
                    joinRequest({item: item, function: (()=>(console.log('shoooo')))})
                );

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

    //renders an accept/ deny button and related code
    const joinRequest = (props) => {
        return (
            <View>
                <Text style={styles.nText}>{props.item.detailText}</Text>
                <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-around', margin: 20}}>
                    <TouchableHighlight onPress={() => {
                        deletNotification(props.item.id);
                    }} >
                        <Text style={{color: '#f67273', fontWeight: 'bold'}}>Deny</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => {
                        props.function(); // add person to the match
                        deletNotification(props.item.id); // remove notification when added
                    }} >
                        <Text style={{color: '#00CEB4', fontWeight: 'bold'}}>Accept</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    };

    //renders each notification
    const RenderNotification = ({item}) => {
        return (
            <NotificationView item={item}/>
        );
    };

    //main render function
    return (
        <View>
            <FlatList
                data={notificationData}
                renderItem={RenderNotification}
                keyExtractor={(item) => item.id}
            />
            <Text style={styles.nEnd}>No more notifications</Text>
        </View>
    );
};

export default Notifications;

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
        backgroundColor: '#00CEB4',
    },
    nEnd: {
        color: '#707070',
        textAlign: 'center',
        margin: 50,
    },
});
