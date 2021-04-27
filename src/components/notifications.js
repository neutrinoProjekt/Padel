import React, {useEffect, useState } from 'react';
import {StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';
import {Avatar} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
//import {Button} from 'react-native-elements';
//import {StatusBar} from 'expo-status-bar';
import {User} from '../models/notification';
//import Collapsible from 'react-native-collapsible';


//TODO
//--fire base--
//make it possible to fetch notifications from fire base
//make it so that new notifications are added when avalible
//      make it so new notifications are fetched even if not in app
//add push notification functionality
//
//--non fire base--
//add funtionality on click
//add the standard CSS
//

// {
//     id,
//     type,
//     header,
//     description,
//     image,
//     date,
//     isNew
// }


//render a notification
const Item = ({id, header, description, image, time, isnew}) => (
    <Text>Hej</Text>
);

const NotificationContents = (item) => {  

    const [extend, setExtend] = useState(false);

    switch(item.type){
        default:
            return(
                <View style={styles.nBox} >
                    <View style={{flexDirection: 'row'}}>
                        <Image
                            style={styles.nPicture}
                            source = {{uri: item.image}}/>
                        <View style={{justifyContent: 'center'}}>
                            <Text style={styles.nHeader}>{item.header}</Text>                            
                            <Text style={styles.nDiscription}>{item.description}</Text>
                        </View>
                    </View>
                    <View style={{justifyContent: 'center'}}>
                        <Text style={styles.nTime}>{item.time}</Text>
                    </View>
                </View>
            ); 

    }    
    
};

//triggerd when an notification is pressed
//TODO
//implement the functionality on press
//this should send the user to the source of the notification, so this may have to be implemented first
const notificationSelected = (id) => {
    return (
        alert(id)
    );
};

// temp data
//TODO
//remove once data can be fetched from fire base
const NOTIFICATIONS = [
    {
        id: '1',
        header: 'First Notification',
        description: 'this is the first item',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Crafoord_Prize_D81_9141_%2842282165922%29_%28cropped%29.jpg/800px-Crafoord_Prize_D81_9141_%2842282165922%29_%28cropped%29.jpg',
        time: '2014-02-02-14.44',
        isnew: true,
    },
    {
        id: '2',
        header: 'Second Notification',
        description: 'this is the second item',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/EVER_GIVEN_%2849643352087%29.jpg/1920px-EVER_GIVEN_%2849643352087%29.jpg',
        time: '2014-02-02-14.44',
        isnew: false,
    },
    {
        id: '3',
        header: 'Third Notification',
        description: 'this is the third item',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Queen_Elizabeth_II_March_2015.jpg/800px-Queen_Elizabeth_II_March_2015.jpg',
        time: '2014-02-02-14.44',
        isnew: false,
    },
];

//collect data from NOTIFICATION obdject to send to Item()
const RenderNotification = ({item}) => {

    //const [extend, setExtend] = useState(false);

    /*
    return(
        <TouchableHighlight onPress={() => notificationSelected(item.id)} >
            <View style={{borderRightWidth: 8, borderColor: item.isnew ? '#00CEB4':'#f7f7f7',}}>
                <View style={styles.nBox} >
                    <View style={{flexDirection: 'row'}}>
                        <Image
                            style={styles.nPicture}
                            source = {{uri: item.image}}/>
                        <View style={{justifyContent: 'center'}}>
                            <Text style={styles.nHeader}>{item.header}</Text>                            
                            <Text style={styles.nDiscription}>{item.description}</Text>
                        </View>
                    </View>
                    <View style={{justifyContent: 'center'}}>
                        <Text style={styles.nTime}>{item.time}</Text>
                    </View>
                </View>
                <Collapsible collapsed={true} style={{borderWidth: 4}}>
                    <Text>Hej</Text>
                </Collapsible>
            </View>
        </TouchableHighlight>
    );
    */

    const [extend, setExtend] = useState('');

   return(
    <TouchableHighlight onPress={() =>alert('hej')}>
        <Text>Hej</Text>
    </TouchableHighlight>
   );
};


const Notifications = () => {
    //TODO
    //get data notifications from fire base and save in NOTIFICATIONS
    return (
        //
        <View>
            
            <FlatList
                data={NOTIFICATIONS}
                renderItem={RenderNotification}
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
        height: 60,
        width: 60,
        borderRadius: 30,
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