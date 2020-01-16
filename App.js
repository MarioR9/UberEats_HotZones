import React from 'react';
import MapView from'react-native-maps';
import PulseLoader from 'react-native-pulse-loader';
import {
  Image, 
  TouchableOpacity, 
  TextInput, 
  View, 
  Alert
       }
from 'react-native';


export default function App() {
  //using Hooks To set input text 
  const [value, onChangeText] = React.useState('');
  const [hidden, setHidden] = React.useState(false);
  const [lat, setLat] = React.useState(0)
  const [lon, setLon] = React.useState(0)
  const [busyColor, setBusyColor] = React.useState('#ffffff3a')
  const [searchAnimation, setAnimation] = React.useState(false)

  const localHost = ""

  handleFetch=()=>{
    setAnimation(false) //fix async issu with animation
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
    .then(data=>{()=>{ setAnimation(false) }
     
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

    <View style={{flex: 1}}>
      {
      lat == 0 && lon == 0 ? 
  
      <MapView style={{flex: 1}}
            showsCompass={true}
            zoomControlEnabled={true}
            showsTraffic={true}
            loadingEnabled={true} 
      >         
           {
            searchAnimation == true
            ?
          <View>
              <PulseLoader
              borderColor='#02ff23a8'
              backgroundColor='#c915ba5e'
              pulseMaxSize={700}
              size={0}
              avatar={'./assets/SearchLogo.png'}
              />
              
          </View>
            :
            null
          }     
          <View>
            {
            hidden == false
            ?
            <TouchableOpacity onPress={()=>setHidden(true)}>
                <Image style={{
                  position: 'absolute', 
                  left: 0, 
                  top: 0,
                  width: 130, 
                  height: 130}} 
                  source={require('./assets/search.png')} />
            </TouchableOpacity>
            :
            <TextInput
            style={{ 
              marginTop: 30,
              width: 120, 
              height: 30, 
              right: -200}}
            onChangeText={text => onChangeText(text)}
            placeholder="Springfield,VA"
            placeholderTextColor="gray"
            value={value}
            />
            }
            <TouchableOpacity onPress={()=>this.handleFetch()}>
                <Image style={
                  {position: 'absolute', 
                  left: 0, 
                  top: 80,
                  width: 130, 
                  height: 130}} 
                  source={require('./assets/SearchLogo.png')} />
            </TouchableOpacity>
          </View>   
         
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
      
  
    </View>
  );
}


