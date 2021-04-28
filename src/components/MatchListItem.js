import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ListItem} from 'react-native-elements';

const MatchListItem = ({owner, participants}) => {
    return (
        <View>
            <ListItem topDivider>
                <ListItem.Content style={styles.listItemOne}>
                    <ListItem.Title style={{fontWeight: "800"}}>
                        Match Created By: {owner.name}
                        Participants are: {participants}
                    </ListItem.Title>
                </ListItem.Content>
            </ListItem>
            <ListItem topDivider style={styles.listItemTwo}>
                <ListItem.Content>
                    <ListItem.Title style={{fontWeight: "800"}}>
                        Match Created By: {owner.name}
                    </ListItem.Title>
                </ListItem.Content>
            </ListItem>
        </View>
    );
};

export default MatchListItem;

const styles = StyleSheet.create({
    listItemOne: {
        flex: 1,
        height: 50,
        backgroundColor: '#F7F7F7',
    },
    listItemTwo: {
        flex: 1,
        height: 100,
    },
});
