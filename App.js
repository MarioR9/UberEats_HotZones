import React from 'react';
import { StyleSheet,Image, TextInput, View, Alert, Button } from 'react-native';


export default function App() {
  //using Hooks To set input text 
  const [value, onChangeText] = React.useState('springfield');
 
  const localHost = ""
  const textSize = value.length * 10 + 5;

  
  startFetch=()=>{
    console.log("fetch sent")
    console.log("this is the value: " + value)
    const data = { location: value}
    const options = {
      method: 'POST',
      headers : { 
        'Content-Type': 'application/json',
       },
      body: JSON.stringify(data),
     
    }
  
    fetch(`http://${localHost}:3000/api`, options)
    .then(resp=>resp.json())
    .then(data=>{
      console.log(data)
      Alert.alert(
        'Alert Title',
        data,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
      console.log("received.")
    }).catch(err => {
      // Do something for an error here
      console.log("Error Reading data " + err);
    });
  }
  

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

      <TextInput
      style={{ height: 40, width: textSize, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => onChangeText(text)}
      value={value}
     />
      <Button
          style={{ width: 200, height: 200, top: 200}} 
          title="Press me"
          onPress={() => this.startFetch()}
        />
      

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



