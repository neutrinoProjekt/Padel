import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar, Divider} from 'react-native-elements';

const MatchListItem = (props) => {
    const image = {uri: 'https://images.interactives.dk/einstein_shutterstock-qbUmtZmY5FII0w3giBzzOw.jpg?auto=compress&ch=Width%2CDPR&dpr=2.63&h=480&ixjsv=2.2.4&q=38&rect=33%2C0%2C563%2C390'};

    //console.log(props);
    console.log(props.p1);
    return (
        <View>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', margin: 5}}>
                <View style={{
                    alignSelf: 'center',
                    alignContent: 'center',
                    width: '30%'}}
                >
                    <Text style={styles.subTitle1}>{props.p1.fullname}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', width: '40%'}}>
                    <Avatar
                        rounded
                        size="medium"
                        source={image}
                        activeOpacity={0.7}
                    />
                    <Text style={{alignSelf: 'center', margin: 5}}>VS</Text>
                    <Avatar
                        rounded
                        size="medium"
                        source={image}
                        activeOpacity={0.7}
                    />
                </View>
                <View style={{alignContent: 'center', width: '30%'}}>
                    <Text style={styles.subTitle1}>{props.p2}</Text>
                </View>
            </View>
            <Divider style={{height: 1}} />
        </View>
    );
};

export default MatchListItem;

const styles = StyleSheet.create({
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
    listItemOne: {
        flex: 1,
        height: 70,
        backgroundColor: '#F7F7F7',
    },
});
