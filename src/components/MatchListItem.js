import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ListItem, Divider, Avatar, Text} from 'react-native-elements';
import {Ionicons} from '@expo/vector-icons';

const MatchListItem = ({owner, participants}) => {
    return (
        <View>
            <ListItem containerStyle={styles.listItemOne}>
                <Avatar
                    size={50}
                    rounded
                    source={{
                        uri:
                        "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
                    }}
                />
                <ListItem.Content>
                    <ListItem.Title
                        style={styles.title}
                        numberOfLines={1}
                        ellipsizeMode='tail'
                    >
                        Created By: {owner.name}
                    </ListItem.Title>
                    <ListItem.Subtitle style={styles.subTitle1}>
                        0735623578
                    </ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.subTitle2}>
                        Ranking: 1438
                    </ListItem.Subtitle>
                </ListItem.Content>
                <TouchableOpacity>
                    <Ionicons
                        size={10}
                        name='ellipsis-horizontal'
                        color='#707070'
                        padding={2}
                    />
                </TouchableOpacity>
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
                            2021-06-11, 17:00-20:00
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
                            Södertälje Padelhall, Stockholm
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
                                Ranking: 1048
                            </ListItem.Subtitle>
                            <ListItem.Subtitle style={styles.ranking}>
                                Ranking: 2034
                            </ListItem.Subtitle>
                            <ListItem.Subtitle style={styles.ranking}>
                                Ranking: 1567
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
