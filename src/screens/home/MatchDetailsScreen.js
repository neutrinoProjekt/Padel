import React, {useState} from 'react';
import {
    StyleSheet, View, Modal, TextInput,
    TouchableOpacity, SafeAreaView, Text, Pressable,
} from 'react-native';
import {Divider, Header, ListItem, Avatar, Image} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import MainButton from './../../components/MainButton';
import {styles} from './../styling/Styles';
import createMatch from '../../models/Match';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useAuth} from '../../contexts/auth';
import CardHeader from '../../components/CardHeader';
import {Ionicons} from '@expo/vector-icons';


const SubHeader1 = ({text}) => (
    <Text style={styles2.subheader1}>
        {text}
    </Text>
);

const UserListItem = ({participant}) => {
    const image = participant.photoURL === null ?
        {uri: 'https://images.interactives.dk/einstein_shutterstock-qbUmtZmY5FII0w3giBzzOw.jpg?auto=compress&ch=Width%2CDPR&dpr=2.63&h=480&ixjsv=2.2.4&q=38&rect=33%2C0%2C563%2C390'} :
        {uri: participant.photoURL};

    return (
        <View>
            <Divider/>
            <ListItem containerStyle={styles3.listItemOne}>
                <Avatar
                    size={50}
                    rounded
                    source={{
                        uri: image.uri,
                    }}
                />
                <ListItem.Content>
                    <ListItem.Title
                        style={styles3.title}
                        numberOfLines={1}
                        ellipsizeMode='tail'
                    >
                        {participant.fullname}
                    </ListItem.Title>
                    <ListItem.Subtitle style={styles3.subTitle1}>
                        0735623578
                    </ListItem.Subtitle>
                    <ListItem.Subtitle style={styles3.subTitle2}>
                        Rating: 1438
                    </ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>

        </View>
    );
};

const styles3 = StyleSheet.create({
    subTitle1: {
        paddingLeft: 2,
        color: '#707070',
        fontWeight: '700',
        fontSize: 10,
    },
    subTitle2: {
        paddingBottom: 5,
        padding: 2,
        color: '#00CEB4',
        fontWeight: '700',
        fontSize: 10,
    },
    listItemOne: {
        flex: 1,
        height: 70,
        backgroundColor: '#F7F7F7',
    },
});

const MatchDetailsScreen = ({route, navigation}) => {
    const {currentUserDoc} = useAuth();

    const {owner, participants, location, date} = route.params;

    console.log('fawef');
    console.log(route.params);

    const currentDate = new Date();

    const matchData = {
        id: 'ma1',
        owner: {
            id: 'us1',
            fullname: 'Karl-Bertil Johansson',
            imageURL: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
        },
        city: 'Stockholm',
        court: 'idfk court ltd',
        from: currentDate,
        to: new Date(currentDate.getTime() + 100000),
        participants: [
            {
                id: 'us1',
                fullname: 'Karl-Bertil Johansson',
                imageURL: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
            },
            {
                id: 'us1',
                fullname: 'Anna-Karin Johansson',
                imageURL: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
            },
            {
                id: 'us1',
                fullname: 'Britt-Marie Johansson',
                imageURL: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
            },
        ],
    };

    return (
        <Modal
            presentationStyle='pageSheet'
            animationType='slide'
        >
            <SafeAreaView style={styles2.safeContainer}>
                <CardHeader
                    centerHeader='Match Details'
                    leftComponent={{
                        text: 'Cancel',
                        onPress: () => {
                            navigation.goBack();
                        },
                        style: {
                            color: '#707070',
                            fontWeight: '600',
                            fontSize: 16},
                    }}/>
                <Divider/>
                <ScrollView style={styles2.scrollContainer}>
                    <View style={{display: 'flex', width: 305, flexDirection: 'column', height: 100, alignContent: 'center', justifyContent: 'space-around'}}>
                        <View style={styles2.rowContainer}>
                            <View marginLeft={-1}>
                                <Ionicons
                                    size={22}
                                    name='location-outline'
                                    color='#707070'
                                />
                            </View>
                            <Text style={styles2.subheader1}>
                                {location}
                            </Text>
                        </View>

                        <View style={styles2.rowContainer}>
                            <View marginLeft={-1}>
                                <Ionicons
                                    size={15}
                                    name='time-outline'
                                    color='#707070'
                                />
                            </View>
                            <Text style={styles2.subheader1}>
                                {date}
                            </Text>
                        </View>
                    </View>

                    <Text>
                        Players
                    </Text>
                    <UserListItem participant={owner}/>

                </ScrollView>
                <View style={styles2.actionButtonContainer}>
                    <TouchableOpacity>
                        <MainButton
                            title='Finish Match'
                            onPress={async () => alert('press')}
                        />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </Modal>
    );
};

export default MatchDetailsScreen;

const styles2 = StyleSheet.create({
    safeContainer: {
        flex: 1,
        alignItems: 'center',
    },
    scrollContainer: {
        backgroundColor: 'white',
        height: '100%',
    },
    rowContainer: {
        display: 'flex',
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'flex-end',
        // backgroundColor: 'blue',
        width: 250,
    },
    header: {
        backgroundColor: 'white',
        height: 70,
        fontWeight: '800',
    },
    actionButtonContainer: {
        flex: 1,
        position: 'absolute',
        bottom: 70,
    },
    formTitle: {
        paddingBottom: 10,
        fontWeight: 'bold',
        color: '#707070',
        fontSize: 12,
    },
    subheader1: {
        paddingLeft: 10,
        // fontWeight: 'bold',
        color: '#707070',
        fontSize: 16,
        flex: 1,
        // backgroundColor: 'red',
    },
});
