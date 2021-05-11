import React from 'react';
import {
    StyleSheet, View, Modal,
    TouchableOpacity, SafeAreaView, Text, ScrollView,
} from 'react-native';
import {Divider, ListItem, Avatar} from 'react-native-elements';
import MainButton from './../../components/MainButton';
import {joinMatch} from '../../models/Match';
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
                        {participant.displayname || '-'}
                    </ListItem.Subtitle>
                    <ListItem.Subtitle style={styles3.subTitle2}>
                        Rating: {participant.rating || 'N/A'}
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
    const {currentUser} = useAuth();

    const {owner, participants, location, date, id, result, user_edit, mode} = route.params;
    return (
        <View>
            <ScrollView style={styles2.scrollContainer}>
                <View style={{paddingTop: 20, width: 305, flexDirection: 'column', height: 100, alignContent: 'center', justifyContent: 'space-around'}}>
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
                <Text style={styles2.formTitle}> Players </Text>
                <UserListItem participant={owner}/>
                <View style={{alignSelf: 'center', marginTop: 380}}>
                    <MainButton
                        title='Finish Match'
                        onPress={async () => navigation.navigate('FinishMatchScreen', {id, result, user_edit, mode, participants})}
                    />
                </View>
                <View style={{alignSelf: 'center', paddingTop: 10}}>
                    <MainButton
                        title='Join Match'
                        onPress={async () => {
                            await joinMatch(id, currentUser.uid);
                            navigation.goBack();
                        }}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

export default MatchDetailsScreen;

const styles2 = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    scrollContainer: {
        backgroundColor: 'white',
        height: '100%',
    },
    rowContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: 250,
        paddingLeft: 20,
    },
    header: {
        backgroundColor: 'white',
        height: 70,
        fontWeight: '800',
    },
    actionButtonContainer: {
        flex: 1,
        alignItems: 'center',
        position: 'absolute',
        bottom: 70,
    },
    formTitle: {
        paddingBottom: 10,
        fontWeight: 'bold',
        color: '#707070',
        fontSize: 20,
        alignSelf: 'center',
        paddingTop: 20,
    },
    subheader1: {
        paddingLeft: 10,
        color: '#707070',
        fontSize: 16,
        flex: 1,
    },

});
