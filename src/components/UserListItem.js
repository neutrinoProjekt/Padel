import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Divider, ListItem, Avatar} from 'react-native-elements';

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

export default UserListItem;

