import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { StatusBar } from "expo-status-bar";

const StartScreen = () => {

    //move to register page when pressing button
    const register = () => {

    }

    //move to login page when pressing button
    const logIn = () => {

    }

    return(
        <View style={styles.container}>
            <StatusBar style="dark"/>
            <Text style={styles.title}>PaddlePal</Text>
            <Text style={styles.text}>Join our online paddle community</Text>
            <Button containerStyle={styles.button} onPress={register} title="Register"/>
            <Button containerStyle={styles.button} type="outline" onPress={logIn} title="Log in"/>
        </View>
    );
}

export default StartScreen;

const styles = StyleSheet.create({
    button: {
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