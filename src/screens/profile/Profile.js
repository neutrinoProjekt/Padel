/* eslint-disable max-len */
/* eslint-disable react/display-name */
/* eslint-disable require-jsdoc */
// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect, useLayoutEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-elements';
import {useAuth} from '../../contexts/auth';
import {getUser, updateUser} from '../../models/User';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackButton from '../../components/BackButton';
import {Divider} from 'react-native-elements';
import {PhoneIcon, EmailIcon, CityIcon, NameIcon,
    CountryIcon, RankingIcon, MatchesPlayedIcon,
    RatingIcon, WinsIcon, LossesIcon, WinRateIcon} from '../../components/icons/Icons';


// function that displays screen under the header
export default function Profile({navigation}) {
    const [phoneNumber, setPhoneNumber] = useState('-');
    const [image, setImage] = useState({uri: 'https://eu.ui-avatars.com/api/?background=random&name=' + fullName});
    const [description, setDescription] = useState('-');
    const {currentUser, logout, deleteUser} = useAuth();
    const [displayName, setDisplayName] = useState('-');
    const [rating, setRating] = useState('-');
    const [wins, setWins] = useState(0);
    const [losses, setLosses] = useState(0);
    const [email, setEmail] = useState('-');
    const [country, setCountry] = useState('-');
    const [fullName, setFullName] = useState('-');
    const [matchesPlayed, setMatchesPlayed] = useState('-');
    const [city, setCity] = useState('-');

    const updateProfile = () => {
        getUser(currentUser.uid)
            .then((data) => {
                setDescription(data.description);
                setDisplayName(data.displayName);
                setRating(data.rating);
                setCountry(data.country);
                setMatchesPlayed(data.matchesPlayed);
                setWins(data.wins);
                setLosses(data.losses);
                setFullName(data.fullname);
                setEmail(currentUser.email);
                setCity(data.city);
                setPhoneNumber(data.phoneNumber);
                setImage({uri: data.photoURL});
            });
    };

    useEffect(() => {
        navigation.addListener(
            'focus',
            payload => {
                updateProfile();
            },
        );
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'My Profile', // header title
            headerTitleAlign: 'center',
            headerTitleStyle: {alignSelf: 'center'},
            headerLeft: () => (
                <View style={{paddingLeft: 15, flexDirection: 'row', justifyContent: 'space-between', width: 80}}>
                    <MaterialCommunityIcons
                        name="podium-gold"
                        size={24}
                        color='#707070'
                        onPress={() => navigation.navigate('RankView')}
                    />
                    <MaterialCommunityIcons
                        name="history"
                        size={24}
                        color='#707070'
                        onPress={() => navigation.navigate('History')}
                    />
                </View>
            ),
            headerRight: () => (
                <View style={{paddingRight: 25, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <MaterialCommunityIcons
                        name='account-edit-outline'
                        size={24}
                        color='#707070'
                        onPress = {() => navigation.navigate('Edit Profile')}
                    />
                </View>
            ),
        });
    }, [navigation]);

    // Local components
    const SubHeader = (props) => {
        return (
            <View>
                <Text style={{fontWeight: 'bold', fontSize: 16, color: '#707070'}}>{props.title}</Text>
                <Divider style={{width: props.dividerWidth}}/>
            </View>
        );
    };

    const SubHeaderField = (props) => {
        return (
            <View style={styles.subHeaderContainer}>
                {props.icon}
                <Text style={styles.subHeader}>{props.header}</Text>
                <Text style={styles.subHeaderField}>{props.value}</Text>
            </View>
        );
    };

    return currentUser != null ? (
        <SafeAreaView style={{backgroundColor: 'white', height: '100%'}}>
            <View style={styles.container}>
                {/** Profile picture */}
                <View style={{paddingTop: 50, alignSelf: 'center'}}>
                    <Avatar
                        rounded
                        size="large"
                        source={image}
                        activeOpacity={0.7}
                    />
                </View>
                <View style={{alignItems: 'center', marginTop: 10}}>
                    <Text style={{fontSize: 24, color: '#00CEB4', fontWeight: 'bold'}}>{displayName}</Text>
                    <Text style={{marginTop: 10, color: '#707070', fontSize: 16, fontWeight: 'bold'}}>RATING</Text>
                    <Text style={{color: '#00CEB4', fontSize: 16}}>{rating}</Text>
                </View>
                <View style={{paddingLeft: 10, marginTop: 30}}>
                    <SubHeader title='DESCRIPTION' dividerWidth={110}/>
                    <Text style={{paddingTop: 3, color: '#bfbfbf'}}>{description}</Text>
                </View>
                <View style={{paddingLeft: 10, marginTop: 20}}>
                    <SubHeader title='CONTACT INFORMATION' dividerWidth={195}/>
                    <View style={{paddingTop: 3}}>
                        <SubHeaderField header='Phone Number' icon={<PhoneIcon />} value={phoneNumber}/>
                    </View>
                    <SubHeaderField header='Full Name' icon={<NameIcon />} value={fullName}/>
                    <SubHeaderField header='Email' icon={<EmailIcon />} value={email}/>
                    <SubHeaderField header='Country' icon={<CountryIcon />} value={country}/>
                    <SubHeaderField header='City' icon={<CityIcon />} value={city}/>
                </View>
                <View style={{paddingLeft: 10, marginTop: 20}}>
                    <SubHeader title='STATISTICS' dividerWidth={90}/>
                    <View style={{paddingTop: 3}}>
                        <SubHeaderField header='Ranking' icon={<RankingIcon />} value={10}/>
                    </View>
                    <SubHeaderField header='Matches played' icon={<MatchesPlayedIcon />} value={matchesPlayed}/>
                    <SubHeaderField header='Rating' icon={<RatingIcon />} value={rating}/>
                    <SubHeaderField header='Wins' icon={<WinsIcon />} value={wins}/>
                    <SubHeaderField header='Losses' icon={<LossesIcon />} value={losses}/>
                    <SubHeaderField header='Winrate' icon={<WinRateIcon />} value={0}/>
                </View>
                <View style={{position: 'absolute', alignSelf: 'center', bottom: -450}}>
                    <BackButton title='Sign Out' onPress={() => logout()}/>
                </View>
            </View>
        </SafeAreaView>
    ) : (<Text></Text>);
}


const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderBottomColor: '#bfbfbf',
        backgroundColor: '#f7f7f7',
        height: 230,
        marginTop: -48,
    },
    subHeader: {
        color: '#707070',
        paddingLeft: 3,
    },
    subHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    subHeaderField: {
        color: '#bfbfbf',
        position: 'absolute',
        right: 5,
    },
});
