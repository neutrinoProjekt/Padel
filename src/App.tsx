/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React from 'react';
<<<<<<< HEAD
import {StyleSheet, Text, View} from 'react-native';
import Notifications from './components/notifications.tsx';

export default function App() {
    return (
        <View>
            <Text style={styles.container}>paddel app</Text>
            <Notifications/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#ffa',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 50,
        textAlign: 'center',
        fontFamily: 'cursive',
        fontSize: 50,
        borderBottomWidth: 2,
        borderColor: '#00CEB4',
    },
});
=======
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import StartScreen from './screens/home/StartScreen';
import EmailScreen from './screens/registration/EmailScreen';
import PasswordScreen from './screens/registration/PasswordScreen';
import FullNameScreen from './screens/registration/FullNameScreen';
import UsernameScreen from './screens/registration/UsernameScreen';
import LoginScreen from './screens/login/LoginScreen';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: '#ffffff'}}}>
                <Stack.Screen name="Home" component={StartScreen} />
                <Stack.Screen name="Register" component={EmailScreen} />
                <Stack.Screen name="Password" component={PasswordScreen} />
                <Stack.Screen name="FullName" component={FullNameScreen} />
                <Stack.Screen name="UsernameScreen" component={UsernameScreen}/>
                <Stack.Screen name="Login" component={LoginScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};
>>>>>>> origin
