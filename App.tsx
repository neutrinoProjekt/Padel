import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {LoginScreen} from './src/screens/LoginScreen.js';


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <LoginScreen />
    </View>
    
  );
}

/*
export default function App(){
  return LoginScreen();
}
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
