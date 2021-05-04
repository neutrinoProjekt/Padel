
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, ImageBackground} from 'react-native';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {FlatList} from 'react-native-gesture-handler';
import CardHeader from '../../components/CardHeader';
import {getTopRated} from '../../models/User';
import { Feather } from '@expo/vector-icons'; 

// Front-end: (DONE DONE DONE)
// global leaderboard (all the users)
// 1,2,3, - winning medals >> icons
// able to see the rating

// Firebase:
// profile picture
// username
// rating (get the sorted list)


// returns an image of the medal depending on the urer's plcement
const PlacePicture = (placement) => {
    const firstplaceimage = {uri: 'https://previews.123rf.com/images/olegganko/olegganko1708/olegganko170800009/83363169-champion-art-golden-medal-with-red-ribbon-l-icon-sign-first-place-isolated-on-transparent-background.jpg'};
    const secondplaceimage = {uri: 'https://previews.123rf.com/images/olegganko/olegganko1708/olegganko170800010/83363170-champion-art-silver-medal-with-red-ribbon-icon-sign-second-place-isolated-on-transparent-background-.jpg'};
    const thirdplaceimage = {uri: 'https://previews.123rf.com/images/olegganko/olegganko1804/olegganko180400209/100578089-champion-art-bronze-medal-with-red-ribbon-icon-sign-first-place-isolated-on-transparent-background-v.jpg'};

    let image; // aasign variable

    if (placement === 1) {
        image = firstplaceimage; // gold medal
    } else if (placement === 2) {
        image = secondplaceimage; // silver medal
    } else if (placement === 3) {
        image = thirdplaceimage; // bronze medal
    } else {
        return <View style={{width: 60, top: 10}}><Text style={{
            fontWeight: 'bold',
            fontSize: 30,
            color: '#696969',
            alignSelf: 'center',
            textAlign: 'center',
        }}>
            {placement}
        </Text>
        </View>;
    }
    return <Image
        style={{height: 60, width: 60, borderRadius: 30}}
        source = {image}/>;
};

const RenderPlacment = ({item}) => (
    <View style={{
        borderBottomWidth: 1,
        borderColor: '#707070', flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row', margin: 10, width: '80%'}}>
            {/** go through an array and display the placement */}
            {
                PlacePicture(
                    item.placement,
                )
            }
            {/** profile picture */}
            <Image
                style={{height: 60, width: 60, borderRadius: 30, marginLeft: 15, marginRight: 15}}
                source = {{uri: item.photoURL}}
            />

            {/** display Name or username of the player + his/her rating */}
            <Text style={{
                alignSelf: 'center',
                color: '#707070',
                fontWeight: 'bold',
                fontSize: 20,
            }}>

            {item.fullname}
            {/**should make this part green */}
        </Text>

        </View>

        <View style={{flexDirection: 'row',
            alignItems: 'center',
            width: '20%',
        }}>
            <Text style={{color: '#00ceb4', fontWeight: 'bold', fontSize: 20, textAlign: 'right'}}>{item.rating}</Text>
        </View>
    </View>
);

const rankScreen = () => {

    const [leaders, setLeaders] = useState({});
    
    const updateLeaders = async () => {
        console.log('updating leaders')
        let leaders = await getTopRated();
        // add placement property
        leaders = leaders.map((profile, index) => ({...profile, placement: index + 1}));
        setLeaders(leaders);   
    }

    useEffect(()=> {
        updateLeaders();
    }, []);

    return (
        <SafeAreaProvider> 
            <CardHeader 
             centerHeader='Leaderboard'
             rightComponent={
                 <Feather 
                 onPress={updateLeaders}
                 name="refresh-cw" 
                 size={20}
                 color='#707070'/>
            }/>
            <View>
                {/* shows only specific match but you're also able to scroll*/}
                <FlatList
                    data={leaders}
                    renderItem={RenderPlacment}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </SafeAreaProvider>
    );
};
export default rankScreen;
