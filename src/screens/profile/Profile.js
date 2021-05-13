/* eslint-disable max-len */
/* eslint-disable react/display-name */
/* eslint-disable require-jsdoc */
// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect, useLayoutEffect} from 'react';
import {Text, View, StyleSheet, TextInput, Image} from 'react-native';
import {Avatar} from 'react-native-elements';
import MainButton from '../../components/MainButton';
import MainFormInput from '../../components/MainFormInput';
import {useAuth} from '../../contexts/auth';
import {getUser, updateUser} from '../../models/User';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Directions} from 'react-native-gesture-handler';
import BackButton from '../../components/BackButton';
import {Divider} from 'react-native-elements';
import {PhoneIcon, EmailIcon, CityIcon, NameIcon,
    CountryIcon, RankingIcon, MatchesPlayedIcon,
    RatingIcon, WinsIcon, LossesIcon, WinRateIcon} from '../../components/icons/Icons';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import {findFlagUrlByCountryName} from 'country-flags-svg';
import {SvgUri} from 'react-native-svg';

// function that displays screen under the header
export default function PersonPageScreen({navigation}) {
    const [phoneNumber, setPhoneNumber] = useState('-');
    const [image, setImage] = useState({uri: 'https://eu.ui-avatars.com/api/?background=random&name=' + fullName});
    const [description, setDescription] = useState('-');
    const [deleteWarning, setDeleteWarning] = useState(false);
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
    const [flag, setFlagUrl] = useState('');

    const updateProfile = () => {
        getUser(currentUser.uid)
            .then((data) => {
                setDescription(data.description);
                setDisplayName(data.displayName);
                setRating(data.rating);
                // setCountry(data.country);
                setCountry('Sweden');
                setMatchesPlayed(data.matchesPlayed);
                setWins(data.wins);
                setLosses(data.losses);
                setFullName(data.fullname);
                setEmail(currentUser.email);
                setCity(data.city);
                setPhoneNumber(data.phoneNumber);
                setImage({uri: data.photoURL});
                setFlagUrl(findFlagUrlByCountryName(country));
            });
    };

    useEffect(()=> {
        updateProfile();
    }, [city, flag, matchesPlayed, wins, losses, rating, description]);


    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'My Account', // header title
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
                    />
                </View>
            ),
        });
    }, [navigation]);

    function handleDelete() {
        if (deleteWarning) {
            deleteUser();
        } else {
            alert('ARE YOU SURE?????, press delete again if you are');
            setDeleteWarning(true);
        }
    }

    function sendData(phonenr, description) {
        if (phonenr != '') {
            updateUser(currentUser.uid, {phoneNumber: phonenr});
        }
        if (description != '') {
            updateUser(currentUser.uid, {description: description});
        }
    }

    // Local components
    const SubHeader = (props) => {
        return (
            <View>
                <Text style={{fontWeight: 'bold', fontSize: 16}}>{props.title}</Text>
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
                <SvgUri 
                    height='20%'
                    width='20%'
                    uri={flag}
                    style={{position: 'absolute', marginTop: 5}}
                />
                {/** Profile picture */}
                <View style={{paddingTop: 50, alignSelf: 'center'}}>
                    <Avatar
                        rounded
                        size="large"
                        source={image}
                        activeOpacity={0.7}
                    />
                </View>
                {/* Firebase issue. Get the user' peofile pic from the database*/}
                <View style={{alignItems: 'center', marginTop: 10}}>
                    <Text style={{fontSize: 24, color: '#00CEB4', fontWeight: 'bold'}}>{displayName}</Text>
                    <Text style={{marginTop: 10, color: 'black', fontSize: 16, fontWeight: 'bold'}}>RATING</Text>
                    <Text style={{color: '#00CEB4', fontSize: 16}}>{rating}</Text>
                </View>
                <View style={{marginTop: 10, marginBottom: -10}}>
                    <Divider />
                </View>
                <View style={{paddingLeft: 10, marginTop: 30}}>
                    <SubHeader title='DESCRIPTION' dividerWidth={110}/>
                    <Text style={{paddingTop: 3}}>{description}</Text>
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
                {/* <View style={{marginTop: 10}}>
                    <MainButton title='DELETE USER' onPress={() => handleDelete()}/>
                </View>*/}
            </View>
        </SafeAreaView>
    ) : (<Text></Text>);
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: 230,
        marginTop: -48,
    },
    subHeader: {
        color: '#707070',
        fontWeight: 'bold',
        paddingLeft: 3,
    },
    subHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    subHeaderField: {
        color: '#707070',
        position: 'absolute',
        right: 5,
    },
});
