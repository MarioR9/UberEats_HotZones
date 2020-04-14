import React from 'react';
import { Container, Header, Item, Input, Icon, Button, Text } from 'native-base';
import MapView from'react-native-maps';
import {
  SafeAreaView,
  Alert
       }
from 'react-native';



export default function App() {
  //using Hooks To set input text 
  const [value, onChangeText] = React.useState('');
  const [lat, setLat] = React.useState(0)
  const [lon, setLon] = React.useState(0)
  const [busyColor, setBusyColor] = React.useState('#ffffff3a')
  
  const localHost = "IPADRESS"

  handleFetch=()=>{

    Alert.alert(
      'Collecting Information',
      'Please Wait..',
      [
        {text: 'OK', onPress: () =>console.log("ok pressed") },
      ]
    );
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
    .then(data=>{()=>

      Alert.alert(
        'Success',
        'Thank you for waiting',
        [
          {text: 'OK', onPress: () =>console.log("ok pressed") },
        ]
      );
      
      // console.log(data)
      setLat(parseFloat(data.lat))
      setLon(parseFloat(data.lon))

      let numbers = data.response.map(num => parseInt(num.bussynessPercentage.replace(/[^a-zA-Z0-9 ]/g, "")))
      let removeNaN = numbers.filter(value => {
        return !Number.isNaN(value);
        })
      let total = removeNaN.reduce((a, b) => a + b) / removeNaN.length
      
      // console.log("array of numbers " + numbers)
      // console.log("array of numbers to removed " + removeNaN)
      // console.log("total % " + total)

      // Radious color key.
      if(total > 10 && total <35){
        setBusyColor('#02bd0c2a')
      }else if(total > 36 && total < 65){
        setBusyColor('#e7d42d4f')    
      }else{
        setBusyColor('#fc000046')
      }
      console.log("received.")
      
    }).catch(err => {
      // Error handling
      console.log("Error Reading data " + err);
    });
  }
 
  return (

    <SafeAreaView style={{flex: 1}}>
       <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" onChangeText={text => onChangeText(text)} />
          </Item>
          <Button onPress={()=>this.handleFetch()} transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        {
      lat == 0 && lon == 0 
      ?
      <MapView style={{flex: 1}}
            showsCompass={true}
            zoomControlEnabled={true}
            showsTraffic={true}
            loadingEnabled={true} 
            showsUserLocation={true}>    
      </MapView> 
      
      :
      <MapView 
      style={{flex: 1}}
          region={{
            latitude: lat,
            longitude: lon,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134
          }}
          showsCompass={true}
          zoomControlEnabled={true}
          showsTraffic={true}
          loadingEnabled={true}
          > 
      <MapView.Circle
          center={{
            latitude: lat,
            longitude: lon,
          }}
          radius={600}
          strokeWidth={3}
          strokeColor = {busyColor}
          fillColor={busyColor}
        />  
      </MapView> 
      }
      </Container>
    </SafeAreaView>
  );
}
