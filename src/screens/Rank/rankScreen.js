import React from 'react';
import {Text, View, Image} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {FlatList} from 'react-native-gesture-handler';
import CardHeader from '../../components/CardHeader';


// Front-end: (DONE DONE DONE)
// global leaderboard (all the users)
// 1,2,3, - winning medals >> icons
// able to see the rating

// Firebase:
// profile picture
// username
// rating (get the sorted list)
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
            {
                name: 'Yosef',
                picture: 'https://cdn11.bigcommerce.com/s-ydriczk/images/stencil/1280x1280/products/86797/93795/Goofy-Disney-Card-Party-Face-Mask-available-now-at-starstills__37575.1574398848.jpg',
                placement: 4,
                rating: 30,
            },
            {
                name: 'Philip',
                picture: 'https://i.pinimg.com/originals/63/6f/c9/636fc98554daf0f31ddb5ec0d12ecf51.jpg',
                placement: 5,
                rating: 60,
            },
            {
                name: 'Shaff',
                picture: 'https://static.wikia.nocookie.net/disney/images/3/31/Profile_-_Baloo.jpeg',
                placement: 6,
                rating: 50,
            },
            {
                name: 'Daniel',
                picture: 'https://mk0featuredanim65enk.kinstacdn.com/wp-content/uploads/2021/03/Flynn-Ryder-portrait-photo.jpeg',
                placement: 7,
                rating: 40,
            },
            {
                name: 'Yosef',
                picture: 'https://cdn11.bigcommerce.com/s-ydriczk/images/stencil/1280x1280/products/86797/93795/Goofy-Disney-Card-Party-Face-Mask-available-now-at-starstills__37575.1574398848.jpg',
                placement: 8,
                rating: 30,
            },
            {
                name: 'Yosef',
                picture: 'https://cdn11.bigcommerce.com/s-ydriczk/images/stencil/1280x1280/products/86797/93795/Goofy-Disney-Card-Party-Face-Mask-available-now-at-starstills__37575.1574398848.jpg',
                placement: 9,
                rating: 30,
            },
            {
                name: 'August',
                picture: 'https://shop.partyland.party/files/mickey%20baby.[1].jpg',
                placement: 10,
                rating: 1337,
            },
        ],
};

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
                source = {{uri: item.picture}}
            />

            {/** display Name or username of the player + his/her rating */}
            <Text style={{
                alignSelf: 'center',
                color: '#707070',
                fontWeight: 'bold',
                fontSize: 20,
            }}>
                {item.name}
                {/** should make this part green */}
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
    return (
        <SafeAreaProvider>
            <CardHeader centerHeader='Leaderboard'/>
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
