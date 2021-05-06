import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ListItem, Divider, Avatar} from 'react-native-elements';
import {Ionicons} from '@expo/vector-icons';
import OverlayMenu from '../components/OverlayMenu';


const MatchListItem = ({owner, participants, navigation, matchData}) => {
    const image = owner.photoURL === null ?
        {uri: 'https://images.interactives.dk/einstein_shutterstock-qbUmtZmY5FII0w3giBzzOw.jpg?auto=compress&ch=Width%2CDPR&dpr=2.63&h=480&ixjsv=2.2.4&q=38&rect=33%2C0%2C563%2C390'} :
        {uri: match.owner.photoURL};

    const [isOpen, setOpen] = useState(false);
    const closeMenu =() =>{
        setOpen(false);
    };

    return (
        <View>
            <ListItem containerStyle={styles.listItemOne}>
                <Avatar
                    size={50}
                    rounded
                    source={{
                        uri: image.uri,
                    }}
                />
                <ListItem.Content>
                    <ListItem.Title
                        style={[styles.title, {marginTop: 10}]}
                        numberOfLines={1}
                        ellipsizeMode='tail'
                    >
                        Created By:
                    </ListItem.Title>
                    <ListItem.Subtitle style={styles.subTitle1}>
                        {owner.fullname}
                    </ListItem.Subtitle>
                    <ListItem.Subtitle style={[styles.subTitle2, {paddingTop: 5}]}>
                        {owner.rating+'\n'+matchData.mode}
                    </ListItem.Subtitle>
                </ListItem.Content>
                <TouchableOpacity onPress={() => setOpen(true)}>
                    <Ionicons
                        size={14}
                        name='ellipsis-horizontal'
                        color='#707070'
                        padding={2}
                    />

                </TouchableOpacity>
                <OverlayMenu
                    close ={closeMenu}
                    open = {isOpen}
                    text1 = {'Forfeit Match'}
                    text2 = {'More Details'}
                    onPress2={() => navigation.navigate('MatchDetailsScreen', matchData)}
                />
            </ListItem>
            <Divider/>
            <ListItem containerStyle={styles.listItemTwo}>
                <ListItem.Content>
                    <View style={styles.rowContainer}>
                        <Ionicons
                            size={15}
                            name='time-outline'
                            color='#707070'
                        />
                        <ListItem.Subtitle style={styles.subTitle1}>
                            {matchData.date}
                        </ListItem.Subtitle>
                    </View>
                    <View style={styles.rowContainer}>
                        <View marginLeft={-1}>
                            <Ionicons
                                size={14}
                                name='location-outline'
                                color='#707070'
                            />
                        </View>
                        <ListItem.Subtitle style={styles.subTitle1}>
                            {matchData.court + ', ' + matchData.city}
                        </ListItem.Subtitle>
                    </View>
                    <ListItem.Subtitle style={styles.subTitle3}>
                        Players attending so far:
                    </ListItem.Subtitle>
                    <View style={styles.rowContainer}>
                        <View style={styles.columnContainer}>
                            <ListItem.Subtitle style={styles.name}>
                                Johan Petersson
                            </ListItem.Subtitle>
                            <ListItem.Subtitle style={styles.name}>
                                Johan Persson
                            </ListItem.Subtitle>
                            <ListItem.Subtitle style={styles.name}>
                                Johan Persson
                            </ListItem.Subtitle>
                        </View>
                        <View style={styles.columnContainer}>
                            <ListItem.Subtitle style={styles.ranking}>
                                Rating: 1048
                            </ListItem.Subtitle>
                            <ListItem.Subtitle style={styles.ranking}>
                                Rating: 2034
                            </ListItem.Subtitle>
                            <ListItem.Subtitle style={styles.ranking}>
                                Rating: 1567
                            </ListItem.Subtitle>
                        </View>
                    </View>
                </ListItem.Content>
            </ListItem>
            <Divider/>
        </View>
    );
};

export default MatchListItem;

const styles = StyleSheet.create({
    columnContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
        marginBottom: 4,
    },
    listItemOne: {
        flex: 1,
        height: 70,
        backgroundColor: '#F7F7F7',
    },
    listItemTwo: {
        flex: 1,
        height: 175,
    },
    title: {
        paddingTop: 10,
        paddingLeft: 2,
        color: '#707070',
        fontWeight: '800',
        fontSize: 12,
    },
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
    subTitle3: {
        paddingTop: 5,
        paddingBottom: 5,
        color: '#707070',
        fontWeight: '600',
        fontSize: 12,
    },
    name: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 20,
        color: '#707070',
        fontWeight: '700',
        fontSize: 10,
    },
    ranking: {
        paddingTop: 5,
        paddingBottom: 5,
        color: '#00CEB4',
        fontWeight: '700',
        fontSize: 10,
    },
});
