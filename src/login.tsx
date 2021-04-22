import React from "react";
import {Button} from "react-native";
import { useAuth } from "./contexts/auth";

export default function Login() {
    const {login, currentUser} = useAuth();

    function handlePress(){
        login("test@test.com", "123123").then( console.log(currentUser));
    }

    return (
        <Button title="PRESS" onPress={() => handlePress()}/>
    )
}