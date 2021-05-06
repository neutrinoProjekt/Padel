/* eslint-disable max-len */
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {ListItem, Divider, Avatar} from 'react-native-elements';
import {TouchableHighlight, TouchableOpacity} from 'react-native-gesture-handler';
import {Ionicons} from '@expo/vector-icons';
import OverlayMenu from './OverlayMenu';

/**
 * @param {*} props {t1, t2, t3, participants, date, location}
 * t1 - Main title (Dark grey)
 * t2 - Subtitle (Grey)
 * t3 - Subtitle (Main color)
 * participants - list of participants
 * date - date (in expandable view)
 * location - location (in expandable view)
 * @return {*} An expandable item
 */

const ExpandableItem = (props) => {
    const [isExpanded, setExpanded] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const image = props.imgSource === null ?
        {uri: 'https://images.interactives.dk/einstein_shutterstock-qbUmtZmY5FII0w3giBzzOw.jpg?auto=compress&ch=Width%2CDPR&dpr=2.63&h=480&ixjsv=2.2.4&q=38&rect=33%2C0%2C563%2C390'} :
        {uri: props.imgSource};

    const closeMenu =() => {
        setOpen(false);
    };

    return (
        <View>
            <TouchableHighlight onPress={() => {
                setExpanded(!isExpanded);
            }} >
                <ListItem containerStyle={styles.listItemOne}>
                    <Avatar
                        size={50}
                        rounded
                        source={image}
                    />
                    <ListItem.Content>
                        <ListItem.Title
                            style={[styles.title, {paddingTop: 25}]}
                            numberOfLines={1}
                            ellipsizeMode='tail'
                        >
                            {props.t1}
                        </ListItem.Title>
                        <ListItem.Subtitle style={styles.subTitle1}>
                            {props.t2}
                        </ListItem.Subtitle>
                        <ListItem.Subtitle style={styles.subTitle2}>
                            {props.t3}
                        </ListItem.Subtitle>
                    </ListItem.Content>
                    <TouchableOpacity onPress={() => setOpen(true)}>
                        <Ionicons
                            size={20}
                            name='ellipsis-horizontal'
                            color='#707070'
                            padding={2}
                        />
                    </TouchableOpacity>
                    <OverlayMenu
                        close ={closeMenu}
                        open = {isOpen}
                        text1 = {'Forfeit Tournament'}
                        text2 = {'More Details'}
                    />
                </ListItem>
            </TouchableHighlight>
            <ListItem containerStyle={styles.listItemTwo}>
                <ListItem.Content>
                    <View style={styles.rowContainer}>
                        <Ionicons
                            size={15}
                            name='people'
                            color='#00CEB4'
                        />
                        <ListItem.Subtitle style={styles.subTitle1}>
                            {props.participants.map(p => p.fullname + ' ')}
                        </ListItem.Subtitle>
                    </View>
                </ListItem.Content>
            </ListItem>
            { isExpanded ?
                <View>
                    <ListItem containerStyle={styles.listItemTwo}>
                        <ListItem.Content>
                            <View style={styles.rowContainer}>
                                <Ionicons
                                    size={15}
                                    name='time-outline'
                                    color='#707070'
                                />
                                <ListItem.Subtitle style={styles.subTitle1}>
                                    {props.date}
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
                                    {props.location}
                                </ListItem.Subtitle>
                            </View>
                            <ListItem.Subtitle style={styles.subTitle3}>
                            Players attending so far:
                            </ListItem.Subtitle>
                            <View style={styles.columnContainer}>
                                {props.participants.map(p => (
                                    <View style={styles.rowContainer} key={p.id}>
                                        <ListItem.Subtitle style={styles.name}>
                                            {p.fullname}
                                        </ListItem.Subtitle>
                                        <ListItem.Subtitle style={styles.ranking}>
                                            {p.rating}
                                        </ListItem.Subtitle>
                                    </View>
                                ))}
                            </View>
                        </ListItem.Content>
                    </ListItem>
                </View> :
                null
            }
            <Divider/>
        </View>
    );
};

export default ExpandableItem;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'white',
    },
    nEnd: {
        color: '#707070',
        textAlign: 'center',
        margin: 50,
    },
    columnContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    listItemOne: {
        flex: 1,
        height: 70,
        backgroundColor: '#F7F7F7',
    },
    listItemTwo: {
        flex: 1,
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
    actionButtonContainer: {
        flex: 1,
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    actionButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 100,
        shadowRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: {height: 10},
    },
});
