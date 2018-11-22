import React from 'react';
import app from '../styles/container.js';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import { WebBrowser, Permissions, Location} from 'expo';
import axios from 'react-native-axios';
import {ipv4} from '../config.json';


const Nugget = ({
  question,
  answer,
}) => (
  <View style={styles.nuggetContainer}>
    <Text style={styles.nugget}>{ question }</Text>
    <Text style={styles.nugget}>{ answer }</Text>
  </View>
)

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor() {
    super();
    //List view is depracated look into doing something different here
    this.state = {
      user: null,
      currentUserId: 1,
      profileImage : " ",
      nuggets: [],
      lat : 0,
      long: 0,
      errorMessage: null,
      // currentUser: [
      //   {
      //     user: 2,
      //     distance: 0,
      //   },
      //   {
      //     user: 3,
      //     distnace: 0,
      //   },
      //   {
      //     user: 4,
      //     distance: 0.
      //   }
      // ]
    }
    this.socket = new WebSocket("ws://192.168.88.119:3001");
    this.getProfileInformation = this.getProfileInformation.bind(this);
    this.sendLocationToServer = this.sendLocationToServer.bind(this);
    this._getLocationAsync = this._getLocationAsync.bind(this);
    this.receiveLocationFromServer = this.receiveLocationFromServer.bind(this);
    this.findConnection = this.findConnection.bind(this)
  }

  componentDidMount() {

    this.socket.onopen = () => {
      setInterval(()=>{
        this._getLocationAsync();
      },6000)
      console.log("connected to server")
    }
    this.getProfileInformation();
    this.receiveLocationFromServer();
  }


  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});

    this.setState({
      lat: location.coords.latitude,
      long: location.coords.longitude,
     }, this.sendLocationToServer());
  };

  receiveLocationFromServer() {
    this.socket.onmessage = (event) => {
      const locationData = JSON.parse(event.data);
      const userId = locationData.user;
      const distance = locationData.distance
      console.log("userId: ", userId);
      console.log("distance: ", distance);
    }
  }

  sendLocationToServer() {
    var locationData = {
      currentUserId: this.state.currentUserId,
      lat: this.state.lat,
      long: this.state.long,
    }
    this.socket.send(JSON.stringify(locationData));
  }

  getProfileInformation() {
    axios.get(`${ipv4}/user/${this.state.currentUserId}`)
    .then((response)=> {
      const data = response.data
      this.setState({
        user: data.first_name,
        profileImage: data.profile_picture,
        nuggets: data.nuggets,
      })
    })
  }

  findConnection() {

    axios({
      method: 'post',
      url: `${ipv4}/user/${this.state.currentUser}/connections/new`,
      data: {
        userId: this.state.currentUserId,
      }
    })
    .then((res)=>{
      console.log(res)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  render() {

    return (

      <View style={app.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>

          <Image source={{uri: this.state.profileImage}} style ={styles.profileImage}/>
          <Text style={styles.profileName}>{this.state.user}</Text>

          <Text>Friends</Text>
          <Text>10</Text>

          <Button 
          onPress= {this.findConnection}
          title = "find match"
          color = "purple"/>

          <View style={styles.switch}>
            <Button
            onPress={()=>{
              this.setState({
                currentUserId:1,
              }, this.getProfileInformation)
            }}
            title="User 1"
            color="blue"
            />

            <Button
            onPress={()=>{
              this.setState({
                currentUserId:2,
                }, this.getProfileInformation)
              }}
              title="User 2"
            color="blue"
            />

            <Button
            onPress={()=>{
              this.setState({
                currentUserId:3,
              }, this.getProfileInformation)
            }}
            title="User 3"
            color="blue"
            />

            <Button
            onPress={()=>{
              this.setState({
                currentUserId:4,
              }, this.getProfileInformation)
            }}
            title="User 4"
            color="blue"
            />
        </View>
        <Text style={styles.title}>Nuggets</Text>


          <FlatList
            data={this.state.nuggets}
            renderItem={({item}) => <Nugget { ...item }/>}
            keyExtractor={(item, index) => index.toString()}
            style={styles.info}
          />

        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  profileImage: {
    width: 175,
    height: 175,
    alignSelf: 'center',
    borderRadius: 10,
  },

  profileName: {
    fontSize: 50,
    textAlign: 'center',
    margin: 5,
  },

  friendCounter: {
    textAlign: 'left',
  },

  title: {
    fontSize:30,
    textAlign: 'center',
  },

  switch: {
    flexDirection: 'row',
    alignSelf: 'center',
  },

  nugget: {
    padding: 5,
  },

  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },


})
  // already created content
