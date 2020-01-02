import React from 'react';
import MapView from 'react-native-maps';
import {
  Image, 
  TouchableOpacity, 
  TextInput, 
  View, 
  Alert}
from 'react-native';


export default function App() {
  //using Hooks To set input text 
  const [value, onChangeText] = React.useState('');
  const [hidden, setHidden] = React.useState(true);
  const [lat, setLat] = React.useState(0)
  const [lon, setLon] = React.useState(0)

  const localHost = ""

  
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
        'Response',
        data,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
      setLat(parseFloat(data.lat))
      setLon(parseFloat(data.lon))
      console.log("received.")
    }).catch(err => {
      // Error handling
      console.log("Error Reading data " + err);
    });
  }


  return (
 
    <View style={{flex: 1}}>
    {
    hidden == true
    ?
    <TouchableOpacity onPress={()=>setHidden(false)}>
        <Image style={{width: 130, height: 130}} source={require('./assets/search.png')} />
    </TouchableOpacity>
     :
    <TextInput
    style={{ marginTop: 20, width: 120, height: 30, right: -20,borderColor: 'red', borderWidth: 1}}
    onChangeText={text => onChangeText(text)}
    placeholder="  Springfield,VA"
    placeholderTextColor="gray"
    value={value}
   />
    }
     <TouchableOpacity onPress={()=>this.startFetch()}>
        <Image style={{width: 130, height: 130}} source={require('./assets/SearchLogo.png')} />
    </TouchableOpacity>

   {
    lat == 0 && lon == 0 ?
    <MapView style={{flex: 1}}
          showsUserLocation={true}
          showsCompass={true}
          zoomControlEnabled={true}
          showsTraffic={true}
          loadingEnabled={true}
    />   
  :
    <MapView style={{flex: 1}}
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
      />   
  }

    </View>
  );
}
