/* eslint-disable max-len */
import React, {useState} from 'react';
import {FlatList, Text, SafeAreaView, StyleSheet, TouchableOpacity, TouchableHighlight, View}
    from 'react-native';
import {ListItem, Divider, Avatar} from 'react-native-elements';
import {Ionicons} from '@expo/vector-icons';


// temporary data until fetching from firebase
const DATA = [
    {
        id: 'PRT1',
        TourName: 'Tournament with no name',
        TourType: 'Private Knockout Tournament',
        owner: {
            id: 'us1',
            name: 'Karl-Bertil Johansson',
            imageUri: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
        },
        participants: [],
    },
    {
        id: 'PUT1',
        TourName: 'Sunday League',
        TourType: 'Public League Tournament',
        owner: {
            id: 'us1',
            name: 'Anna-Karin Johansson',
            imageUri: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
        },
        participants: [],
    },
    {
        id: 'PUT2',
        TourName: 'Hunger Games',
        TourType: 'Public Knockout Tournament',

        owner: {
            id: 'us1',
            name: 'Britt-Marie Johansson',
            imageUri: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
        },
        participants: [],
    },
    {
        id: 'PUT3',
        TourName: 'Hunger Games',
        TourType: 'Public Knockout Tournament',

        owner: {
            id: 'us1',
            name: 'Britt-Marie Johansson',
            imageUri: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
        },
        participants: [],
    }, {
        id: 'PUT4',
        TourName: 'Hunger Games',
        TourType: 'Public Knockout Tournament',

        owner: {
            id: 'us1',
            name: 'Britt-Marie Johansson',
            imageUri: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
        },
        participants: [],
    }, {
        id: 'PUT5',
        TourName: 'Hunger Games',
        TourType: 'Public Knockout Tournament',

        owner: {
            id: 'us1',
            name: 'Britt-Marie Johansson',
            imageUri: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
        },
        participants: [],
    }, {
        id: 'PUT6',
        TourName: 'Hunger Games',
        TourType: 'Public Knockout Tournament',

        owner: {
            id: 'us1',
            name: 'Britt-Marie Johansson',
            imageUri: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
        },
        participants: [],
    },
];


const TournamentItem = ({item}) => {
    const [isExpanded, setExpanded] = useState(false);

    return (
        <View>
            <TouchableHighlight onPress={() => {
                setExpanded(!isExpanded);
            }} >
                <ListItem containerStyle={styles.listItemOne}>
                    <Avatar
                        size={50}
                        rounded
                        source={{
                            uri:
                        'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
                        }}
                    />
                    <ListItem.Content>
                        <ListItem.Title
                            style={styles.title}
                            numberOfLines={1}
                            ellipsizeMode='tail'
                        >
                            {item.TourName}
                        </ListItem.Title>
                        <ListItem.Subtitle style={styles.subTitle1}>
                            {item.TourType}
                        </ListItem.Subtitle>
                        <ListItem.Subtitle style={styles.subTitle2}>
                        Extra info if needed
                        </ListItem.Subtitle>
                    </ListItem.Content>
                    <TouchableOpacity onPress={{}}>
                        <Ionicons
                            size={20}
                            name='ellipsis-horizontal'
                            color='#707070'
                            padding={2}
                        />
                    </TouchableOpacity>
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
                                You, Jonas, Silvia and 10 others
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

                                </View>
                                <View style={styles.columnContainer}>
                                    <ListItem.Subtitle style={styles.ranking}>
                                    Ranking: 1048
                                    </ListItem.Subtitle>
                                    <ListItem.Subtitle style={styles.ranking}>
                                    Ranking: 2034
                                    </ListItem.Subtitle>

                                </View>
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


const TournamentsList = ({navigation}) => {
    const addTournament = () => {
        navigation.navigate('AddTournament');
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={({item}) => (
                    <TournamentItem
                        item={item}
                    />
                )}
                keyExtractor={(item) => item.id}
            />
            <View style={styles.actionButtonContainer}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => addTournament()} >
                    <Ionicons name='add-outline' size={32} color={'#00CEB4'}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default TournamentsList;


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
