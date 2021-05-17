import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getUser, updateUser} from '../../models/User';
import {useAuth} from '../../contexts/auth';
import MainButton from '../../components/MainButton';
import {Avatar} from 'react-native-elements';
import MainFormInput from '../../components/MainFormInput';
import {CityIcon, CountryIcon, MatchesPlayedIcon, PhoneIcon, DescriptionIcon} from '../../components/icons/Icons';
import BackButton from '../../components/BackButton';

const EditProfile = ({navigation}) => {
    const {currentUser, deleteUser} = useAuth();
    const [image, setImage] = useState({uri: 'https://eu.ui-avatars.com/api/?background=random&name=' + fullName});
    const [rank, setRank] = useState('');
    const [fullName, setFullName] = useState('');
    const [deleteWarning, setDeleteWarning] = useState(false);

    // Changable fields
    const [description, setDescription] = useState('Tjabba tjena');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [displayName, setDisplayName] = useState('');

    const [f1, setF1] = useState('');
    const [f2, setF2] = useState('');
    const [f3, setF3] = useState('');
    const [f4, setF4] = useState('');
    const [f5, setF5] = useState('');

    // error message
    const [errorMsg, setErrorMsg] = useState('');

    const saveIfValid = () => {
        if (f2 != '' && f2.length < 2) {
            setErrorMsg('Your displayname is too short');
            return;
        }

        f1 != '' ? updateUser(currentUser.uid, {description: f1}) : '';
        f2 != '' ? updateUser(currentUser.uid, {displayName: f2}) : '';
        f3 != '' ? updateUser(currentUser.uid, {country: f3}) : '';
        f4 != '' ? updateUser(currentUser.uid, {city: f4}) : '';
        f5 != '' ? updateUser(currentUser.uid, {phoneNumber: f5}) : '';
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

    function handleDelete() {
        if (deleteWarning) {
            deleteUser();
        } else {
            alert('You are about to delete your account. Currently there is no way of restoring your account once it is deleted. \n Are you sure? If so, press DELETE ACCOUNT again');
            setDeleteWarning(true);
        }
    }

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
            <View style={{alignSelf: 'center'}}>
                <EditFieldItem title='DESCRIPTION' icon={<DescriptionIcon/>}/>
                <MainFormInput
                    inputWidth={320}
                    height={30}
                    placeholder={description}
                    input={f1}
                    setInput={(text) => setF1(text)}
                />
            </View>
            <View style={{alignSelf: 'center'}}>
                <EditFieldItem title='DISPLAY NAME' icon={<MatchesPlayedIcon/>}/>
                <MainFormInput
                    inputWidth={320}
                    height={30}
                    placeholder={displayName}
                    input={f2}
                    setInput={(text) => setF2(text)}
                />
            </View>
            <View style={{alignSelf: 'center'}}>
                <EditFieldItem title='COUNTRY' icon={<CountryIcon/>}/>
                <MainFormInput
                    inputWidth={320}
                    height={30}
                    placeholder={country}
                    input={f3}
                    setInput={(text) => setF3(text)}
                />
            </View>
            <View style={{alignSelf: 'center'}}>
                <EditFieldItem title='CITY' icon={<CityIcon/>}/>
                <MainFormInput
                    inputWidth={320}
                    height={30}
                    placeholder={city}
                    input={f4}
                    setInput={(text) => setF4(text)}
                />
            </View>
            <View style={{alignSelf: 'center'}}>
                <EditFieldItem title='PHONE NUMBER' icon={<PhoneIcon/>}/>
                <MainFormInput
                    inputWidth={320}
                    height={30}
                    placeholder={phoneNumber}
                    input={f5}
                    setInput={(text) => setF5(text)}
                    keyboardType='number-pad'
                />
            </View>
            <Text style={{alignSelf: 'center', marginTop: 3, marginBottom: -10}}>{errorMsg}</Text>
            <View style={{alignSelf: 'center', paddingTop: 40}}>
                <MainButton title='Save' onPress={saveIfValid}/>
            </View>
            <View style={{marginTop: 10, alignSelf: 'center'}}>
                <BackButton title='DELETE USER' onPress={() => handleDelete()}/>
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
