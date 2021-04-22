import React, {useEffect, useState } from 'react';
import {StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';
import {Avatar} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';
//import {Button} from 'react-native-elements';
//import {StatusBar} from 'expo-status-bar';

// <Image style = {styles.nImage} source={{uri: 'https://cdn.discordapp.com/attachments/833975086561886210/834355702821683230/unknown.png'}}/>
const Item = ({id, header, description, image, time}) => (
    <TouchableHighlight onPress={notificationSelected}>
        <View style={styles.nBox}>
            <View style={{flexDirection: 'row'}}>
                <Image
                    style={styles.nPicture}
                    source = {{uri: image}}/>
                <View style={{justifyContent: 'center'}}>
                    <Text style={styles.nHeader}>{header}</Text>
                    <Text style={styles.nDiscription}>{description}</Text>
                </View>
            </View>
            <View style={{justifyContent: 'center'}}>
                <Text style={styles.nTime}>{time}</Text>
            </View>
        </View>
    </TouchableHighlight>

);

const notificationSelected = () => {
    return (
        alert(id)
    );
};

// temp data
const NOTIFICATIONS = [
    {
        id: '1',
        header: 'First Notification',
        description: 'this is the first item',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Crafoord_Prize_D81_9141_%2842282165922%29_%28cropped%29.jpg/800px-Crafoord_Prize_D81_9141_%2842282165922%29_%28cropped%29.jpg',
        time: '2014-02-02-14.44',
    },
    {
        id: '2',
        header: 'Second Notification',
        description: 'this is the second item',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/EVER_GIVEN_%2849643352087%29.jpg/1920px-EVER_GIVEN_%2849643352087%29.jpg',
        time: '2014-02-02-14.44',
    },
    {
        id: '3',
        header: 'Third Notification',
        description: 'this is the third item',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Queen_Elizabeth_II_March_2015.jpg/800px-Queen_Elizabeth_II_March_2015.jpg',
        time: '2014-02-02-14.44',
    },

];

const Notifications = () => {
    const renderItem = ({item}) => (
        <Item
            id={item.id}
            header={item.header}
            description={item.description}
            image={item.image}
            time={item.time}
        />
    );

    return (
        <View>
            <FlatList
                data={NOTIFICATIONS}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
            <Text style={styles.nEnd}>No more notifications</Text>
        </View>
    );
};

export default Notifications;

// TODO make standard styles
const styles = StyleSheet.create({
    nBox: {
        backgroundColor: '#f7f7f7',
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        borderColor: '#BFBFBF',
        minWidth: 320,
    },
    text: {
        color: '#000',
        //width: 200,
        textAlign: 'center',
        height: 150,
    },
    nHeader: {
        fontSize: 20,
        color: '#707070',
    },
    nPicture: {
        height: 80,
        width: 80,
        borderRadius: 40,
        margin: 10,
    },
    nDiscription: {
        color: '#707070',
        height: 40,
        overflow: 'hidden',
    },
    nTime: {
        color: '#afafaf',
        textAlign: 'left',
    },
    nEnd: {
        color: '#707070',
        textAlign: 'center',
        margin: 50,
    },
});