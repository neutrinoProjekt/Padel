import React from 'react';
import {StyleSheet, Text, View, Image, ImageBackground} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {FlatList} from 'react-native-gesture-handler';



// Front-end:
// global leaderboard (all the users), yes
// 1,2,3, - winning medals >> icons, kinda
// able to see the rating, yes

// Firebase:
// profile picture
// username
// rating
const LEADERS = {
    players:
        [
           {
                name: 'Anna',
                picture: 'http://lumiere-a.akamaihd.net/v1/images/ct_frozen_anna_18466_6775584b.jpeg',
                placement: 1,
                rating: 1000,
                },
                {
                    name: 'Lukas',
                    picture: 'https://www.kalleanka.se/wp-content/uploads/sb-instagram-feed-images/kalle_anka_co.jpg',
                    placement: 2,
                    rating: 420,
                },
                {
                    name: 'Vide',
                    picture: 'https://cached-images.bonnier.news/swift/bilder/epi-30-dn/UploadedImages/2019/12/9/dc6a59ab-f934-4af7-8bf3-eb8a42e37547/bigOriginal.jpg',
                    placement: 3,
                    rating: 69,
                },
        ],
};

// returns an image of the medal depending on the urer's plcement
const PlacePicture = ({placement}) => {
    const firstplaceimage = { uri: "https://previews.123rf.com/images/olegganko/olegganko1708/olegganko170800009/83363169-champion-art-golden-medal-with-red-ribbon-l-icon-sign-first-place-isolated-on-transparent-background.jpg" };
    const secondplaceimage = { uri: "https://previews.123rf.com/images/olegganko/olegganko1708/olegganko170800010/83363170-champion-art-silver-medal-with-red-ribbon-icon-sign-second-place-isolated-on-transparent-background-.jpg" };
    const thirdplaceimage = { uri: "https://previews.123rf.com/images/olegganko/olegganko1804/olegganko180400209/100578089-champion-art-bronze-medal-with-red-ribbon-icon-sign-first-place-isolated-on-transparent-background-v.jpg" }; 
    
    console.log(placement)
    let image; // aasign variable
    
    if (placement === 1) {
        image = firstplaceimage //gold medal
     
    }
    else if (placement === 2){
        image = secondplaceimage //silver medal
    
    }
    else if (placement === 3){        
        image = thirdplaceimage // bronze medal
 
    }
    else {
        return <Text style={{ //returns a usual number if placement > 3
            fontWeight: 'bold',
            alignSelf: 'center',
            color: '#707070'}}>
                {placement}
                </Text>
    }
    return <Image
        style={{height: 60, width: 60, borderRadius: 30}}
        source = {image}/>
};

const RenderPlacment = ({item}) => (
    <View style={{
            borderBottomWidth: 1,
            borderColor: '#707070', flexDirection: 'row'}}>
        <View style={{flexDirection: 'row', margin: 10}}>
          {/**go through an array and display the placement */}
            {
                PlacePicture(
                    item.placement
                )
            }
            {/**profile picture */}
            <Image
                style={{height: 60, width: 60, borderRadius: 30}}
                source = {{uri: item.picture}}
            />
        </View>

        {/** display Name or username of the player + his/her rating */}
        <Text style={{
            alignSelf: 'center',
            color: '#707070'}}>
            {item.name}
            {item.rating} {/**should make this part green */}
        </Text>
    </View>
);


const rankScreen = () => {
    return (
        <SafeAreaProvider> 
            <View>
                {/* shows only specific match but you're also able to scroll*/}
                <FlatList
                    data={LEADERS.players}
                    renderItem={RenderPlacment}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </SafeAreaProvider>
    );
};

export default rankScreen;
