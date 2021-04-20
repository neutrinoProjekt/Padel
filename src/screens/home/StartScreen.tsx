import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { StatusBar } from "expo-status-bar";

const StartScreen = ({navigation}) => {

    //move to register page when pressing button
    const register = () => {
        navigation.navigate("Register");
    }

    //move to login page when pressing button
    const logIn = () => {
        navigation.navigate("Login");
    }
    
    return(
        <ImageBackground source = {{uri: "https://i.pinimg.com/originals/50/2c/a3/502ca33a6bcd3eafa97d50957c63dcb9.png"}} style = {styles.image}>
            <View>
                <Text style={styles.title}>PaddelPal</Text>
            </View>
            <View>
                <Text style={styles.text}>Join our online paddle community</Text>
            </View>
            <Button titleStyle={styles.button} containerStyle={styles.button} type="clear" onPress={register} title="Register"/>
            <Button titleStyle={{color: "#00CEB4", fontWeight: "bold"}}type="clear" onPress={logIn} title="Log In"/>
        </ImageBackground>
    );
}

export default StartScreen;

//todo: skapa map för styles
const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        color: "#ffffff",
        fontWeight: "bold",
        backgroundColor: "#00CEB4",
        height: 40,
        width: 300,
    },
    container: {
        flex: 1, //use entire height
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    },
    title: {
        height: 400,
        fontWeight: "bold",
        fontSize: 50,
        color: "#696969",
        fontFamily: "Cochin",
    },
    text: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#ffffff",
        width: 200,
        textAlign: "center",
        height: 150,
    },
});