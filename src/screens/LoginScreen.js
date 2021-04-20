import React from 'react'; // , {useEffect, useState}
import { StyleSheet, Text, View } from 'react-native';

const LoginScreen = () => {
    return (
        <View style = { styles.container }>
            <Text>hej hej</Text>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffa',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });