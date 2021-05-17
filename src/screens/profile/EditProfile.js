import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getUser, updateUser} from '../../models/User';
import {useAuth} from '../../contexts/auth';
import MainButton from '../../components/MainButton';
import {Avatar} from 'react-native-elements';
import MainFormInput from '../../components/MainFormInput';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { CityIcon, CountryIcon, MatchesPlayedIcon, NameIcon, PhoneIcon, RankingIcon, DescriptionIcon} from '../../components/icons/Icons';

const EditProfile = () => {
    const {currentUser, logout, deleteUser} = useAuth();
    const [image, setImage] = useState({uri: 'https://eu.ui-avatars.com/api/?background=random&name=' + fullName});
    const [rank, setRank] = useState('');
    const [fullName, setFullName] = useState('');

    // variabler som kan ändras
    const [description, setDescription] = useState('Tjabba tjena');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [displayName, setDisplayName] = useState('');

    const updateProfile = () => {
        updateUser(currentUser.uid, {
            description: description,
            country: country,
            city: city,
            phonenumber: phoneNumber,
        },
        );
    };

    const setDefault = () => {
        getUser(currentUser.uid).then((data) => {
            setFullName(data.fullname);
            setImage({uri: data.photoURL});
            setCountry(data.country);
            setDescription(data.description);
            setCity(data.city);
            setPhoneNumber(data.phoneNumber);
            setRank(data.rating);
            setDisplayName(data.displayName);
        });
    };

    useEffect(() => {
        setDefault();
    }, []);

    const EditFieldItem = (props) => {
        return (
            <View>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <View style={{marginTop: 25, marginBottom: -25}}>
                        {props.icon}
                    </View>
                    <Text style={styles.editableField}>{props.title}</Text>
                    <View style={{marginTop: 25, marginBottom: -25, paddingLeft: 5}}>
                        {props.icon}
                    </View>
                </View>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <MainFormInput
                        inputWidth={320}
                        height={30}
                        placeholder={props.placeholder}
                    />
                </View>
            </View>
        );
    };

    return (
        <View style={{backgroundColor: 'white', height: '100%'}}>
            <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 5, marginTop: 5}}>
                <Avatar
                    rounded
                    size="medium"
                    source={image}
                    activeOpacity={0.7}
                />
                <View>
                    <Text style={styles.subTitle1}>{fullName}</Text>
                    <Text style={styles.subTitle2}>{rank}</Text>
                </View>
            </View>
            <EditFieldItem placeholder={description} title='DESCRIPTION' icon={<DescriptionIcon/>}/>
            <EditFieldItem placeholder={displayName} title='DISPLAY NAME' icon={<MatchesPlayedIcon/>}/>
            <EditFieldItem placeholder={country} title='COUNTRY' icon={<CountryIcon/>}/>
            <EditFieldItem placeholder={city} title='CITY' icon={<CityIcon/>}/>
            <EditFieldItem placeholder={phoneNumber} title='PHONE NUMBER' icon={<PhoneIcon/>}/>
            <View style={{alignSelf: 'center'}}>
                <MainButton title='Save' onPress={updateProfile}/>
            </View>
        </View>
    );
};

export default EditProfile;


const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'white',
    },
    nEnd: {
        color: '#707070',
        textAlign: 'center',
        margin: 50,
    },
    columnContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    listItemOne: {
        flex: 1,
        height: 70,
        backgroundColor: '#F7F7F7',
    },
    listItemTwo: {
        flex: 1,
    },
    title: {
        paddingTop: 10,
        paddingLeft: 2,
        color: '#707070',
        fontWeight: '800',
        fontSize: 12,
    },
    subTitle1: {
        paddingLeft: 2,
        color: '#707070',
        fontWeight: '700',
        fontSize: 16,
    },
    subTitle2: {
        paddingBottom: 5,
        padding: 2,
        color: '#00CEB4',
        fontWeight: '700',
        fontSize: 14,
    },
    subTitle3: {
        paddingTop: 5,
        paddingBottom: 5,
        color: '#707070',
        fontWeight: '600',
        fontSize: 12,
    },
    name: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 20,
        color: '#707070',
        fontWeight: '700',
        fontSize: 10,
    },
    ranking: {
        paddingTop: 5,
        paddingBottom: 5,
        color: '#00CEB4',
        fontWeight: '700',
        fontSize: 10,
    },
    actionButtonContainer: {
        flex: 1,
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    actionButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 100,
        shadowRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: {height: 10},
    },
    editableField: {
        marginTop: 25,
        marginBottom: -25,
        marginLeft: 5,
        color: '#707070',
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingBottom: 5,
    },
});
