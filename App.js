import React from 'react';
import { StyleSheet, TextInput,  Text, View } from 'react-native';


export default function App() {
  //using Hooks To set input text 
  const [value, onChangeText] = React.useState('');
  
  return (
    <View style={styles.container}>
      <Text
      style={{ top: -300, left: -110}}
      >Search Bar Goes Here</Text>
      <Text
      style={{ top: -317, left: 110}}
      >Profile</Text>

      <Text
      style={{top: 300}}
      >Search Button</Text>
        
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
