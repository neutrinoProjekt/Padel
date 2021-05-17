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
import UserListItem from '../../components/UserListItem';

const SubHeader1 = ({text}) => (
    <Text style={styles2.subheader1}>
        {text}
    </Text>
);

const MatchDetailsScreen = ({route, navigation}) => {
    const {currentUser} = useAuth();

    const {owner, participants, location, date, id, result, user_edit, mode} = route.params;
    return (
        <View>
            <ScrollView style={styles2.scrollContainer}>
                <View style={{paddingTop: 20, width: 305, flexDirection: 'column', height: 140, alignContent: 'center', justifyContent: 'space-around'}}>
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

                    <View style={styles2.rowContainer}>
                        <View marginLeft={-1}>
                            <EvilIcons 
                            name="check" 
                            size={20} 
                            color="black" />
                        </View>
                        <Text style={styles2.subheader1}>
                            {result}
                        </Text>
                    </View>
                </View>
                <Text style={styles2.formTitle}> Players </Text>
                {
                    participants.map((participant) =>
                        <UserListItem participant={participant}/>
                    )
                }
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
