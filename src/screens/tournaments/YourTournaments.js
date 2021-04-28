import React, {useState} from 'react';
import {FlatList, Text, SafeAreaView, ScrollView, StyleSheet, TouchableHighlight, View}
    from 'react-native';
import {createMaterialTopTabNavigator}
    from '@react-navigation/material-top-tabs';
//import { FlatList } from 'react-native-gesture-handler';
import {ListItem} from 'react-native-elements';


//temporary data until fetching from firebase
const DATA = [
    {
        id: 'ma1',
        owner: {
            id: 'us1',
            name: 'Karl-Bertil Johansson',
            imageUri: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
        },
        participants: [],
    },
    {
        id: 'ma2',
        owner: {
            id: 'us1',
            name: 'Anna-Karin Johansson',
            imageUri: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
        },
        participants: [],
    },
    {
        id: 'ma3',
        owner: {
            id: 'us1',
            name: 'Britt-Marie Johansson',
            imageUri: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
        },
        participants: [],
    },
];

//const TopNavigator = createMaterialTopTabNavigator();


const TournamentItem = ({item , onPress}) => {

    const [extend, setExtend] = useState('');

    return (
        <TouchableHighlight onPress={() => {setExtend(!extend)}} >      
        <View>
            <ListItem topDivider>
                <ListItem.Content style={styles.listItemOne}>
                    <ListItem.Title style={{fontWeight: "800"}}>
                        Match Created By: {item.owner.name}
                        Participants are: {item.participants}
                    </ListItem.Title>
                </ListItem.Content>
            </ListItem>
            <ListItem topDivider style={styles.listItemTwo}>
                <ListItem.Content>
                    <ListItem.Title style={{fontWeight: "800"}}>
                        Match Created By: {item.owner.name}
                    </ListItem.Title>
                </ListItem.Content>
            </ListItem>
        </View>
        </TouchableHighlight>
    );
};


const TournamentsList = () => {
    return (
        <SafeAreaView style={styles.container}>
            <FlatList                
            data={DATA}
            renderItem={({ item }) => (
                <TournamentItem 
                  item={item}
                />
              )}
            keyExtractor={item => item.id}           
            />
            <Text style={styles.nEnd}>No more tournaments to show</Text>
        </SafeAreaView>
    );
};

export default TournamentsList;





const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'white',
    },

    listItemOne: {
        flex: 1,
        height: 50,
        backgroundColor: '#F7F7F7',
    },
    listItemTwo: {
        flex: 1,
        height: 100,
    },

    nEnd: {
        color: '#707070',
        textAlign: 'center',
        margin: 50,
    },

});
