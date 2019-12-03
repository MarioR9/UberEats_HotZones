import React from 'react';
import { StyleSheet, TextInput,  Text, View } from 'react-native';


export default function App() {
  //using Hooks To set input text 
  const [value, onChangeText] = React.useState('');
  
  return (
    <View style={styles.container}>
      <Text>Enter The City</Text>

      <TextInput
      style={{ height: 40, width: 160, borderColor: 'red', borderWidth: 2 }}
      onChangeText={text => onChangeText(text)}
      value={value}
    />
        <Text></Text>
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
