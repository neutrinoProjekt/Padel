import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar, Divider} from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

const UserItem = (props) => {
    const src = {uri: props.photoURL};
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View>
                <Divider />
                <View style={styles.rowContainer}>
                    <Avatar
                        rounded
                        source = {src}
                    />
                    <View style={styles.columnContainer}>
                        <Text style={styles.fullname}>{props.fullname}</Text>
                        <Text style={styles.displayName}>{props.displayName}</Text>
                    </View>
                </View>
                <Divider />
            </View>
        </TouchableOpacity>
    );
};

export default UserItem;

const styles = StyleSheet.create({
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
    },
    columnContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    fullname: {
        fontSize: 14,
        paddingLeft: 5,
        color: '#707070',
    },
    displayName: {
        fontSize: 12,
        fontWeight: 'bold',
        paddingLeft: 5,
        color: '#707070',
    },
});

