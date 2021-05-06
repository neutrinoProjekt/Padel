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
import {joinMatch, createMatch} from  '../../models/Match';


// todo
// implementera notis för match join
// implementera notis för tournament join

// refactora

// renders base notification, same for all types
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

    // this shoud be added to depending on the type
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
    // notification that allows user to accep or deny match/tournament
    const joinRequest = (props) => {
        return (
            <View>
                <Text style={styles.nText}>{props.item.detailText}</Text>
                <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-around', margin: 20}}>
                    <TouchableHighlight onPress={() => {
                        deletNotification(props.item.id);
                        //acceptedOrDenied(props.item, 'denied');
                    }} >
                        <Text style={{color: '#f67273', fontWeight: 'bold'}}>Deny</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => {
                        //uppdateNotification({description: 'Accepted!', detailText: 'You accepted the request'}, item.id);
                        props.function(); // add person to the match
                        deletNotification(props.item.id); // remove notification when added
                        //acceptedOrDenied(props.item, 'accepted');
                    }} >
                        <Text style={{color: '#00CEB4', fontWeight: 'bold'}}>Accept</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    };

    // notification that informs sender if the request was accepted or denied
    const acceptedOrDenied = (props, reply) => {
        // should be updated depending on match/tournament
        let type = '';
        switch (props.type) {
        case 'matchJoinRequest':
            type='Match';
        case 'tournamentJoinRequest':
            type='Tournament';
        }

        const [ownerId, setOwnerId] = useState({});


        // get the owner  of the specific tournament
        const updateReciver = async () => {
            const tournamentinfo = await getMatches(props.detailData.id);
            console.log(tournamentinfo);
            const ownerId= tournamentinfo.owner.split('/users/')[1];
            setOwnerId(ownerId);
        };
    
        useEffect(()=> {
            updateReciver();
        }, []);
    
        console.log(ownerId);

        createNotification({
            owner: ownerId, // the receiver
            header: 'Request to join ' + type + ' was ' + reply, //tournament/match EXAMPLE: Request to join match was denied
            description: 'Your request to join the ' + type + ' was ' + reply + ' by '+ currentUser.displayName,
            detailText: null,
            type: 'text',
            typeDetails: {
            },
        });
    };

// collect data from item obdject to send to NotificationView




    const RenderNotification = ({item}) => {
        return (
            <NotificationView item={item} currentUser={userobject} />
        );
    };

    return (
        <View>
            <TouchableHighlight onPress={() => createNotification({
                owner: 'BI4mzPVktAONN9NbQ6yZavXOrvq2', //anna
                header: 'Join this! for real!!',
                description: 'join augusts match',
                detailText: 'lorem ipsum hehj hej max har goda pommes',
                type: 'matchJoinRequest',
                detailData: {
                    id: 'vezBm0WiJAfTgqugRIlK', //match id
                    owner: 'n6OzczPH8tY99YAW67i9hLmKvhx2', // August
                },
            })
            }
            >
                <Text>Press to add notification</Text>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => createMatch({
                owner: currentUser.uid,
                city: 'Stockholm',
                court: 'Ta inte bort, behövs för notifikations test!!!!!',
                from: '23/06/2021',
                to: '22/06/2022',
                mode: 'look above!',
            })
            }
            >
                <Text>Press to add match</Text>
            </TouchableHighlight>
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
