import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { Input } from 'react-native-elements'

const RegisterScreen = ({navigation}) => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState(""); 


    return (
        <KeyboardAvoidingView behavior="padding">
        <View style={styles.input}>
            <Input placeholder="Name"
            autoFocus
            value={name}
            onChangeText={(text) => setName(text)}
            />
        </View>
        <View style={styles.input}>
            <Input placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
            />
        </View>
        <View style={styles.input}>
            <Input placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            />
        </View>
        <View style={styles.input}>
            <Input placeholder="Date of Birth"
            value={dob}
            onChangeText={(text) => setDob(text)}
            />
        </View>
        </KeyboardAvoidingView>
        //lägg till slider ovan för dob
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    input:{
        marginTop: 50
    }
})
