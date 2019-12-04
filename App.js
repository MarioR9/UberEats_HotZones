import React from 'react';
import { StyleSheet,Image, Text, View } from 'react-native';


export default function App() {
  //using Hooks To set input text 
  const [value, onChangeText] = React.useState('');
  
  return (
    <View style={styles.container}>
      <Text
      style={{ top: -200, left: -90}}
      >Search Bar Goes Here</Text>
      <Text
      style={{ top: -216, left: 140}}
      >Profile</Text>

      <Image 
      style={{ width: 200, height: 200, top: 300}}
      source={require('./assets/logo.png')} />
    </View>

     
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
