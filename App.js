import React from 'react';
import { StyleSheet,Image, Text, View } from 'react-native';


export default function App() {
  //using Hooks To set input text 
  const [value, onChangeText] = React.useState('');
  
  return (
    <View style={styles.container}>
      <Image
      source={require('./assets/search.png')}
      style={{ width: 130, height: 130, top: -120, left: -140}}
      />

      <Image
      source={require('./assets/profile.png')}
      style={{ width: 130, height: 130, bottom: 250, left: 140}}
      />

      <Image 
      style={{ width: 200, height: 200, top: 200}}
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
