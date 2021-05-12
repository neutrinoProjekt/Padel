import {Permissions, Notifications} from 'expo';



// request a token from React Native Expo
const registerForPushNotifications = async () => { 
    try {
        const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        if (!permission.granted) return;
        const token = await Notifications.getExpoPushTokenAsync();
        console.log(token);
    } catch (error) {
        console.log('Error getting a token', error);
    }
};
// calling the above function
const AppNavigator = () => {
    useEffect(() => {
        registerForPushNotifications();
    }, []);
};
