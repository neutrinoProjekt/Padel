import React, {useState, useEffect} from 'react';
import {Text, View, KeyboardAvoidingView} from 'react-native';
// import {withFirebaseHOC} from '../../Firebase';
import {styles} from '../styling/Styles';
import MainButton from '../../components/MainButton';
import MainFormInput from '../../components/MainFormInput';
import {useAuth} from '../../contexts/auth';
import BackButton from '../../components/BackButton';


const ForgotYourPasswordScreen = ({navigation}) => {

    const {passwordReset, error} = useAuth();
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('');

    // success message to send as prop when link has been sent successfully
    const successMessage = 'The instructions to reset password has successfully been sent to ' + email;
  

    useEffect(() => {
        setErrorMessage(error);
    }, [error]);

    const back = () => {
        navigation.navigate('Login');
    };

    function handlePasswordReset() {
        passwordReset(email)
        .then(() => navigation.navigate('SuccessPopup', {text: successMessage})) //SuccesPop
        .catch((e) => setErrorMessage(e.message));
    }
    
    return (
        <View style={{alignItems: 'center'}}>
            <KeyboardAvoidingView>
                <View style={styles.titleAlignment}>
                    <Text style={styles.title}>Reset Password</Text>
                </View>
                <View style={{padding: 10}}>
                    <Text style={styles.text}> Please register your email to reset password</Text>
                </View>
                <View>
                    <Text style={styles.error}>{errorMessage}</Text>
                </View>
                <MainFormInput
                    placeholder='Please enter your email'
                    inputWidth={305}
                    input={email}
                    setInput={(text) => setEmail(text)}
                />
                <View style={{flex: 1,
                    alignItems: 'center'
                }}>
                    <View style={{paddingTop: 10}}>
                        <MainButton
                            title='Reset'
                            onPress={()=> handlePasswordReset()}
                        />
                    </View>
                    <View style={{paddingTop: 10}}>
                        <BackButton
                            title='Back'
                            onPress={()=>back()}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

export default ForgotYourPasswordScreen;
